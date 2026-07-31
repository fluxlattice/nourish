import { useState, useEffect, useRef } from "react";
import "./App.css";
import { getSection, parseDays, parseRecipes, classifyMealType } from "./lib/planParser";
import { canNext as canNextStep, toggleRestriction } from "./lib/formHelpers";

const DIETARY = [
  { id: "gluten-free", label: "Gluten-Free", icon: "🌾" },
  { id: "dairy-free", label: "Dairy-Free", icon: "🥛" },
  { id: "vegan", label: "Vegan", icon: "🌿" },
  { id: "vegetarian", label: "Vegetarian", icon: "🥦" },
  { id: "keto", label: "Keto", icon: "🥑" },
  { id: "paleo", label: "Paleo", icon: "🍖" },
  { id: "nut-free", label: "Nut-Free", icon: "🥜" },
  { id: "low-sodium", label: "Low Sodium", icon: "🧂" },
];

const GOALS = [
  { id: "lose", label: "Lose Weight", desc: "Calorie deficit, high protein", icon: "🔥" },
  { id: "maintain", label: "Stay Balanced", desc: "Sustainable healthy habits", icon: "⚖️" },
  { id: "gain", label: "Build Muscle", desc: "Calorie surplus, protein-rich", icon: "💪" },
];

const ACTIVITIES = [
  { id: "sedentary", label: "Mostly Sitting", desc: "Desk job, little exercise" },
  { id: "light", label: "Lightly Active", desc: "1–2 workouts/week" },
  { id: "moderate", label: "Moderately Active", desc: "3–4 workouts/week" },
  { id: "very", label: "Very Active", desc: "Daily intense exercise" },
];

const STEP_NAMES = ["Intro", "Profile", "Goals & Activity", "Budget & Diet"];

const photoCache = new Map();

function dishNameFromMealContent(content) {
  return content.split(/\s*\(/)[0].trim();
}

function usePhoto(query) {
  const key = (query || "").trim().toLowerCase();
  const [photo, setPhoto] = useState(() => (key && photoCache.has(key) ? photoCache.get(key) : undefined));
  const loaded = photo !== undefined;

  useEffect(() => {
    if (!key || photoCache.has(key)) return;
    let cancelled = false;
    fetch("/api/photo?q=" + encodeURIComponent(query))
      .then((r) => (r.ok ? r.json() : { url: null }))
      .then((data) => {
        const result = data?.url ? data : null;
        photoCache.set(key, result);
        if (!cancelled) setPhoto(result);
      })
      .catch(() => {
        photoCache.set(key, null);
        if (!cancelled) setPhoto(null);
      });
    return () => {
      cancelled = true;
    };
  }, [key, query]);

  return { photo: photo || null, loaded };
}

function MealPhoto({ query, type, icon, tilt = "left", size }) {
  const { photo, loaded } = usePhoto(query);
  const [errored, setErrored] = useState(false);
  const hasPhoto = loaded && photo?.url && !errored;

  return (
    <div className="polaroid-wrap">
      <div className={"polaroid" + (size === "lg" ? " polaroid-lg" : "") + (tilt === "right" ? " tilt-right" : "")}>
        <div className="polaroid-frame">
          {!loaded && <div className="photo-skeleton" />}
          {loaded && !hasPhoto && (
            <div className={"photo-fallback " + type}>
              <span>{icon}</span>
            </div>
          )}
          {hasPhoto && <img src={photo.url} alt={query} loading="lazy" onError={() => setErrored(true)} />}
        </div>
      </div>
      {hasPhoto && photo.photographer && (
        <a
          className="photo-credit-line"
          href={(photo.photographerUrl || photo.unsplashUrl || "#") + "?utm_source=nourish&utm_medium=referral"}
          target="_blank"
          rel="noreferrer"
        >
          {photo.photographer}
        </a>
      )}
    </div>
  );
}

// Tracks a horizontal drag on a card and reports a swipe once it clears a
// threshold. Deliberately dependency-free: pointer events cover mouse + touch.
function useSwipeCard({ onSwipeLeft, onSwipeRight, enabled = true }) {
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef(null);
  const axis = useRef(null);
  const flying = useRef(false);

  function onPointerDown(e) {
    if (!enabled || flying.current) return;
    start.current = { x: e.clientX, y: e.clientY };
    axis.current = null;
    setDragging(true);
  }
  function onPointerMove(e) {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    if (!axis.current) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      axis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (axis.current === "x") {
      if (e.cancelable) e.preventDefault();
      setDrag(dx);
    }
  }
  function onPointerUp() {
    if (!start.current) return;
    const threshold = 80;
    const wasX = axis.current === "x";
    start.current = null;
    axis.current = null;
    setDragging(false);
    if (wasX && drag < -threshold && onSwipeLeft) {
      flying.current = true;
      setDrag(-600);
      setTimeout(onSwipeLeft, 200);
    } else if (wasX && drag > threshold && onSwipeRight) {
      flying.current = true;
      setDrag(600);
      setTimeout(onSwipeRight, 200);
    } else {
      setDrag(0);
    }
  }

  if (!enabled) return { handlers: {}, style: undefined };

  const style =
    drag !== 0 ? { transform: `translateX(${drag}px) rotate(${drag / 26}deg)`, transition: dragging ? "none" : undefined } : undefined;

  return {
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp },
    style,
  };
}

// Wrapping component (not just a hook call) so giving it a `key` from the
// parent resets its drag state cleanly whenever the card underneath changes.
function SwipeCard({ className, onSwipeLeft, onSwipeRight, enabled, children }) {
  const { handlers, style } = useSwipeCard({ onSwipeLeft, onSwipeRight, enabled });
  return (
    <div className={className} {...handlers} style={style}>
      {children}
    </div>
  );
}

function Progress({ step }) {
  return (
    <div className="progress">
      <div className="tab-row">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={"tab-clip" + (i <= step ? " is-filled" : "")} />
        ))}
      </div>
      <div className="progress-label">
        Card {step + 1} of 4
        <small>{STEP_NAMES[step]}</small>
      </div>
    </div>
  );
}

function LoadingView() {
  const tips = [
    "Calculating your calorie targets…",
    "Balancing your macros…",
    "Building your shopping list…",
    "Adding recipes you'll actually want to cook…",
    "Almost ready…",
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % tips.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="loading">
      <div className="loading-ring">
        <div className="track" />
        <div className="spin" />
        <div className="spin-slow" />
        <div className="icon">✏️</div>
      </div>
      <h3 className="loading-title">Building your plan</h3>
      <p className="loading-tip">{tips[i]}</p>
      <div className="loading-dots">
        {[0, 1, 2].map((j) => (
          <span key={j} style={{ animationDelay: j * 0.2 + "s" }} />
        ))}
      </div>
    </div>
  );
}

function PlanView({ plan, profile, onRestart }) {
  const [activeDay, setActiveDay] = useState(0);
  const [dayTab, setDayTab] = useState("meals");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [plan]);

  const goalLabel = profile.goal === "lose" ? "Weight Loss" : profile.goal === "gain" ? "Build Muscle" : "Balanced";

  const days = parseDays(plan);
  const recipeDays = parseRecipes(plan);
  const shoppingText = getSection(plan, "SHOPPING", "TIPS");
  const tipsText = getSection(plan, "TIPS", "RECIPES");

  const mealIcons = { breakfast: "☀️", lunch: "🌤", dinner: "🌙", snack: "🍎" };

  const dayCardEnabled = dayTab === "meals" || dayTab === "recipes";
  const hasPrevDay = activeDay > 0;
  const hasNextDay = activeDay < days.length - 1;

  return (
    <div className="fade-in">
      <div className="plan-head">
        <div className="plan-badge">✓ Plan ready</div>
        <h2 className="plan-title">Your {goalLabel} Plan</h2>
        <div className="plan-stats">
          <span className="plan-stat">${profile.budget}/month</span>
          <span className="plan-stat">{profile.meals} meals/day</span>
        </div>
      </div>

      <div className="day-selector">
        {days.map((d, i) => (
          <button key={i} onClick={() => setActiveDay(i)} className={"day-pill" + (activeDay === i ? " is-active" : "")}>
            Day {d.day}
          </button>
        ))}
      </div>

      <div className="card-stack">
        <div className="stack-peek stack-peek-2" />
        <div className="stack-peek stack-peek-1" />
        <SwipeCard
          key={activeDay}
          className="index-card"
          enabled={dayCardEnabled}
          onSwipeLeft={hasNextDay ? () => setActiveDay((d) => d + 1) : undefined}
          onSwipeRight={hasPrevDay ? () => setActiveDay((d) => d - 1) : undefined}
        >
          <div className="segmented">
            {[
              ["meals", "🍽", "Meals"],
              ["recipes", "📖", "Recipes"],
            ].map(([id, icon, label]) => (
              <button key={id} onClick={() => setDayTab(id)} className={dayTab === id ? "is-active" : ""}>
                {icon} {label}
              </button>
            ))}
          </div>

          {dayTab === "meals" && days[activeDay] && (
            <div className="fade-in">
              <div className="day-heading">Day {days[activeDay].day}</div>
              {days[activeDay].meals.length > 0 ? (
                days[activeDay].meals.map((meal, i) => {
                  const type = classifyMealType(meal.type);
                  return (
                    <div key={i} className="meal-row">
                      <MealPhoto
                        query={dishNameFromMealContent(meal.content)}
                        type={type}
                        icon={mealIcons[type] || "🍽"}
                        tilt={i % 2 === 0 ? "left" : "right"}
                      />
                      <div>
                        <span className="meal-type-tag">{meal.type}</span>
                        <p className="meal-text">{meal.content}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="empty-note">
                  <p>No meals found for this day.</p>
                </div>
              )}
            </div>
          )}

          {dayTab === "recipes" && (
            <div className="fade-in scroll-panel">
              {(recipeDays[days[activeDay]?.day] || []).length > 0 ? (
                (recipeDays[days[activeDay]?.day] || []).map((meal, i) => (
                  <div key={i} className="recipe-card">
                    <div className="recipe-head-row">
                      <MealPhoto
                        query={meal.name}
                        type={classifyMealType(meal.type)}
                        icon={mealIcons[classifyMealType(meal.type)]}
                        tilt={i % 2 === 0 ? "left" : "right"}
                        size="lg"
                      />
                      <div>
                        <div className="recipe-eyebrow">{meal.type}</div>
                        <div className="recipe-name">{meal.name}</div>
                      </div>
                    </div>
                    {meal.ingredients && (
                      <div>
                        <div className="recipe-section-title ingredients">Ingredients</div>
                        {meal.ingredients
                          .split("\n")
                          .filter((l) => l.trim())
                          .map((ing, j) => (
                            <div key={j} className="ingredient-row">
                              <span className="ingredient-check" />
                              <span>{ing.replace(/^-\s*/, "").trim()}</span>
                            </div>
                          ))}
                      </div>
                    )}
                    {meal.steps && (
                      <div>
                        <div className="recipe-section-title steps">Steps</div>
                        {meal.steps
                          .split("\n")
                          .filter((l) => l.trim())
                          .map((step, j) => (
                            <div key={j} className="step-row">
                              <div className="step-badge">{j + 1}</div>
                              <span>{step.replace(/^\d+\.\s*/, "").trim()}</span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="empty-note">
                  <p>Generate a new plan to see recipes here.</p>
                </div>
              )}
            </div>
          )}

          {(hasPrevDay || hasNextDay) && (
            <span className="swipe-hint">
              {hasPrevDay ? "← " : ""}swipe{hasNextDay ? " →" : ""}
            </span>
          )}
        </SwipeCard>
      </div>

      <div className="segmented" style={{ marginTop: "16px", marginBottom: "0" }}>
        {[
          ["shopping", "🛒 Shopping"],
          ["tips", "💡 Tips"],
        ].map(([id, label]) => (
          <button key={id} onClick={() => setDayTab(id)} className={dayTab === id ? "is-active" : ""}>
            {label}
          </button>
        ))}
      </div>

      {dayTab === "shopping" && (
        <div className="shopping-panel" style={{ marginTop: "12px" }}>
          {shoppingText
            .split("\n")
            .filter((l) => l.trim())
            .map((line, i) => {
              const isCat = /^(produce|proteins|grains|dairy|pantry|total)/i.test(line.trim());
              return isCat ? (
                <div key={i} className="shopping-category">
                  {line.trim()}
                </div>
              ) : (
                <div key={i} className="shopping-row">
                  <span className="shopping-check" />
                  <span>{line.replace(/^[-•]\s*/, "").trim()}</span>
                </div>
              );
            })}
        </div>
      )}

      {dayTab === "tips" && (
        <div className="tips-panel" style={{ marginTop: "12px" }}>
          {tipsText
            .split("\n")
            .filter((l) => l.trim())
            .map((line, i) => {
              const isNum = /^\d+\./.test(line.trim());
              return isNum ? (
                <div key={i} className="tip-card">
                  <div className="tip-badge">{line.trim()[0]}</div>
                  <p className="tip-text">{line.replace(/^\d+\.\s*/, "")}</p>
                </div>
              ) : (
                <p key={i} className="plain">
                  {line}
                </p>
              );
            })}
        </div>
      )}

      <div className="actions-grid">
        <button onClick={onRestart} className="btn btn-ghost">
          ← Start Over
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            const b = new Blob([plan], { type: "text/plain" });
            const u = URL.createObjectURL(b);
            const a = document.createElement("a");
            a.href = u;
            a.download = "meal-plan.txt";
            a.click();
          }}
        >
          ↓ Download
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [animKey, setAnimKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const [p, setP] = useState({
    goal: "lose",
    age: "",
    weight: "",
    height: "",
    gender: "female",
    activity: "moderate",
    meals: "3",
    skill: "beginner",
    restrictions: [],
    budget: "",
    calories: "",
  });

  const upd = (k, v) => setP((prev) => ({ ...prev, [k]: v }));
  const toggleR = (r) => setP((prev) => ({ ...prev, restrictions: toggleRestriction(prev.restrictions, r) }));
  const canNext = () => canNextStep(step, p);

  const goForward = () => {
    setDirection("forward");
    setAnimKey((k) => k + 1);
    setStep((s) => s + 1);
  };
  const goBack = () => {
    setDirection("back");
    setAnimKey((k) => k + 1);
    setStep((s) => s - 1);
  };

  const generate = async () => {
    setLoading(true);
    setError(null);

    let userLocation = "United States";
    try {
      const coords = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
      });
      const geoRes = await fetch(
        "https://nominatim.openstreetmap.org/reverse?lat=" +
          coords.coords.latitude +
          "&lon=" +
          coords.coords.longitude +
          "&format=json"
      );
      const geoData = await geoRes.json();
      const city = geoData.address?.city || geoData.address?.town || geoData.address?.county || "";
      const state = geoData.address?.state || "";
      const country = geoData.address?.country || "United States";
      userLocation = [city, state, country].filter(Boolean).join(", ");
    } catch (e) {
      userLocation = "United States";
    }

    const weekly = Math.round((Number(p.budget) || 300) / 4);
    const goalLabel = p.goal === "lose" ? "Weight Loss" : p.goal === "gain" ? "Build Muscle" : "Stay Balanced";
    const restr = p.restrictions.length ? p.restrictions.join(", ") : "None";
    const snacks = p.meals === "3+" ? ", and 2 snacks" : "";

    const planMsg =
      "You are a professional nutritionist. Create a detailed 7-day meal plan.\n\n" +
      "PROFILE: Age:" + p.age + " Gender:" + p.gender + " Weight:" + p.weight + "lbs Height:" + p.height + "in\n" +
      "Goal:" + goalLabel + " Activity:" + p.activity + " Meals/day:" + p.meals + " Skill:" + p.skill + "\n" +
      "Budget:$" + p.budget + "/month (~$" + weekly + "/week) Restrictions:" + restr + "\n\n" +
      "Use EXACTLY these three section headers on their own lines:\n\n" +
      "MEAL PLAN\n" +
      "7 days. Each day: 'Day 1', 'Day 2' etc on its own line. Then breakfast, lunch, dinner" + snacks + ". Each meal: name, calories in parentheses, one sentence description. No recipes here.\n\n" +
      "SHOPPING\n" +
      "Shopping list by category (Produce, Proteins, Grains & Pantry, Dairy & Alternatives) with estimated costs based on typical grocery prices in " + userLocation + ". Total ~$" + weekly + "/week.\n\n" +
      "TIPS\n" +
      "5 specific tips for this person based on their " + goalLabel + " goal, $" + p.budget + "/month budget, and restrictions: " + restr + ".";

    const recipeMsg =
      "You are a professional nutritionist. Create full recipes for a 7-day meal plan.\n\n" +
      "PROFILE: Goal:" + goalLabel + " Restrictions:" + restr + " Skill:" + p.skill + "\n\n" +
      "Meals per day: " + p.meals + (snacks ? " with 2 snacks" : "") + "\n\n" +
      "Provide a full recipe for EVERY meal across all 7 days. Format EXACTLY as:\n" +
      "Day [N] - [Meal Type]: [Meal Name]\n" +
      "Ingredients:\n" +
      "- ingredient 1\n" +
      "- ingredient 2\n" +
      "Steps:\n" +
      "1. step 1\n" +
      "2. step 2\n\n" +
      "Start with Day 1 - Breakfast and go through Day 7 - Dinner" + snacks + ".";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: planMsg, stream: true }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "HTTP " + res.status);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      setPlan("");
      setLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((l) => l.trim());
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullText += parsed.text;
                setPlan(fullText);
                await new Promise((r) => setTimeout(r, 20));
              }
            } catch (e) {}
          }
        }
      }

      const recipeRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: recipeMsg, stream: false }),
      });

      const recipeData = await recipeRes.json();
      const recipeText = recipeData.content || "";

      setPlan(fullText + "\n\nRECIPES\n" + recipeText);
    } catch (e) {
      setError(String(e.message || e));
      setLoading(false);
    }
  };

  const idle = !loading && !plan;
  const canSwipeForward = step < 3 && canNext();
  const canSwipeBack = step > 0;

  return (
    <div className="page">
      <div className="center">
        <div className="brand">
          <h1 className="brand-name">Nourish</h1>
          <p className="brand-tag">A Little Recipe Box</p>
        </div>

        <div className="card">
          {loading ? (
            <LoadingView />
          ) : plan ? (
            <PlanView
              plan={plan}
              profile={p}
              onRestart={() => {
                setPlan(null);
                setStep(0);
                setError(null);
              }}
            />
          ) : (
            <>
              <Progress step={step} />
              {error && <div className="error-box">{error}</div>}

              <div className="card-stack">
                <div className="stack-peek stack-peek-2" />
                <div className="stack-peek stack-peek-1" />
                <div key={animKey} className={direction === "forward" ? "step-enter" : "step-back"}>
                <SwipeCard
                  className="index-card"
                  enabled={idle}
                  onSwipeLeft={canSwipeForward ? goForward : undefined}
                  onSwipeRight={canSwipeBack ? goBack : undefined}
                >
                  {step === 0 && (
                    <div className="welcome">
                      <p className="welcome-greeting">Hello,</p>
                      <h2 className="step-title">Welcome to Nourish</h2>
                      <p className="step-sub">
                        Answer 4 quick questions and get a fully personalized 7-day meal plan with recipes, a shopping
                        list, and tips tailored to your budget and goals.
                      </p>
                      <div className="feature-grid">
                        {["Goal-based", "Budget-aware", "Diet-friendly"].map((label) => (
                          <div key={label} className="feature-label">
                            {label}
                          </div>
                        ))}
                      </div>
                      <button className="btn btn-primary" onClick={goForward} style={{ width: "100%" }}>
                        Get Started →
                      </button>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <h2 className="step-title">About you</h2>
                      <p className="step-sub">Used to calculate your ideal calorie targets.</p>
                      <div className="grid-2">
                        <div className="field">
                          <label className="label">Age</label>
                          <input
                            className="control"
                            type="number"
                            value={p.age}
                            onChange={(e) => upd("age", e.target.value)}
                            placeholder="28"
                          />
                        </div>
                        <div className="field">
                          <label className="label">Gender</label>
                          <select className="control" value={p.gender} onChange={(e) => upd("gender", e.target.value)}>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="field">
                          <label className="label">Weight (lbs)</label>
                          <input
                            className="control"
                            type="number"
                            value={p.weight}
                            onChange={(e) => upd("weight", e.target.value)}
                            placeholder="160"
                          />
                        </div>
                        <div className="field">
                          <label className="label">Height (in)</label>
                          <input
                            className="control"
                            type="number"
                            value={p.height}
                            onChange={(e) => upd("height", e.target.value)}
                            placeholder="67"
                          />
                        </div>
                      </div>
                      <div className="field" style={{ marginTop: "2px" }}>
                        <label className="label">Cooking Skill</label>
                        <select className="control" value={p.skill} onChange={(e) => upd("skill", e.target.value)}>
                          <option value="beginner">Beginner — quick simple meals</option>
                          <option value="intermediate">Intermediate — comfortable cooking</option>
                          <option value="advanced">Advanced — love to cook</option>
                        </select>
                      </div>
                      <div className="field">
                        <label className="label">Meals Per Day</label>
                        <select className="control" value={p.meals} onChange={(e) => upd("meals", e.target.value)}>
                          <option value="2">2 meals</option>
                          <option value="3">3 meals</option>
                          <option value="3+">3 meals + snacks</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h2 className="step-title">Your goal &amp; activity</h2>
                      <p className="step-sub">We'll tailor your entire plan around this.</p>
                      {GOALS.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => upd("goal", g.id)}
                          className={"goal-card" + (p.goal === g.id ? " is-selected" : "")}
                        >
                          <span className="goal-icon">{g.icon}</span>
                          <div style={{ textAlign: "left" }}>
                            <div className="goal-title">{g.label}</div>
                            <div className="goal-desc">{g.desc}</div>
                          </div>
                          {p.goal === g.id && <span className="goal-check">✓</span>}
                        </button>
                      ))}
                      <label className="label" style={{ marginTop: "10px" }}>
                        Activity Level
                      </label>
                      <div className="activity-grid">
                        {ACTIVITIES.map((a) => (
                          <button
                            key={a.id}
                            onClick={() => upd("activity", a.id)}
                            className={"activity-card" + (p.activity === a.id ? " is-selected" : "")}
                          >
                            <div className="activity-title">{a.label}</div>
                            <div className="activity-desc">{a.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h2 className="step-title">Diet &amp; Budget</h2>
                      <p className="step-sub">Customize your plan to fit your lifestyle.</p>
                      <label className="label">Dietary restrictions (select all that apply)</label>
                      <div className="chip-group">
                        {DIETARY.map((d) => (
                          <button
                            key={d.id}
                            onClick={() => toggleR(d.id)}
                            className={"chip" + (p.restrictions.includes(d.id) ? " is-selected" : "")}
                          >
                            <span>{d.icon}</span>
                            <span>{d.label}</span>
                          </button>
                        ))}
                      </div>
                      <div className="field">
                        <label className="label">Monthly Food Budget ($)</label>
                        <input
                          className="control"
                          type="number"
                          value={p.budget}
                          onChange={(e) => upd("budget", e.target.value)}
                          placeholder="300"
                        />
                        {p.budget && (
                          <div className="hint">
                            ≈ ${Math.round(p.budget / 4)}/week · ≈ ${Math.round(p.budget / 30)}/day
                          </div>
                        )}
                      </div>
                      <div className="field">
                        <label className="label">Daily Calorie Target (optional)</label>
                        <input
                          className="control"
                          type="number"
                          value={p.calories}
                          onChange={(e) => upd("calories", e.target.value)}
                          placeholder="Leave blank to auto-calculate"
                        />
                      </div>
                    </div>
                  )}

                  {(canSwipeBack || canSwipeForward) && (
                    <span className="swipe-hint">
                      {canSwipeBack ? "← " : ""}swipe{canSwipeForward ? " →" : ""}
                    </span>
                  )}
                </SwipeCard>
                </div>
              </div>

              {step > 0 && (
                <div className="actions-row">
                  <button onClick={goBack} className="btn btn-ghost">
                    ← Back
                  </button>
                  <div style={{ flex: 1 }}>
                    <button
                      onClick={() => {
                        if (step < 3) goForward();
                        else generate();
                      }}
                      className={"btn " + (canNext() ? "btn-primary" : "btn-disabled")}
                      disabled={!canNext()}
                    >
                      {step === 3 ? "Generate My Plan" : "Continue →"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <p className="footer-note">Not medical advice — consult a professional for personalized guidance.</p>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  Actions,
  ActivityCard,
  ActivityGrid,
  Brand,
  Button,
  CardStack,
  Chip,
  ChipGroup,
  DayHeading,
  DayTabs,
  EmptyNote,
  ErrorNote,
  FeatureGrid,
  FieldLabel,
  FieldPair,
  GoalCard,
  IndexCard,
  IngredientRow,
  LoadingView,
  MealRow,
  Page,
  PlanHeader,
  Polaroid,
  Progress,
  RecipeBox,
  RecipeEntry,
  RecipeSectionTitle,
  ScrollPanel,
  Segmented,
  SelectField,
  ShoppingCategory,
  ShoppingRow,
  StepRow,
  StepSub,
  StepTitle,
  SwipeHint,
  TextField,
  TipCard,
  WelcomeGreeting,
} from "@nourish/ui";
import { getSection, parseDays, parseRecipes, classifyMealType } from "./lib/planParser";
import { canNext as canNextStep, toggleRestriction } from "./lib/formHelpers";
import { describeZipForPricing } from "./lib/groceryIndex";

const DIETARY = [
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "dairy-free", label: "Dairy-Free" },
  { id: "vegan", label: "Vegan" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "keto", label: "Keto" },
  { id: "paleo", label: "Paleo" },
  { id: "nut-free", label: "Nut-Free" },
  { id: "low-sodium", label: "Low Sodium" },
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

const GENDERS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
];

const SKILLS = [
  { value: "beginner", label: "Beginner — quick simple meals" },
  { value: "intermediate", label: "Intermediate — comfortable cooking" },
  { value: "advanced", label: "Advanced — love to cook" },
];

const MEALS_PER_DAY = [
  { value: "2", label: "2 meals" },
  { value: "3", label: "3 meals" },
  { value: "3+", label: "3 meals + snacks" },
];

const STEP_NAMES = ["Intro", "Profile", "Goals & Activity", "Budget & Diet"];

const LOADING_TIPS = [
  "Calculating your calorie targets…",
  "Balancing your macros…",
  "Building your shopping list…",
  "Adding recipes you'll actually want to cook…",
  "Almost ready…",
];

const MEAL_ICONS = { breakfast: "☀️", lunch: "🌤", dinner: "🌙", snack: "🍎" };

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

// Fetches the photo, then hands presentation to the design system's Polaroid.
function MealPhoto({ query, type, icon, tilt = "left", size }) {
  const { photo, loaded } = usePhoto(query);
  const [errored, setErrored] = useState(false);
  const hasPhoto = loaded && photo?.url && !errored;

  return (
    <Polaroid
      src={hasPhoto ? photo.url : undefined}
      alt={query}
      loading={!loaded}
      type={type}
      fallbackIcon={icon}
      tilt={tilt}
      size={size}
      credit={hasPhoto ? photo.photographer : undefined}
      creditHref={
        hasPhoto
          ? (photo.photographerUrl || photo.unsplashUrl || "#") + "?utm_source=nourish&utm_medium=referral"
          : undefined
      }
      onImageError={() => setErrored(true)}
    />
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
function SwipeCard({ onSwipeLeft, onSwipeRight, enabled, children }) {
  const { handlers, style } = useSwipeCard({ onSwipeLeft, onSwipeRight, enabled });
  return (
    <IndexCard style={style} {...handlers}>
      {children}
    </IndexCard>
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

  const dayCardEnabled = dayTab === "meals" || dayTab === "recipes";
  const hasPrevDay = activeDay > 0;
  const hasNextDay = activeDay < days.length - 1;
  const currentDay = days[activeDay];

  return (
    <div className="fade-in">
      <PlanHeader
        badge="✓ Plan ready"
        title={`Your ${goalLabel} Plan`}
        stats={[`$${profile.budget}/month`, `${profile.meals} meals/day`]}
      />

      <DayTabs
        days={days.map((d) => d.day)}
        value={currentDay?.day}
        onChange={(day) => setActiveDay(days.findIndex((d) => d.day === day))}
      />

      <CardStack>
        <SwipeCard
          key={activeDay}
          enabled={dayCardEnabled}
          onSwipeLeft={hasNextDay ? () => setActiveDay((d) => d + 1) : undefined}
          onSwipeRight={hasPrevDay ? () => setActiveDay((d) => d - 1) : undefined}
        >
          <Segmented
            items={[
              { id: "meals", label: "🍽 Meals" },
              { id: "recipes", label: "📖 Recipes" },
            ]}
            value={dayTab}
            onChange={setDayTab}
          />

          {dayTab === "meals" && currentDay && (
            <div className="fade-in">
              <DayHeading>Day {currentDay.day}</DayHeading>
              {currentDay.meals.length > 0 ? (
                currentDay.meals.map((meal, i) => {
                  const type = classifyMealType(meal.type);
                  return (
                    <MealRow
                      key={i}
                      type={meal.type}
                      photo={
                        <MealPhoto
                          query={dishNameFromMealContent(meal.content)}
                          type={type}
                          icon={MEAL_ICONS[type] || "🍽"}
                          tilt={i % 2 === 0 ? "left" : "right"}
                        />
                      }
                    >
                      {meal.content}
                    </MealRow>
                  );
                })
              ) : (
                <EmptyNote>No meals found for this day.</EmptyNote>
              )}
            </div>
          )}

          {dayTab === "recipes" && (
            <ScrollPanel className="fade-in">
              {(recipeDays[currentDay?.day] || []).length > 0 ? (
                (recipeDays[currentDay?.day] || []).map((meal, i) => (
                  <RecipeEntry
                    key={i}
                    name={meal.name}
                    type={meal.type}
                    photo={
                      <MealPhoto
                        query={meal.name}
                        type={classifyMealType(meal.type)}
                        icon={MEAL_ICONS[classifyMealType(meal.type)]}
                        tilt={i % 2 === 0 ? "left" : "right"}
                        size="lg"
                      />
                    }
                  >
                    {meal.ingredients && (
                      <div>
                        <RecipeSectionTitle tone="ingredients">Ingredients</RecipeSectionTitle>
                        {meal.ingredients
                          .split("\n")
                          .filter((l) => l.trim())
                          .map((ing, j) => (
                            <IngredientRow key={j}>{ing.replace(/^-\s*/, "").trim()}</IngredientRow>
                          ))}
                      </div>
                    )}
                    {meal.steps && (
                      <div>
                        <RecipeSectionTitle tone="steps">Steps</RecipeSectionTitle>
                        {meal.steps
                          .split("\n")
                          .filter((l) => l.trim())
                          .map((step, j) => (
                            <StepRow key={j} number={j + 1}>
                              {step.replace(/^\d+\.\s*/, "").trim()}
                            </StepRow>
                          ))}
                      </div>
                    )}
                  </RecipeEntry>
                ))
              ) : (
                <EmptyNote>Generate a new plan to see recipes here.</EmptyNote>
              )}
            </ScrollPanel>
          )}

          {(hasPrevDay || hasNextDay) && (
            <SwipeHint>
              {hasPrevDay ? "← " : ""}swipe{hasNextDay ? " →" : ""}
            </SwipeHint>
          )}
        </SwipeCard>
      </CardStack>

      <div style={{ marginTop: "16px", marginBottom: "0" }}>
        <Segmented
          items={[
            { id: "shopping", label: "🛒 Shopping" },
            { id: "tips", label: "💡 Tips" },
          ]}
          value={dayTab}
          onChange={setDayTab}
        />
      </div>

      {dayTab === "shopping" && (
        <div style={{ marginTop: "12px" }}>
          <ScrollPanel size="panel">
            {shoppingText
              .split("\n")
              .filter((l) => l.trim())
              .map((line, i) => {
                const isCat = /^(produce|proteins|grains|dairy|pantry|total)/i.test(line.trim());
                return isCat ? (
                  <ShoppingCategory key={i}>{line.trim()}</ShoppingCategory>
                ) : (
                  <ShoppingRow key={i}>{line.replace(/^[-•]\s*/, "").trim()}</ShoppingRow>
                );
              })}
          </ScrollPanel>
        </div>
      )}

      {dayTab === "tips" && (
        <div style={{ marginTop: "12px" }}>
          <ScrollPanel size="tips">
            {tipsText
              .split("\n")
              .filter((l) => l.trim())
              .map((line, i) => {
                const isNum = /^\d+\./.test(line.trim());
                return isNum ? (
                  <TipCard key={i} number={line.trim()[0]}>
                    {line.replace(/^\d+\.\s*/, "")}
                  </TipCard>
                ) : (
                  <p key={i} className="plain">
                    {line}
                  </p>
                );
              })}
          </ScrollPanel>
        </div>
      )}

      <Actions layout="grid">
        <Button variant="ghost" onClick={onRestart}>
          ← Start Over
        </Button>
        <Button
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
        </Button>
      </Actions>
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
    zip: "",
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

    const userLocation = p.zip ? await describeZipForPricing(p.zip) : "the United States";

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
    <Page>
      <Brand name="Nourish" tagline="A Little Recipe Box" />

      <RecipeBox>
        {loading ? (
          <LoadingView title="Building your plan" tips={LOADING_TIPS} />
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
            <Progress count={4} current={step} label={STEP_NAMES[step]} />
            {error && <ErrorNote>{error}</ErrorNote>}

            <CardStack>
              <div key={animKey} className={direction === "forward" ? "step-enter" : "step-back"}>
                <SwipeCard
                  enabled={idle}
                  onSwipeLeft={canSwipeForward ? goForward : undefined}
                  onSwipeRight={canSwipeBack ? goBack : undefined}
                >
                  {step === 0 && (
                    <div className="welcome">
                      <WelcomeGreeting>Hello,</WelcomeGreeting>
                      <StepTitle>Welcome to Nourish</StepTitle>
                      <StepSub>
                        Answer 4 quick questions and get a fully personalized 7-day meal plan with recipes, a shopping
                        list, and tips tailored to your budget and goals.
                      </StepSub>
                      <FeatureGrid labels={["Goal-based", "Budget-aware", "Diet-friendly"]} />
                      <Button onClick={goForward}>Get Started →</Button>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <StepTitle>About you</StepTitle>
                      <StepSub>Used to calculate your ideal calorie targets.</StepSub>
                      <FieldPair>
                        <TextField
                          label="Age"
                          type="number"
                          value={p.age}
                          onChange={(v) => upd("age", v)}
                          placeholder="28"
                        />
                        <SelectField
                          label="Gender"
                          value={p.gender}
                          onChange={(v) => upd("gender", v)}
                          options={GENDERS}
                        />
                        <TextField
                          label="Weight (lbs)"
                          type="number"
                          value={p.weight}
                          onChange={(v) => upd("weight", v)}
                          placeholder="160"
                        />
                        <TextField
                          label="Height (in)"
                          type="number"
                          value={p.height}
                          onChange={(v) => upd("height", v)}
                          placeholder="67"
                        />
                      </FieldPair>
                      <SelectField
                        label="Cooking Skill"
                        value={p.skill}
                        onChange={(v) => upd("skill", v)}
                        options={SKILLS}
                      />
                      <SelectField
                        label="Meals Per Day"
                        value={p.meals}
                        onChange={(v) => upd("meals", v)}
                        options={MEALS_PER_DAY}
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <StepTitle>Your goal &amp; activity</StepTitle>
                      <StepSub>We'll tailor your entire plan around this.</StepSub>
                      {GOALS.map((g) => (
                        <GoalCard
                          key={g.id}
                          icon={g.icon}
                          label={g.label}
                          description={g.desc}
                          selected={p.goal === g.id}
                          onClick={() => upd("goal", g.id)}
                        />
                      ))}
                      <div style={{ marginTop: "10px" }}>
                        <FieldLabel>Activity Level</FieldLabel>
                      </div>
                      <ActivityGrid>
                        {ACTIVITIES.map((a) => (
                          <ActivityCard
                            key={a.id}
                            label={a.label}
                            description={a.desc}
                            selected={p.activity === a.id}
                            onClick={() => upd("activity", a.id)}
                          />
                        ))}
                      </ActivityGrid>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <StepTitle>Diet &amp; Budget</StepTitle>
                      <StepSub>Customize your plan to fit your lifestyle.</StepSub>
                      <FieldLabel>Dietary restrictions (select all that apply)</FieldLabel>
                      <ChipGroup>
                        {DIETARY.map((d) => (
                          <Chip
                            key={d.id}
                            label={d.label}
                            selected={p.restrictions.includes(d.id)}
                            onClick={() => toggleR(d.id)}
                          />
                        ))}
                      </ChipGroup>
                      <TextField
                        label="Monthly Food Budget ($)"
                        type="number"
                        value={p.budget}
                        onChange={(v) => upd("budget", v)}
                        placeholder="300"
                        hint={
                          p.budget
                            ? `≈ $${Math.round(p.budget / 4)}/week · ≈ $${Math.round(p.budget / 30)}/day`
                            : undefined
                        }
                      />
                      <TextField
                        label="ZIP Code (optional)"
                        value={p.zip}
                        inputMode="numeric"
                        maxLength={10}
                        onChange={(v) => upd("zip", v)}
                        placeholder="For local grocery pricing"
                      />
                      <TextField
                        label="Daily Calorie Target (optional)"
                        type="number"
                        value={p.calories}
                        onChange={(v) => upd("calories", v)}
                        placeholder="Leave blank to auto-calculate"
                      />
                    </div>
                  )}

                  {(canSwipeBack || canSwipeForward) && (
                    <SwipeHint>
                      {canSwipeBack ? "← " : ""}swipe{canSwipeForward ? " →" : ""}
                    </SwipeHint>
                  )}
                </SwipeCard>
              </div>
            </CardStack>

            {step > 0 && (
              <Actions>
                <Button variant="ghost" onClick={goBack}>
                  ← Back
                </Button>
                <Button
                  onClick={() => {
                    if (step < 3) goForward();
                    else generate();
                  }}
                  disabled={!canNext()}
                >
                  {step === 3 ? "Generate My Plan" : "Continue →"}
                </Button>
              </Actions>
            )}
          </>
        )}
      </RecipeBox>

      <p className="footer-note">Not medical advice — consult a professional for personalized guidance.</p>
    </Page>
  );
}

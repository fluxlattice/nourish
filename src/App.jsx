import { useState, useEffect, useRef } from "react";

const DIETARY = [
  {id:"gluten-free",label:"Gluten-Free",icon:"🌾"},
  {id:"dairy-free",label:"Dairy-Free",icon:"🥛"},
  {id:"vegan",label:"Vegan",icon:"🌿"},
  {id:"vegetarian",label:"Vegetarian",icon:"🥦"},
  {id:"keto",label:"Keto",icon:"🥑"},
  {id:"paleo",label:"Paleo",icon:"🍖"},
  {id:"nut-free",label:"Nut-Free",icon:"🥜"},
  {id:"low-sodium",label:"Low Sodium",icon:"🧂"},
];

const GOALS = [
  {id:"lose",label:"Lose Weight",desc:"Calorie deficit, high protein",icon:"🔥"},
  {id:"maintain",label:"Stay Balanced",desc:"Sustainable healthy habits",icon:"⚖️"},
  {id:"gain",label:"Build Muscle",desc:"Calorie surplus, protein-rich",icon:"💪"},
];

const ACTIVITIES = [
  {id:"sedentary",label:"Mostly Sitting",desc:"Desk job, little exercise"},
  {id:"light",label:"Lightly Active",desc:"1–2 workouts/week"},
  {id:"moderate",label:"Moderately Active",desc:"3–4 workouts/week"},
  {id:"very",label:"Very Active",desc:"Daily intense exercise"},
];

const animStyles = `
  @keyframes slideInRight { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
  @keyframes slideInLeft { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0); } }
  @keyframes fadeScaleIn { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }
  @keyframes bounceIn { 0% { transform:scale(1); } 30% { transform:scale(0.96); } 60% { transform:scale(1.03); } 100% { transform:scale(1); } }
  .step-enter { animation: slideInRight 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .step-back { animation: slideInLeft 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .plan-enter { animation: fadeScaleIn 0.4s ease forwards; }
  .btn-bounce:active { animation: bounceIn 0.3s ease forwards; }
`;

const GS = {
  page: {minHeight:"100vh",background:"linear-gradient(135deg,#0a1628 0%,#0d2010 50%,#0a1628 100%)",fontFamily:"Georgia,serif",padding:"24px 20px 48px",boxSizing:"border-box"},
  center: {maxWidth:"460px",margin:"0 auto"},
  card: {background:"rgba(255,255,255,0.07)",borderRadius:"24px",border:"1px solid rgba(255,255,255,0.12)",padding:"28px",boxShadow:"0 24px 64px rgba(0,0,0,0.3)"},
  h2: {color:"#fff",fontSize:"22px",fontWeight:"700",marginBottom:"6px",marginTop:0},
  sub: {color:"rgba(255,255,255,0.45)",fontSize:"14px",marginBottom:"24px",lineHeight:"1.6"},
  label: {display:"block",fontSize:"11px",fontWeight:"600",letterSpacing:"1.5px",textTransform:"uppercase",color:"rgba(255,255,255,0.45)",marginBottom:"8px"},
  input: {width:"100%",boxSizing:"border-box",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"14px",padding:"13px 16px",color:"#fff",fontSize:"15px",outline:"none",fontFamily:"Georgia,serif"},
  select: {width:"100%",boxSizing:"border-box",background:"#0d2010",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"14px",padding:"13px 16px",color:"#fff",fontSize:"15px",outline:"none",cursor:"pointer"},
  btnPrimary: {width:"100%",padding:"15px",borderRadius:"14px",border:"none",background:"linear-gradient(135deg,#86C575,#4ECDC4)",color:"#0a1f0a",fontSize:"16px",fontWeight:"700",cursor:"pointer",fontFamily:"Georgia,serif"},
  btnDisabled: {width:"100%",padding:"15px",borderRadius:"14px",border:"none",background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.25)",fontSize:"16px",cursor:"not-allowed",fontFamily:"Georgia,serif"},
  btnBack: {padding:"13px 20px",borderRadius:"14px",border:"1px solid rgba(255,255,255,0.15)",background:"transparent",color:"rgba(255,255,255,0.5)",fontSize:"14px",cursor:"pointer",fontFamily:"Georgia,serif"},
  row: {display:"flex",gap:"10px",marginTop:"24px"},
  chip: (sel) => ({padding:"9px 16px",borderRadius:"100px",border:sel?"1px solid rgba(134,197,117,0.6)":"1px solid rgba(255,255,255,0.1)",background:sel?"rgba(134,197,117,0.15)":"rgba(255,255,255,0.04)",color:sel?"#86C575":"rgba(255,255,255,0.5)",fontSize:"13px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"6px",fontFamily:"Georgia,serif"}),
  goalBtn: (sel) => ({width:"100%",padding:"16px 18px",borderRadius:"16px",border:sel?"1px solid rgba(134,197,117,0.5)":"1px solid rgba(255,255,255,0.08)",background:sel?"rgba(134,197,117,0.1)":"rgba(255,255,255,0.03)",cursor:"pointer",textAlign:"left",marginBottom:"10px",display:"flex",alignItems:"center",gap:"14px"}),
  actBtn: (sel) => ({flex:1,padding:"13px 10px",borderRadius:"14px",border:sel?"1px solid rgba(134,197,117,0.5)":"1px solid rgba(255,255,255,0.08)",background:sel?"rgba(134,197,117,0.1)":"rgba(255,255,255,0.03)",cursor:"pointer",textAlign:"center"}),
  grid2: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px 14px"},
  tab: (sel) => ({flex:1,padding:"10px 6px",borderRadius:"12px",border:"none",background:sel?"rgba(134,197,117,0.18)":"transparent",color:sel?"#86C575":"rgba(255,255,255,0.4)",fontSize:"13px",fontWeight:sel?"700":"400",cursor:"pointer",fontFamily:"Georgia,serif"}),
  err: {background:"rgba(255,80,80,0.1)",border:"1px solid rgba(255,80,80,0.25)",borderRadius:"12px",padding:"12px 14px",color:"#ff9090",fontSize:"12px",fontFamily:"monospace",wordBreak:"break-all",marginBottom:"16px",lineHeight:"1.6"},
  hint: {fontSize:"12px",color:"rgba(255,255,255,0.3)",marginTop:"5px",paddingLeft:"4px"},
};

function Dots({step}) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",marginBottom:"28px"}}>
      {[0,1,2,3].map(i=>(
        <div key={i} style={{height:"8px",borderRadius:"8px",background:i<=step?"linear-gradient(90deg,#86C575,#4ECDC4)":"rgba(255,255,255,0.15)",width:i===step?"28px":"8px",transition:"all 0.35s cubic-bezier(0.34,1.56,0.64,1)",boxShadow:i<=step?"0 0 10px rgba(134,197,117,0.4)":"none"}} />
      ))}
    </div>
  );
}

function LoadingView() {
  const tips = ["Calculating your calorie targets...","Balancing your macros...","Building your shopping list...","Adding delicious recipes...","Almost ready..."];
  const [i, setI] = useState(0);
  useEffect(()=>{const t=setInterval(()=>setI(x=>(x+1)%tips.length),2200);return()=>clearInterval(t);},[]);
  return (
    <div style={{textAlign:"center",padding:"48px 16px"}}>
      <div style={{position:"relative",width:"72px",height:"72px",margin:"0 auto 28px"}}>
        <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"3px solid rgba(134,197,117,0.15)"}} />
        <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"3px solid transparent",borderTopColor:"#86C575",animation:"spin 1s linear infinite"}} />
        <div style={{position:"absolute",inset:"10px",borderRadius:"50%",border:"2px solid transparent",borderTopColor:"rgba(78,205,196,0.5)",animation:"spin 1.8s linear infinite reverse"}} />
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px"}}>🌿</div>
      </div>
      <h3 style={{color:"#fff",fontSize:"20px",fontWeight:"700",marginBottom:"10px"}}>Building Your Plan</h3>
      <p style={{color:"rgba(255,255,255,0.45)",fontSize:"14px",minHeight:"20px"}}>{tips[i]}</p>
      <div style={{display:"flex",gap:"5px",justifyContent:"center",marginTop:"24px"}}>
        {[0,1,2].map(j=>(<div key={j} style={{width:"6px",height:"6px",borderRadius:"50%",background:"#86C575",animation:"pulse 1.3s ease-in-out infinite",animationDelay:j*0.2+"s"}} />))}
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  );
}

function PlanView({plan, profile, onRestart}) {
  const [activeDay, setActiveDay] = useState(0);
  const [dayTab, setDayTab] = useState("meals");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [plan]);

  const goalLabel = profile.goal==="lose"?"Weight Loss":profile.goal==="gain"?"Build Muscle":"Balanced";

  const getSection = (key, next) => {
    const i = plan.indexOf(key);
    if (i === -1) return "";
    const start = i + key.length;
    const j = next ? plan.indexOf(next, start) : plan.length;
    return (j === -1 ? plan.slice(start) : plan.slice(start, j)).trim();
  };

  const parseDays = () => {
    const days = [];
    const mealSection = (() => {
      const i = plan.indexOf("MEAL PLAN");
      const j = plan.indexOf("RECIPES");
      const k = plan.indexOf("SHOPPING");
      const end = j !== -1 ? j : k !== -1 ? k : plan.length;
      return i === -1 ? plan : plan.slice(i + 9, end);
    })();
    const parts = mealSection.split(/(?=\*{0,2}Day \d+\*{0,2}[:\s\-])/i).filter(p => p.trim());
    parts.forEach(part => {
      const titleMatch = part.match(/Day (\d+)/i);
      if (!titleMatch) return;
      const dayNum = parseInt(titleMatch[1]);
      const lines = part.split("\n").filter(l => l.trim());
      const meals = [];
      let currentMeal = null;
      lines.slice(1).forEach(line => {
        const l = line.trim();
        if (!l) return;
        if (/^(breakfast|lunch|dinner|snack)/i.test(l)) {
          if (currentMeal) meals.push(currentMeal);
          currentMeal = { type: l.split(/[:\-]/)[0].trim(), content: l.replace(/^[^:\-]+[:\-]\s*/, "") };
        } else if (currentMeal) {
          currentMeal.content += " " + l;
        }
      });
      if (currentMeal) meals.push(currentMeal);
      days.push({ day: dayNum, meals });
    });
    const seen = new Set();
    return days.filter(d => {
      if (seen.has(d.day)) return false;
      seen.add(d.day);
      return true;
    }).slice(0, 7);
  };

  const parseRecipes = () => {
    const recipesRawText = getSection("RECIPES", "SHOPPING");
    const days = [];
    const dayParts = recipesRawText.split(/(?=Day \d+)/i).filter(p => p.trim());
    dayParts.forEach(part => {
      const dayMatch = part.match(/Day (\d+)/i);
      if (!dayMatch) return;
      const dayNum = parseInt(dayMatch[1]);
      const meals = [];
      const mealParts = part.split(/(?=Day \d+ -)/i).filter(p => p.trim());
      mealParts.forEach(mp => {
        const headerMatch = mp.match(/Day \d+ - ([^:\n]+):\s*([^\n]+)/i);
        if (!headerMatch) return;
        const mealType = headerMatch[1].trim();
        const mealName = headerMatch[2].trim();
        const ingMatch = mp.match(/Ingredients?:\s*([\s\S]+?)(?=Steps?:|$)/i);
        const stepsMatch = mp.match(/Steps?:\s*([\s\S]+?)(?=Day \d+|$)/i);
        meals.push({
          type: mealType,
          name: mealName,
          ingredients: ingMatch ? ingMatch[1].trim() : "",
          steps: stepsMatch ? stepsMatch[1].trim() : ""
        });
      });
      if (meals.length > 0) days.push({ day: dayNum, meals });
    });
    return days.slice(0, 7);
  };

  const days = parseDays();
  const recipeDays = parseRecipes();
  const shoppingText = getSection("SHOPPING", "TIPS");
  const tipsText = getSection("TIPS", null);

  const mealIcons = { breakfast:"☀️", lunch:"🌤", dinner:"🌙", snack:"🍎" };
  const mealColors = { breakfast:"rgba(255,200,80,0.1)", lunch:"rgba(80,200,180,0.1)", dinner:"rgba(130,100,255,0.1)", snack:"rgba(255,130,100,0.1)" };

  return (
    <div className="plan-enter">
      <div style={{textAlign:"center",marginBottom:"20px"}}>
        <div style={{display:"inline-block",background:"rgba(134,197,117,0.15)",border:"1px solid rgba(134,197,117,0.3)",borderRadius:"100px",padding:"5px 14px",marginBottom:"10px"}}>
          <span style={{color:"#86C575",fontSize:"12px",fontWeight:"600",letterSpacing:"1px"}}>✨ PLAN READY</span>
        </div>
        <h2 style={{color:"#fff",fontSize:"22px",fontWeight:"700",margin:"0 0 4px"}}>Your {goalLabel} Plan</h2>
        <p style={{color:"rgba(255,255,255,0.4)",fontSize:"13px",margin:0}}>${profile.budget}/month · {profile.meals} meals/day</p>
      </div>

      {/* Day selector */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"6px",marginBottom:"12px"}}>
        {days.map((d,i)=>(
          <button key={i} onClick={()=>{setActiveDay(i);setDayTab("meals");}} style={{padding:"8px 4px",borderRadius:"10px",border:"none",background:activeDay===i?"linear-gradient(135deg,#86C575,#4ECDC4)":"rgba(255,255,255,0.07)",color:activeDay===i?"#0a1f0a":"rgba(255,255,255,0.5)",fontSize:"12px",fontWeight:"600",cursor:"pointer",fontFamily:"Georgia,serif"}}>
            Day {d.day}
          </button>
        ))}
      </div>

      {/* Per-day tabs */}
      <div style={{display:"flex",gap:"4px",background:"rgba(255,255,255,0.05)",borderRadius:"14px",padding:"4px",marginBottom:"16px"}}>
        {[["meals","🍽","Meals"],["recipes","📖","Recipes"]].map(([id,icon,label])=>(
          <button key={id} onClick={()=>setDayTab(id)} style={{flex:1,padding:"9px 6px",borderRadius:"10px",border:"none",background:dayTab===id?"rgba(134,197,117,0.18)":"transparent",color:dayTab===id?"#86C575":"rgba(255,255,255,0.4)",fontSize:"12px",fontWeight:dayTab===id?"700":"400",cursor:"pointer",fontFamily:"Georgia,serif",display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"}}>
            {icon} {label}
          </button>
        ))}
      </div>

      {/* Meals tab */}
      {dayTab==="meals" && days[activeDay] && (
        <div style={{animation:"fadeScaleIn 0.3s ease forwards"}}>
          <div style={{marginBottom:"8px",color:"rgba(255,255,255,0.4)",fontSize:"12px",letterSpacing:"1px",textTransform:"uppercase"}}>Day {days[activeDay].day}</div>
          {days[activeDay].meals.length > 0 ? days[activeDay].meals.map((meal,i)=>{
            const type = meal.type.toLowerCase().includes("breakfast")?"breakfast":meal.type.toLowerCase().includes("lunch")?"lunch":meal.type.toLowerCase().includes("snack")?"snack":"dinner";
            return (
              <div key={i} style={{background:mealColors[type]||"rgba(255,255,255,0.05)",borderRadius:"14px",border:"1px solid rgba(255,255,255,0.08)",padding:"14px",marginBottom:"10px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"}}>
                  <span style={{fontSize:"18px"}}>{mealIcons[type]||"🍽"}</span>
                  <span style={{color:"rgba(255,255,255,0.5)",fontSize:"11px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase"}}>{meal.type}</span>
                </div>
                <p style={{color:"#fff",fontSize:"14px",margin:0,lineHeight:"1.6"}}>{meal.content}</p>
              </div>
            );
          }) : (
            <div style={{background:"rgba(255,255,255,0.04)",borderRadius:"14px",padding:"16px"}}>
              <p style={{color:"rgba(255,255,255,0.5)",fontSize:"14px",margin:0}}>No meals found for this day.</p>
            </div>
          )}
        </div>
      )}

{/* Recipes tab */}
{dayTab==="recipes" && (
  <div style={{animation:"fadeScaleIn 0.3s ease forwards",maxHeight:"380px",overflowY:"auto"}}>
    {(recipeDays[days[activeDay]?.day] || []).length > 0
      ? (recipeDays[days[activeDay]?.day] || []).map((meal,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,0.04)",borderRadius:"16px",border:"1px solid rgba(255,255,255,0.08)",padding:"16px",marginBottom:"12px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
              <div style={{width:"32px",height:"32px",borderRadius:"50%",background:"linear-gradient(135deg,#86C575,#4ECDC4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"700",color:"#0a1f0a",flexShrink:0}}>
                {meal.type.toLowerCase().includes("breakfast")?"☀️":meal.type.toLowerCase().includes("lunch")?"🌤":meal.type.toLowerCase().includes("snack")?"🍎":"🌙"}
              </div>
              <div>
                <div style={{color:"rgba(255,255,255,0.45)",fontSize:"10px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase"}}>{meal.type}</div>
                <div style={{color:"#fff",fontSize:"14px",fontWeight:"700"}}>{meal.name}</div>
              </div>
            </div>
            {meal.ingredients && (
              <div style={{marginBottom:"12px"}}>
                <div style={{color:"#86C575",fontSize:"11px",fontWeight:"700",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"8px",paddingBottom:"4px",borderBottom:"1px solid rgba(134,197,117,0.2)"}}>🧺 Ingredients</div>
                {meal.ingredients.split("\n").filter(l=>l.trim()).map((ing,j)=>(
                  <div key={j} style={{display:"flex",alignItems:"flex-start",gap:"8px",padding:"3px 0"}}>
                    <span style={{color:"#86C575",fontSize:"12px",marginTop:"2px",flexShrink:0}}>→</span>
                    <span style={{color:"rgba(255,255,255,0.75)",fontSize:"13px",lineHeight:"1.5"}}>{ing.replace(/^-\s*/,"").trim()}</span>
                  </div>
                ))}
              </div>
            )}
            {meal.steps && (
              <div>
                <div style={{color:"#4ECDC4",fontSize:"11px",fontWeight:"700",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"8px",paddingBottom:"4px",borderBottom:"1px solid rgba(78,205,196,0.2)"}}>👨‍🍳 Steps</div>
                {meal.steps.split("\n").filter(l=>l.trim()).map((step,j)=>(
                  <div key={j} style={{display:"flex",alignItems:"flex-start",gap:"10px",padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                    <div style={{width:"20px",height:"20px",borderRadius:"50%",background:"rgba(78,205,196,0.15)",border:"1px solid rgba(78,205,196,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:"700",color:"#4ECDC4",flexShrink:0,marginTop:"1px"}}>{j+1}</div>
                    <span style={{color:"rgba(255,255,255,0.75)",fontSize:"13px",lineHeight:"1.6"}}>{step.replace(/^\d+\.\s*/,"").trim()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      : (
          <div style={{background:"rgba(255,255,255,0.04)",borderRadius:"14px",padding:"20px",textAlign:"center"}}>
            <p style={{color:"rgba(255,255,255,0.4)",fontSize:"14px",margin:0}}>Generate a new plan to see recipes here.</p>
          </div>
        )
    }
  </div>
)}

      {/* Global Shopping & Tips */}
      <div style={{display:"flex",gap:"8px",marginTop:"16px",marginBottom:"4px"}}>
        {[["shopping","🛒 Shopping"],["tips","💡 Tips"]].map(([id,label])=>(
          <button key={id} onClick={()=>setDayTab(id)} style={{flex:1,padding:"10px",borderRadius:"12px",border:"1px solid rgba(255,255,255,0.08)",background:dayTab===id?"rgba(134,197,117,0.12)":"rgba(255,255,255,0.04)",color:dayTab===id?"#86C575":"rgba(255,255,255,0.4)",fontSize:"12px",fontWeight:dayTab===id?"700":"400",cursor:"pointer",fontFamily:"Georgia,serif"}}>
            {label}
          </button>
        ))}
      </div>

      {/* Shopping */}
      {dayTab==="shopping" && (
        <div style={{background:"rgba(0,0,0,0.2)",borderRadius:"14px",padding:"16px",maxHeight:"320px",overflowY:"auto",marginTop:"12px"}}>
          {shoppingText.split("\n").filter(l=>l.trim()).map((line,i)=>{
            const isCat = /^(produce|proteins|grains|dairy|pantry|total)/i.test(line.trim());
            return (
              <div key={i} style={{marginBottom:isCat?"12px":"4px"}}>
                {isCat ? (
                  <div style={{color:"#86C575",fontSize:"12px",fontWeight:"700",letterSpacing:"1.5px",textTransform:"uppercase",marginTop:"8px",paddingBottom:"4px",borderBottom:"1px solid rgba(134,197,117,0.2)"}}>{line.trim()}</div>
                ) : (
                  <div style={{display:"flex",alignItems:"flex-start",gap:"8px",padding:"4px 0"}}>
                    <span style={{color:"#86C575",fontSize:"12px",marginTop:"2px"}}>→</span>
                    <span style={{color:"rgba(255,255,255,0.75)",fontSize:"13px",lineHeight:"1.5"}}>{line.replace(/^[-•]\s*/,"").trim()}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tips */}
      {dayTab==="tips" && (
        <div style={{maxHeight:"320px",overflowY:"auto",marginTop:"12px"}}>
          {tipsText.split("\n").filter(l=>l.trim()).map((line,i)=>{
            const isNum = /^\d+\./.test(line.trim());
            return isNum ? (
              <div key={i} style={{background:"rgba(134,197,117,0.07)",borderRadius:"14px",border:"1px solid rgba(134,197,117,0.15)",padding:"14px",marginBottom:"10px",display:"flex",gap:"12px",alignItems:"flex-start"}}>
                <div style={{width:"26px",height:"26px",borderRadius:"50%",background:"linear-gradient(135deg,#86C575,#4ECDC4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"700",color:"#0a1f0a",flexShrink:0}}>{line.trim()[0]}</div>
                <p style={{color:"rgba(255,255,255,0.85)",fontSize:"13px",lineHeight:"1.6",margin:0}}>{line.replace(/^\d+\.\s*/,"")}</p>
              </div>
            ) : (
              <p key={i} style={{color:"rgba(255,255,255,0.5)",fontSize:"13px",lineHeight:"1.6",margin:"0 0 6px"}}>{line}</p>
            );
          })}
        </div>
      )}

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"16px"}}>
        <button onClick={onRestart} style={GS.btnBack}>← Start Over</button>
        <button style={GS.btnPrimary} onClick={()=>{const b=new Blob([plan],{type:"text/plain"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download="meal-plan.txt";a.click();}}>↓ Download</button>
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
  const [p, setP] = useState({goal:"lose",age:"",weight:"",height:"",gender:"female",activity:"moderate",meals:"3",skill:"beginner",restrictions:[],budget:"",calories:""});

  const upd = (k,v) => setP(prev=>({...prev,[k]:v}));
  const toggleR = r => setP(prev=>({...prev,restrictions:prev.restrictions.includes(r)?prev.restrictions.filter(x=>x!==r):[...prev.restrictions,r]}));
  const canNext = () => { if(step===1) return p.age&&p.weight&&p.height; if(step===3) return p.budget; return true; };

  const generate = async () => {
    setLoading(true); setError(null);
    const weekly = Math.round((Number(p.budget)||300)/4);
    const goalLabel = p.goal==="lose"?"Weight Loss":p.goal==="gain"?"Build Muscle":"Stay Balanced";
    const restr = p.restrictions.length?p.restrictions.join(", "):"None";
    const snacks = p.meals==="3+"?", and 2 snacks":"";
    const msg = "You are a professional nutritionist. Create a detailed 7-day meal plan.\n\n"
      +"PROFILE: Age:"+p.age+" Gender:"+p.gender+" Weight:"+p.weight+"lbs Height:"+p.height+"in\n"
      +"Goal:"+goalLabel+" Activity:"+p.activity+" Meals/day:"+p.meals+" Skill:"+p.skill+"\n"
      +"Budget:$"+p.budget+"/month (~$"+weekly+"/week) Restrictions:"+restr+"\n\n"
      +"Use EXACTLY these four section headers on their own lines:\n\n"
      +"MEAL PLAN\n"
      +"7 days. Each day: 'Day 1', 'Day 2' etc on its own line. Then breakfast, lunch, dinner"+snacks+". Each meal: name, calories in parentheses, one sentence description. No recipes here.\n\n"
      +"RECIPES\n"
      +"For every single meal across all 7 days, provide a full recipe. Format each as:\nDay [N] - [Meal Type]: [Meal Name]\nIngredients:\n- ingredient 1\n- ingredient 2\nSteps:\n1. step 1\n2. step 2\n\n"
      +"SHOPPING\n"
      +"Shopping list by category (Produce, Proteins, Grains & Pantry, Dairy & Alternatives) with estimated costs. Total ~$"+weekly+"/week.\n\n"
      +"TIPS\n"
      +"5 specific tips for this person based on their "+goalLabel+" goal, $"+p.budget+"/month budget, and restrictions: "+restr+".";
  try {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: msg })
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
    const lines = chunk.split("\n").filter(l => l.trim());

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6);
        if (data === "[DONE]") continue;
        try {
          const parsed = JSON.parse(data);
          if (parsed.text) {
            fullText += parsed.text;
            setPlan(fullText);
            await new Promise(r => setTimeout(r, 20));
          }
        } catch(e) {}
      }
    }
  }
} catch(e) {
  setError(String(e.message || e));
  setLoading(false);
}
  };

  return (
    <div style={GS.page}>
      <style>{animStyles}</style>
      <div style={GS.center}>
        <div style={{textAlign:"center",padding:"32px 0 28px"}}>
          <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"56px",height:"56px",borderRadius:"18px",background:"linear-gradient(135deg,#86C575,#4ECDC4)",marginBottom:"14px",boxShadow:"0 8px 28px rgba(134,197,117,0.4)",fontSize:"26px"}}>🌿</div>
          <h1 style={{color:"#fff",fontSize:"32px",fontWeight:"700",margin:"0 0 4px",letterSpacing:"-0.5px"}}>Nourish</h1>
          <p style={{color:"rgba(255,255,255,0.35)",fontSize:"12px",letterSpacing:"2px",textTransform:"uppercase",margin:0}}>AI Meal Planning</p>
        </div>

        <div style={GS.card}>
          {loading ? <LoadingView /> : plan ? (
            <PlanView plan={plan} profile={p} onRestart={()=>{setPlan(null);setStep(0);setError(null);}} />
          ) : (
            <>
              <Dots step={step} />
              {error && <div style={GS.err}>{error}</div>}

              <div key={animKey} className={direction === "forward" ? "step-enter" : "step-back"}>
              {step===0 && (
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:"44px",marginBottom:"16px"}}>👋</div>
                  <h2 style={GS.h2}>Welcome to Nourish</h2>
                  <p style={{...GS.sub,marginBottom:"28px"}}>Answer 4 quick questions and get a fully personalized 7-day meal plan with recipes, a shopping list, and tips tailored to your budget and goals.</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px",marginBottom:"28px"}}>
                    {[["🎯","Goal-based"],["💰","Budget-aware"],["🥗","Diet-friendly"]].map(([icon,label])=>(
                      <div key={label} style={{background:"rgba(255,255,255,0.05)",borderRadius:"14px",padding:"14px 8px",border:"1px solid rgba(255,255,255,0.07)"}}>
                        <div style={{fontSize:"20px",marginBottom:"6px"}}>{icon}</div>
                        <div style={{color:"rgba(255,255,255,0.55)",fontSize:"11px",fontWeight:"600"}}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <button className="btn-bounce" style={GS.btnPrimary} onClick={()=>{ setDirection("forward"); setAnimKey(k=>k+1); setStep(1); }}>Get Started →</button>
                </div>
              )}

              {step===1 && (
                <div>
                  <h2 style={GS.h2}>About you</h2>
                  <p style={GS.sub}>Used to calculate your ideal calorie targets.</p>
                  <div style={GS.grid2}>
                    <div><label style={GS.label}>Age</label><input style={GS.input} type="number" value={p.age} onChange={e=>upd("age",e.target.value)} placeholder="28" /></div>
                    <div>
                      <label style={GS.label}>Gender</label>
                      <select style={GS.select} value={p.gender} onChange={e=>upd("gender",e.target.value)}>
                        <option value="female">Female</option><option value="male">Male</option><option value="other">Other</option>
                      </select>
                    </div>
                    <div><label style={GS.label}>Weight (lbs)</label><input style={GS.input} type="number" value={p.weight} onChange={e=>upd("weight",e.target.value)} placeholder="160" /></div>
                    <div><label style={GS.label}>Height (in)</label><input style={GS.input} type="number" value={p.height} onChange={e=>upd("height",e.target.value)} placeholder="67" /></div>
                  </div>
                  <div style={{marginTop:"8px"}}>
                    <label style={GS.label}>Cooking Skill</label>
                    <select style={GS.select} value={p.skill} onChange={e=>upd("skill",e.target.value)}>
                      <option value="beginner">Beginner — quick simple meals</option>
                      <option value="intermediate">Intermediate — comfortable cooking</option>
                      <option value="advanced">Advanced — love to cook</option>
                    </select>
                  </div>
                  <div style={{marginTop:"14px"}}>
                    <label style={GS.label}>Meals Per Day</label>
                    <select style={GS.select} value={p.meals} onChange={e=>upd("meals",e.target.value)}>
                      <option value="2">2 meals</option><option value="3">3 meals</option><option value="3+">3 meals + snacks</option>
                    </select>
                  </div>
                </div>
              )}

              {step===2 && (
                <div>
                  <h2 style={GS.h2}>Your goal & activity</h2>
                  <p style={GS.sub}>We'll tailor your entire plan around this.</p>
                  {GOALS.map(g=>(
                    <button key={g.id} onClick={()=>upd("goal",g.id)} style={GS.goalBtn(p.goal===g.id)}>
                      <span style={{fontSize:"26px"}}>{g.icon}</span>
                      <div style={{textAlign:"left"}}>
                        <div style={{color:"#fff",fontSize:"15px",fontWeight:"600",marginBottom:"3px"}}>{g.label}</div>
                        <div style={{color:"rgba(255,255,255,0.4)",fontSize:"12px"}}>{g.desc}</div>
                      </div>
                      {p.goal===g.id&&<span style={{marginLeft:"auto",color:"#86C575",fontSize:"16px"}}>✓</span>}
                    </button>
                  ))}
                  <label style={{...GS.label,marginTop:"8px"}}>Activity Level</label>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
                    {ACTIVITIES.map(a=>(
                      <button key={a.id} onClick={()=>upd("activity",a.id)} style={GS.actBtn(p.activity===a.id)}>
                        <div style={{color:"#fff",fontSize:"13px",fontWeight:"600",marginBottom:"3px"}}>{a.label}</div>
                        <div style={{color:"rgba(255,255,255,0.35)",fontSize:"11px"}}>{a.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step===3 && (
                <div>
                  <h2 style={GS.h2}>Diet & budget</h2>
                  <p style={GS.sub}>Customize your plan to fit your lifestyle.</p>
                  <label style={GS.label}>Dietary restrictions (select all that apply)</label>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px"}}>
                    {DIETARY.map(d=>(
                      <button key={d.id} onClick={()=>toggleR(d.id)} style={GS.chip(p.restrictions.includes(d.id))}>
                        <span>{d.icon}</span><span>{d.label}</span>
                      </button>
                    ))}
                  </div>
                  <label style={GS.label}>Monthly Food Budget ($)</label>
                  <input style={GS.input} type="number" value={p.budget} onChange={e=>upd("budget",e.target.value)} placeholder="300" />
                  {p.budget&&<div style={GS.hint}>≈ ${Math.round(p.budget/4)}/week · ≈ ${Math.round(p.budget/30)}/day</div>}
                  <div style={{marginTop:"14px"}}>
                    <label style={GS.label}>Daily Calorie Target (optional)</label>
                    <input style={GS.input} type="number" value={p.calories} onChange={e=>upd("calories",e.target.value)} placeholder="Leave blank to auto-calculate" />
                  </div>
                </div>
              )}

              </div>

              {step>0&&(
                <div style={GS.row}>
                  <button onClick={()=>{ setDirection("back"); setAnimKey(k=>k+1); setStep(s=>s-1); }} style={GS.btnBack}>← Back</button>
                  <div style={{flex:1}}>
                    <button
                      className="btn-bounce"
                      onClick={()=>{
                        if(step<3){ setDirection("forward"); setAnimKey(k=>k+1); setStep(s=>s+1); }
                        else generate();
                      }}
                      style={canNext()?GS.btnPrimary:GS.btnDisabled}
                      disabled={!canNext()}
                    >
                      {step===3?"✨ Generate My Plan":"Continue →"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <p style={{textAlign:"center",color:"rgba(255,255,255,0.15)",fontSize:"11px",marginTop:"20px",letterSpacing:"0.5px"}}>Powered by AI · Not medical advice</p>
      </div>
    </div>
  );
}
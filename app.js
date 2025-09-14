/***** DATA MODEL *****/
// Organized by category -> submode -> array of Qs with difficulty variants.
// Each question: { q, a:[], c:index, lvl: "kid"|"teen"|"adult" }  (repeat per level)
const BANK = {
  mix: { // used to build Random Mix; submodes are synthesized
    "Daily Mix": []
  },
  math: {
    "Daily Mix": [],
    Algebra: [
      {q:"Solve: 2x + 5 = 15. x = ?", a:["3","5","10","-5"], c:1, lvl:"kid"},
      {q:"Solve: 3(x-2)=12. x = ?", a:["2","4","6","8"], c:1, lvl:"kid"},
      {q:"If y=2x+1 and x=4, y=?", a:["7","8","9","6"], c:0, lvl:"teen"},
      {q:"Factor: x²−9", a:["(x−3)(x+3)","(x−9)(x+1)","(x−3)²","x(x−9)"], c:0, lvl:"teen"},
      {q:"Vertex of y=(x−2)²+3", a:["(2,3)","(−2,3)","(2,−3)","(0,3)"], c:0, lvl:"adult"},
      {q:"Solve: 4x−7=5x+2. x = ?", a:["−9","9","−2","2"], c:2, lvl:"adult"},
    ],
    Arithmetic: [
      {q:"15 × 4 = ?", a:["45","60","55","65"], c:1, lvl:"kid"},
      {q:"120 ÷ 8 = ?", a:["14","12","16","15"], c:2, lvl:"kid"},
      {q:"25% of 80 = ?", a:["10","15","20","25"], c:2, lvl:"teen"},
      {q:"Average of 5, 7, 11 = ?", a:["8","7.5","9","10"], c:2, lvl:"teen"},
      {q:"Simple interest on $1000 at 5% for 2y", a:["$50","$100","$150","$200"], c:1, lvl:"adult"},
      {q:"Estimate: 49×19 ≈ ?", a:["900","950","1000","1100"], c:0, lvl:"adult"},
    ],
    Geometry: [
      {q:"Triangles have how many sides?", a:["3","4","5","6"], c:0, lvl:"kid"},
      {q:"Right angle is ___ degrees", a:["45","60","90","120"], c:2, lvl:"kid"},
      {q:"Perimeter of 4×6 rectangle", a:["20","24","10","12"], c:1, lvl:"teen"},
      {q:"Area of radius-3 circle (≈)", a:["28","29","31","34"], c:2, lvl:"teen"},
      {q:"Sum of interior angles: pentagon", a:["360°","540°","720°","900°"], c:1, lvl:"adult"},
      {q:"Diagonal of 6×8 rectangle", a:["10","12","14","8"], c:0, lvl:"adult"},
    ]
  },
  geo: {
    "Daily Mix": [],
    Capitals: [
      {q:"Capital of Australia?", a:["Canberra","Sydney","Melbourne","Perth"], c:0, lvl:"kid"},
      {q:"Capital of Japan?", a:["Kyoto","Tokyo","Osaka","Sapporo"], c:1, lvl:"kid"},
      {q:"Capital of Canada?", a:["Toronto","Ottawa","Vancouver","Montreal"], c:1, lvl:"teen"},
      {q:"Capital of Morocco?", a:["Casablanca","Rabat","Marrakesh","Fes"], c:1, lvl:"teen"},
      {q:"Capital of Kazakhstan?", a:["Astana","Almaty","Bishkek","Tashkent"], c:0, lvl:"adult"},
      {q:"Capital of Tanzania?", a:["Dodoma","Dar es Salaam","Arusha","Mwanza"], c:0, lvl:"adult"},
    ],
    Flags: [
      {q:"Red circle on white flag", a:["Japan","Bangladesh","Indonesia","Turkey"], c:0, lvl:"kid"},
      {q:"Maple leaf flag", a:["Canada","Austria","Denmark","UK"], c:0, lvl:"kid"},
      {q:"Green with cedar tree", a:["Saudi Arabia","Lebanon","Pakistan","Libya"], c:1, lvl:"teen"},
      {q:"Rising sun rays", a:["Japan (naval)","South Korea","Taiwan","China"], c:0, lvl:"teen"},
      {q:"Tricolor green-white-orange (vertical, dark green at hoist)", a:["Ireland","Côte d’Ivoire","Italy","India"], c:1, lvl:"adult"},
      {q:"Blue with Southern Cross + Union Jack", a:["Australia","NZ","Fiji","UK"], c:2, lvl:"adult"},
    ]
  },
  lang: {
    "Daily Mix": [],
    Vocab: [
      {q:'French “Thank you”', a:["Merci","Bonjour","Pardon","S’il vous plaît"], c:0, lvl:"kid"},
      {q:'Spanish “Good morning”', a:["Buenas noches","Buenos días","Gracias","Por favor"], c:1, lvl:"kid"},
      {q:'Arabic “Peace be upon you”', a:["Shukran","Marhaba","As-salāmu ʿalaykum","Yalla"], c:2, lvl:"teen"},
      {q:'Japanese “Water”', a:["Mizu","Kaze","Yuki","Sora"], c:0, lvl:"teen"},
      {q:'Hebrew “Freedom”', a:["Herut","Ahava","Shalom","Emet"], c:0, lvl:"adult"},
      {q:'German “Because”', a:["aber","denn","weil","oder"], c:2, lvl:"adult"},
    ],
    Phrases: [
      {q:'Italian “Please”', a:["Prego","Per favore","Ciao","Grazie"], c:1, lvl:"kid"},
      {q:'Portuguese “See you”', a:["Desculpa","Até logo","Boa noite","Com licença"], c:1, lvl:"kid"},
      {q:'Mandarin “Hello” (common)', a:["Zàijiàn","Xièxie","Nǐ hǎo","Bù kèqì"], c:2, lvl:"teen"},
      {q:'Turkish “Yes”', a:["Evet","Hayır","Merhaba","Lütfen"], c:0, lvl:"teen"},
      {q:'Hindi “No”', a:["Haan","Nahin","Shukriya","Namaste"], c:1, lvl:"adult"},
      {q:'French “I would like”', a:["Je veux","J’aimerais","Je suis","J’aurai"], c:1, lvl:"adult"},
    ]
  },
  sci: {
    "Daily Mix": [],
    Basics: [
      {q:"H2O is…", a:["Oxygen","Hydrogen","Water","Salt"], c:2, lvl:"kid"},
      {q:"Earth is the ___ planet from the sun", a:["2nd","3rd","4th","5th"], c:1, lvl:"kid"},
      {q:"Unit for electric current", a:["Volt","Ampere","Ohm","Watt"], c:1, lvl:"teen"},
      {q:"Nearest star to Earth", a:["Sirius","Betelgeuse","Sun","Proxima Centauri"], c:2, lvl:"teen"},
      {q:"DNA stands for…", a:["Deoxyribonucleic acid","Dinucleotide acid","Dioxyribose nucleic","None"], c:0, lvl:"adult"},
      {q:"Gas causing most warming (long-lived)", a:["O₂","CO₂","N₂","Ar"], c:1, lvl:"adult"},
    ],
    Physics: [
      {q:"Speed = distance ÷ ___", a:["mass","time","force","work"], c:1, lvl:"kid"},
      {q:"Force unit", a:["Pascal","Newton","Joule","Tesla"], c:1, lvl:"kid"},
      {q:"Gravity on Earth ≈ ___ m/s²", a:["8.9","9.8","10.8","11.2"], c:1, lvl:"teen"},
      {q:"Light speed ≈ ___ km/s", a:["3,000","30,000","300,000","3,000,000"], c:2, lvl:"teen"},
      {q:"Work = ___ × distance", a:["Power","Force","Energy","Momentum"], c:1, lvl:"adult"},
      {q:"SI unit of power", a:["Joule","Watt","Newton","Volt"], c:1, lvl:"adult"},
    ]
  },
  hist: {
    "Daily Mix": [],
    World: [
      {q:"Pyramids of Giza country", a:["Jordan","Egypt","Sudan","Libya"], c:1, lvl:"kid"},
      {q:"Great Wall country", a:["India","China","Mongolia","Japan"], c:1, lvl:"kid"},
      {q:"WWII ended in", a:["1943","1944","1945","1946"], c:2, lvl:"teen"},
      {q:"Roman Empire capital", a:["Athens","Rome","Carthage","Milan"], c:1, lvl:"teen"},
      {q:"Magna Carta signed (century)", a:["11th","12th","13th","14th"], c:2, lvl:"adult"},
      {q:"Ottoman Empire ended after", a:["WWI","WWII","Crimean War","Peloponnesian War"], c:0, lvl:"adult"},
    ],
    Leaders: [
      {q:"First US President", a:["Adams","Washington","Jefferson","Lincoln"], c:1, lvl:"kid"},
      {q:"First woman PM of UK", a:["May","Thatcher","Truss","Windsor"], c:1, lvl:"kid"},
      {q:"Nelson Mandela was President of", a:["Kenya","South Africa","Ghana","Nigeria"], c:1, lvl:"teen"},
      {q:"Gandhi led movement in", a:["Pakistan","India","Bangladesh","Sri Lanka"], c:1, lvl:"teen"},
      {q:"Atatürk transformed which country?", a:["Syria","Turkey","Greece","Iran"], c:1, lvl:"adult"},
      {q:"Founding PM of Israel", a:["Ben-Gurion","Begin","Peres","Rabin"], c:0, lvl:"adult"},
    ]
  }
};

// Build “Daily Mix” pools for each category & for global mix
function buildDailyPools(){
  for (const cat of Object.keys(BANK)){
    if (!BANK[cat]["Daily Mix"]) BANK[cat]["Daily Mix"] = [];
    for (const sub of Object.keys(BANK[cat])){
      if (sub === "Daily Mix") continue;
      BANK[cat]["Daily Mix"].push(...BANK[cat][sub]);
    }
  }
  // Global random mix uses all categories
  BANK.mix["Daily Mix"] = [];
  for (const cat of Object.keys(BANK)){
    if (cat==="mix") continue;
    BANK.mix["Daily Mix"].push(...BANK[cat]["Daily Mix"]);
  }
}
buildDailyPools();

/***** UTILITIES *****/
const $ = (sel)=>document.querySelector(sel);
const todayISO = new Date().toISOString().slice(0,10);
$("#today").textContent = todayISO;
$("#year").textContent = new Date().getFullYear();

const els = {
  start: $("#startBtn"),
  timer: $("#timer"),
  game: $("#game"),
  q: $("#question"),
  opts: $("#options"),
  fb: $("#feedback"),
  streak: $("#streak"),
  done: $("#completed"),
  score: $("#score"),
  progress: $("#progress"),
  age: $("#age"),
  category: $("#category"),
  submodes: $("#submodes"),
  signupOpen: $("#signupOpen"),
  signupModal: $("#signupModal"),
  emailInput: $("#emailInput"),
  saveEmail: $("#saveEmail"),
  exportEmails: $("#exportEmails"),
  deleteEmails: $("#deleteEmails"),
};

const LS = {
  STREAK:"omd_streak",
  LAST:"omd_last",
  DONE:"omd_done",
  EMAILS:"omd_emails",
  PREFS:"omd_prefs"
};

const load = (k,d)=>JSON.parse(localStorage.getItem(k) ?? JSON.stringify(d));
const save = (k,v)=>localStorage.setItem(k, JSON.stringify(v));

function ensureDailyReset(){
  const last = load(LS.LAST, "");
  if (last !== todayISO){
    save(LS.DONE,false);
    save(LS.LAST,todayISO);
  }
}
ensureDailyReset();
els.done.textContent = load(LS.DONE,false) ? "Yes" : "No";
els.streak.textContent = load(LS.STREAK,0);
const prefs = load(LS.PREFS,{age:"adult",cat:"mix",sub:"Daily Mix"});
els.age.value = prefs.age;
els.category.value = prefs.cat;

/***** SUBMODE UI *****/
const SUBMODE_PRESETS = {
  mix: ["Daily Mix"],
  math: ["Daily Mix","Algebra","Arithmetic","Geometry"],
  geo: ["Daily Mix","Capitals","Flags"],
  lang: ["Daily Mix","Vocab","Phrases"],
  sci: ["Daily Mix","Basics","Physics"],
  hist: ["Daily Mix","World","Leaders"]
};
let currentSub = prefs.sub;

function renderSubmodes(cat){
  const modes = SUBMODE_PRESETS[cat] || ["Daily Mix"];
  els.submodes.innerHTML = "";
  modes.forEach(m=>{
    const b=document.createElement("button");
    b.className="subbtn"+(m===currentSub?" active":"");
    b.textContent=m;
    b.onclick=()=>{
      currentSub=m;
      save(LS.PREFS,{age:els.age.value,cat:els.category.value,sub:currentSub});
      [...els.submodes.querySelectorAll(".subbtn")].forEach(x=>x.classList.remove("active"));
      b.classList.add("active");
    };
    els.submodes.appendChild(b);
  });
}
renderSubmodes(els.category.value);

els.category.onchange = ()=>{
  currentSub="Daily Mix";
  renderSubmodes(els.category.value);
  save(LS.PREFS,{age:els.age.value,cat:els.category.value,sub:currentSub});
};
els.age.onchange = ()=> save(LS.PREFS,{age:els.age.value,cat:els.category.value,sub:currentSub});

/***** QUIZ ENGINE *****/
let ticking=false, timeLeft=60, solvedToday=false;
let qList=[], qIndex=0, correctCount=0;

function seededIndex(len, seedStr){
  let h=2166136261; for (let i=0;i<seedStr.length;i++){ h^=seedStr.charCodeAt(i); h+= (h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24); }
  if (h<0) h=~h+1; return h%len;
}

// pick ~6 questions for a 60s sprint, filtered by age level
function buildQuiz(cat, sub, age){
  const pool = BANK[cat]?.[sub] ?? [];
  const filtered = pool.filter(q=>q.lvl===age);
  const fallback = pool.length? pool : BANK.mix["Daily Mix"]; // just in case
  const use = filtered.length>=6 ? filtered : (filtered.length? filtered.concat(
      fallback.filter(q=>q.lvl!==age).slice(0, 6-filtered.length)) : fallback.slice(0,6)
  );
  // deterministic shuffle based on date+cat+sub+age
  const seed = `${todayISO}:${cat}:${sub}:${age}`;
  const arr = use.slice();
  for (let i=arr.length-1;i>0;i--){
    const j = seededIndex(i+1, seed + i);
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr.slice(0,6);
}

function renderQuestion(item){
  els.q.textContent = item.q;
  els.opts.innerHTML = "";
  item.a.forEach((txt,i)=>{
    const btn = document.createElement("button");
    btn.className="option";
    btn.textContent=txt;
    btn.onclick=()=>choose(i,item.c);
    els.opts.appendChild(btn);
  });
  els.progress.textContent = `Question ${qIndex+1} of ${qList.length}`;
  els.score.textContent = `${correctCount}/${qIndex}`;
}

function choose(i, correct){
  if(!ticking) return;
  const buttons=[...document.querySelectorAll(".option")];
  buttons.forEach(b=>b.disabled=true);
  buttons[correct].classList.add("correct");
  if(i===correct){
    buttons[i].classList.add("correct");
    correctCount++;
    els.fb.textContent="✅ Correct!";
  } else {
    buttons[i].classList.add("wrong");
    els.fb.textContent="❌ Not quite.";
  }
  qIndex++;
  els.score.textContent = `${correctCount}/${qIndex}`;
  setTimeout(next, 500);
}

function next(){
  if(qIndex>=qList.length || !ticking){ finish(); return; }
  renderQuestion(qList[qIndex]);
}

function tick(){
  if(!ticking) return;
  timeLeft -= 1;
  els.timer.textContent = timeLeft;
  if(timeLeft<=0){ ticking=false; finish(); return; }
  setTimeout(tick,1000);
}

function finish(){
  ticking=false;
  els.fb.textContent = `🏁 Done! Score: ${correctCount}/${qList.length}`;
  markWinIfFirst();
  // disable buttons
  [...document.querySelectorAll(".option")].forEach(b=>b.disabled=true);
}

function markWinIfFirst(){
  if (solvedToday || load(LS.DONE,false)) return;
  solvedToday = true;
  save(LS.DONE,true);
  els.done.textContent="Yes";
  // streak calc
  const last = load(LS.LAST,todayISO);
  const y=new Date(todayISO); y.setDate(y.getDate()-1);
  const yISO = y.toISOString().slice(0,10);
  let s = load(LS.STREAK,0);
  if(last===yISO) s+=1; else s=1;
  save(LS.STREAK,s); save(LS.LAST,todayISO);
  els.streak.textContent=s;
}

els.start.onclick = ()=>{
  if (load(LS.DONE,false)){ els.fb.textContent="You already completed today’s challenge. Come back tomorrow!"; els.game.classList.remove("hidden"); return; }
  correctCount=0; qIndex=0; els.fb.textContent="";
  const cat = els.category.value;
  const sub = currentSub;
  const age = els.age.value;
  qList = buildQuiz(cat, sub, age);
  els.game.classList.remove("hidden");
  timeLeft=60; els.timer.textContent=timeLeft; ticking=true;
  renderQuestion(qList[qIndex]);
  setTimeout(tick,1000);
};

/***** SHARE (optional) *****/
// (keep the previous share button if you like)

/***** EMAIL SIGNUP (local only, no server) *****/
const modal = els.signupModal;
els.signupOpen.onclick = ()=> modal.showModal();
els.saveEmail.onclick = ()=>{
  const email = (els.emailInput.value||"").trim().toLowerCase();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const box = $("#emailStatus");
  if(!ok){ box.textContent="Please enter a valid email."; return; }
  const list = load(LS.EMAILS,[]);
  if(!list.includes(email)){ list.push(email); save(LS.EMAILS,list); }
  box.textContent="Saved locally ✅";
};
els.exportEmails.onclick = ()=>{
  const list = load(LS.EMAILS,[]);
  const csv = "email\n" + list.map(e=>e).join("\n");
  const blob = new Blob([csv], {type:"text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "emails.csv"; a.click();
  URL.revokeObjectURL(url);
};
els.deleteEmails.onclick = ()=>{
  const list = load(LS.EMAILS,[]);
  const me = (els.emailInput.value||"").trim().toLowerCase();
  const box = $("#emailStatus");
  if(!me){ box.textContent="Type your email to delete."; return; }
  const idx = list.indexOf(me);
  if(idx>-1){ list.splice(idx,1); save(LS.EMAILS,list); box.textContent="Deleted."; }
  else box.textContent="Email not found.";
};

/***** TIP: to use Formspree later *****
1) Create a form endpoint at formspree.io -> you'll get a URL like:
   https://formspree.io/f/xxxxxx
2) Replace the local save with a fetch():
   fetch('https://formspree.io/f/xxxxxx',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})})
****************************************/

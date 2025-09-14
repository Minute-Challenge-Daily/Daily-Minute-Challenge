// ======= Tiny data (swap/expand later) =======
const geo = [
  { q: "What is the capital of Australia?", a: ["Canberra","Sydney","Melbourne","Perth"], c: 0 },
  { q: "Which country borders BOTH Germany and Spain?", a: ["Switzerland","Italy","France","Belgium"], c: 2 },
  { q: "Mount Kilimanjaro is in…", a: ["Kenya","Tanzania","Ethiopia","Uganda"], c: 1 },
  { q: "The Danube flows into which sea?", a: ["Black Sea","Caspian Sea","Adriatic","Baltic"], c: 0 },
  { q: "Which is not landlocked?", a: ["Bolivia","Paraguay","Mongolia","Peru"], c: 3 },
  { q: "The city of Kraków is in…", a: ["Czechia","Poland","Austria","Hungary"], c: 1 },
  { q: "The island of Hokkaidō belongs to…", a: ["China","Japan","South Korea","Philippines"], c: 1 },
  { q: "Which desert is in southern Africa?", a: ["Atacama","Gobi","Kalahari","Great Sandy"], c: 2 },
  { q: "Which country has more time zones?", a: ["USA","Russia"], c: 1 },
  { q: "Cairo sits on which river?", a: ["Nile","Tigris","Euphrates","Jordan"], c: 0 },
  { q: "Which is a Baltic state?", a: ["Slovakia","Latvia","Bulgaria","Albania"], c: 1 },
  { q: "Capital of Canada?", a: ["Toronto","Vancouver","Ottawa","Montreal"], c: 2 },
  { q: "Sri Lanka’s nearest neighbor is…", a: ["Thailand","India","Malaysia","Pakistan"], c: 1 },
  { q: "Which ocean touches Dubai?", a: ["Atlantic","Indian","Pacific","Arctic"], c: 1 },
  { q: "Andalusia is a region in…", a: ["Portugal","Spain","Italy","Greece"], c: 1 }
];

const lang = [
  { q: 'Spanish: “Good morning” = ?', a: ["Buenas noches","Buenos días","Gracias","Por favor"], c: 1, tip:"Buenos días = morning" },
  { q: 'French: “Thank you” = ?', a: ["S’il vous plaît","Merci","Bonjour","Pardon"], c: 1 },
  { q: 'Arabic: “Peace be upon you” = ?', a: ["Shukran","Marhaba","As-salāmu ʿalaykum","Yalla"], c: 2 },
  { q: 'Japanese: “Water” = ?', a: ["Mizu","Kaze","Yuki","Sora"], c: 0 },
  { q: 'Italian: “Please” = ?', a: ["Prego","Grazie","Ciao","Per favore"], c: 3 },
  { q: 'Hebrew: “Thank you” = ?', a: ["Todah","Bevakasha","Shalom","Laila tov"], c: 0 },
  { q: 'German: “How are you?” = ?', a: ["Wie geht’s?","Guten Morgen","Auf Wiedersehen","Bitte"], c: 0 },
  { q: 'Portuguese: “See you” = ?', a: ["Desculpa","Até logo","Boa noite","Com licença"], c: 1 },
  { q: 'Mandarin: “Hello” (common) = ?', a: ["Zàijiàn","Xièxie","Nǐ hǎo","Bù kèqì"], c: 2 },
  { q: 'Swahili: “Friend” = ?', a: ["Maji","Rafiki","Asante","Ndiyo"], c: 1 },
  { q: 'Turkish: “Yes” = ?', a: ["Evet","Hayır","Merhaba","Lütfen"], c: 0 },
  { q: 'Hindi: “No” = ?', a: ["Haan","Nahin","Shukriya","Namaste"], c: 1 },
];

const $ = (sel) => document.querySelector(sel);
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
  category: $("#category"),
  share: $("#shareBtn"),
};

let ticking = false, timeLeft = 60, solvedToday = false, pickedIndex = null, correctIdx = null;

// Load streak
const LS_KEYS = { STREAK:"omd_streak", LAST:"omd_last", DONE:"omd_done" };
const load = (k, d)=> JSON.parse(localStorage.getItem(k) ?? d);
const save = (k, v)=> localStorage.setItem(k, JSON.stringify(v));

function ensureDailyReset(){
  const last = load(LS_KEYS.LAST, '""');
  if (last !== todayISO){
    // New day: mark not done
    save(LS_KEYS.DONE, false);
    save(LS_KEYS.LAST, todayISO);
  }
}
ensureDailyReset();
els.done.textContent = load(LS_KEYS.DONE,false) ? "Yes" : "No";
els.streak.textContent = load(LS_KEYS.STREAK, 0);

function seededIndex(len, seedStr){
  // Deterministic “hash” from date+category for daily rotation
  let h = 2166136261;
  for (let i=0;i<seedStr.length;i++){
    h ^= seedStr.charCodeAt(i);
    h += (h<<1) + (h<<4) + (h<<7) + (h<<8) + (h<<24);
  }
  if (h<0) h = ~h + 1;
  return h % len;
}

function pickQuestion(){
  const cat = els.category.value;
  const pool = cat === "geo" ? geo : lang;
  pickedIndex = seededIndex(pool.length, `${todayISO}:${cat}`);
  const item = pool[pickedIndex];
  correctIdx = item.c;
  return item;
}

function renderQuestion(item){
  els.game.classList.remove("hidden");
  els.fb.textContent = "";
  els.q.textContent = item.q;
  els.opts.innerHTML = "";
  item.a.forEach((txt, i)=>{
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = txt;
    btn.onclick = () => choose(i);
    els.opts.appendChild(btn);
  });
}

function choose(i){
  if (!ticking) return;
  const buttons = [...document.querySelectorAll(".option")];
  buttons.forEach(b => b.disabled = true);
  const correct = i === correctIdx;
  buttons[i].classList.add(correct ? "correct" : "wrong");
  buttons[correctIdx].classList.add("correct");
  if (correct){
    els.fb.textContent = "✅ Correct! You beat the clock.";
    winDay();
  } else {
    els.fb.textContent = "❌ Not quite. You can still try again tomorrow!";
    ticking = false; // one shot per day
  }
}

function tick(){
  if (!ticking) return;
  timeLeft -= 1;
  els.timer.textContent = timeLeft;
  if (timeLeft <= 0){
    ticking = false;
    els.fb.textContent = "⏰ Time’s up!";
    // disable buttons
    [...document.querySelectorAll(".option")].forEach(b=>b.disabled = true);
    return;
  }
  setTimeout(tick, 1000);
}

function start(){
  if (load(LS_KEYS.DONE,false)){
    els.fb.textContent = "You already completed today’s challenge. Come back tomorrow!";
    els.game.classList.remove("hidden");
    return;
  }
  const item = pickQuestion();
  renderQuestion(item);
  timeLeft = 60;
  els.timer.textContent = timeLeft;
  ticking = true;
  setTimeout(tick, 1000);
}

function winDay(){
  if (solvedToday || load(LS_KEYS.DONE,false)) return;
  solvedToday = true;
  save(LS_KEYS.DONE, true);
  els.done.textContent = "Yes";
  // streak logic
  const last = load(LS_KEYS.LAST, todayISO);
  const yesterday = new Date(todayISO); yesterday.setDate(yesterday.getDate()-1);
  const yISO = yesterday.toISOString().slice(0,10);
  let streak = load(LS_KEYS.STREAK, 0);
  if (last === yISO){ streak += 1; } else { streak = 1; }
  save(LS_KEYS.STREAK, streak);
  save(LS_KEYS.LAST, todayISO);
  els.streak.textContent = streak;
  ticking = false;
}

els.start.onclick = start;

els.share.onclick = async () => {
  const txt = `I just did my One-Minute Daily challenge (${todayISO})! Try it:`;
  try{
    if (navigator.share) { await navigator.share({ text: txt, url: location.href }); }
    else{
      await navigator.clipboard.writeText(`${txt} ${location.href}`);
      alert("Share text copied to clipboard!");
    }
  }catch(e){ console.log(e); }
};

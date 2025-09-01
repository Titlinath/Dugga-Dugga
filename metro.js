/* ================== Data ================== */
// Station lists (subset for demo) + line order
const BLUE_LINE = [
  "Kavi Subhash","Netaji","Mahanayak Uttam Kumar","Rabindra Sarobar","Kalighat",
  "Jatin Das Park","Netaji Bhavan","Rabindra Sadan","Maidan","Park Street",
  "Esplanade","Chandni Chowk","Central","M.G. Road","Girish Park",
  "Shobhabazar Sutanuti","Belgachia","Dum Dum"
];

const GREEN_LINE = [
  "Howrah Maidan","Howrah","Mahakaran","Esplanade","Sealdah","Phoolbagan",
  "Salt Lake Stadium","Bengal Chemical","City Center","Central Park",
  "Karunamoyee","Salt Lake Sector V"
];

// Average inter-station distance (km). You can refine per segment later.
const AVG_SEG_KM = 1.2;

// Interchange map (for now Blue <-> Green at Esplanade)
const INTERCHANGES = ["Esplanade"];

// Sample timetables (bilingual rows)
const TIMETABLES = {
  blue: [
    { no:1, en:"Kavi Subhash", bn:"কবি সুভাষ", open:"1986+", conn:"–", layout:"Underground", plat:"Island" },
    { no:2, en:"Esplanade", bn:"এসপ্ল্যানেড", open:"1986+", conn:"Green Line", layout:"Underground", plat:"Side" },
    { no:3, en:"Dum Dum", bn:"দমদম", open:"1986+", conn:"–", layout:"Elevated", plat:"Side" },
  ],
  green: [
    { no:1, en:"Salt Lake Sector V", bn:"সল্টলেক সেক্টর-৫", open:"14 Feb 2020", conn:"–", layout:"Elevated", plat:"Side" },
    { no:2, en:"Sealdah", bn:"শিয়ালদহ", open:"11 Jul 2022", conn:"–", layout:"Underground", plat:"Side/Island" },
    { no:3, en:"Esplanade", bn:"এসপ্ল্যানেড", open:"6 Mar 2024", conn:"Blue Line", layout:"Underground", plat:"–" },
    { no:4, en:"Howrah Maidan", bn:"হাওড়া ময়দান", open:"6 Mar 2024", conn:"–", layout:"Underground", plat:"Island" },
  ]
};

// i18n strings
const I18N = {
  en:{
    title:"Metro Route Guide",
    routeFinder:"Find Route",
    routeFinderNote:"Select your current and destination stations.",
    from:"Current Station",
    to:"Destination Station",
    findRoute:"Find Route",
    blueLine:"Blue Line (North–South)",
    greenLine:"Green Line (East–West)",
    timetableNote:"* Sample timetable/metadata — full data will be added.",
    moreLines:"Other lines coming soon.",
    mapTitle:"Transit Route on Google Maps",
    mapNote:"Live transit directions between the selected stations.",
    openInMaps:"Open in Google Maps",
    thNo:"#", thStation:"Station", thOpening:"Opening", thConn:"Connections", thLayout:"Layout", thPlat:"Platform",
    direct:"Direct route on",
    via:"Use",
    interchange:"interchange at",
    distance:"Approx. distance",
    switches:"Line change(s)"
  },
  hi:{
    title:"मेट्रो रूट गाइड",
    routeFinder:"रूट खोजें",
    routeFinderNote:"अपना वर्तमान और गंतव्य स्टेशन चुनें।",
    from:"वर्तमान स्टेशन",
    to:"गंतव्य स्टेशन",
    findRoute:"रूट देखें",
    blueLine:"नीली लाइन (उत्तर–दक्षिण)",
    greenLine:"हरी लाइन (पूर्व–पश्चिम)",
    timetableNote:"* नमूना समय-सारणी/डेटा — विस्तृत डेटा जल्द जोड़ा जाएगा।",
    moreLines:"अन्य लाइनें जल्द आएंगी।",
    mapTitle:"गूगल मैप्स पर ट्रांजिट रूट",
    mapNote:"चयनित स्टेशनों के बीच लाइव ट्रांजिट दिशा-निर्देश।",
    openInMaps:"Google Maps में खोलें",
    thNo:"#", thStation:"स्टेशन", thOpening:"उद्घाटन", thConn:"कनेक्शन", thLayout:"लेआउट", thPlat:"प्लेटफ़ॉर्म",
    direct:"सीधा रूट —",
    via:"उपयोग करें",
    interchange:"पर",
    distance:"अनुमानित दूरी",
    switches:"लाइन परिवर्तन"
  },
  bn:{
    title:"মেট্রো রুট নির্দেশিকা",
    routeFinder:"রুট খুঁজুন",
    routeFinderNote:"বর্তমান ও গন্তব্য স্টেশন নির্বাচন করুন।",
    from:"বর্তমান স্টেশন",
    to:"গন্তব্য স্টেশন",
    findRoute:"রুট দেখুন",
    blueLine:"নীল লাইন (উত্তর–দক্ষিণ)",
    greenLine:"সবুজ লাইন (পূর্ব–পশ্চিম)",
    timetableNote:"* সময়সূচি/তালিকা নমুনা — পরে পূর্ণ ডেটা যুক্ত হবে।",
    moreLines:"অন্যান্য লাইন শীঘ্রই যুক্ত হবে।",
    mapTitle:"গুগল ম্যাপে ট্রানজিট রুট",
    mapNote:"নির্বাচিত স্টেশনগুলোর মধ্যে লাইভ ট্রানজিট রুট।",
    openInMaps:"Google Maps-এ খুলুন",
    thNo:"#", thStation:"স্টেশন", thOpening:"উদ্বোধন", thConn:"সংযোগ", thLayout:"লেআউট", thPlat:"প্ল্যাটফর্ম",
    direct:"সোজা রুট —",
    via:"ব্যবহার করুন",
    interchange:"ইন্টারচেঞ্জ",
    distance:"আনুমানিক দূরত্ব",
    switches:"লাইন পরিবর্তন"
  }
};

// Language state
let currentLang = "bn";

/* ================== Helpers ================== */
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function setLang(lang){
  currentLang = lang;
  // Move pill
  const buttons = [...$$('.lang-btn')];
  buttons.forEach(b => b.classList.toggle('active', b.dataset.lang===lang));
  const idx = buttons.findIndex(b => b.dataset.lang===lang);
  const pill = $('.lang-switch .pill');
  const btnW = buttons[0].offsetWidth;
  pill.style.transform = `translateX(${idx*btnW}px)`;

  // Texts
  $('[data-i18n="title"]').textContent = I18N[lang].title;
  $('[data-i18n="routeFinder"]').textContent = I18N[lang].routeFinder;
  $('[data-i18n="routeFinderNote"]').textContent = I18N[lang].routeFinderNote;
  $('[data-i18n="from"]').textContent = I18N[lang].from;
  $('[data-i18n="to"]').textContent = I18N[lang].to;
  $('#findBtn').textContent = I18N[lang].findRoute;

  $('[data-i18n="blueLine"]').textContent = I18N[lang].blueLine;
  $('[data-i18n="greenLine"]').textContent = I18N[lang].greenLine;
  $('[data-i18n="timetableNote"]').textContent = I18N[lang].timetableNote;
  $('[data-i18n="moreLines"]').textContent = I18N[lang].moreLines;
  $('[data-i18n="mapTitle"]').textContent = I18N[lang].mapTitle;
  $('[data-i18n="mapNote"]').textContent = I18N[lang].mapNote;
  $('[data-i18n="openInMaps"]').textContent = I18N[lang].openInMaps;

  // table headers
  const keys = ["thNo","thStation","thOpening","thConn","thLayout","thPlat"];
  const ths = $$("#timetable thead th");
  keys.forEach((k,i)=> ths[i].textContent = I18N[lang][k]);

  // refresh table for active tab
  const activeTab = $('.tab.active').dataset.line;
  renderTimetable(activeTab);
}

function populateStations(){
  const allStations = Array.from(new Set([...BLUE_LINE, ...GREEN_LINE]));
  const makeOptions = (selId) => {
    const sel = $(selId);
    sel.innerHTML = `<option value="" disabled selected>—</option>` +
      allStations.map(s => `<option value="${s}">${s}</option>`).join('');
  };
  makeOptions('#fromStation'); makeOptions('#toStation');
}

function onTab(line){
  $$(".tab").forEach(t => {
    const active = t.dataset.line === line;
    t.classList.toggle('active', active);
    t.setAttribute('aria-selected', active);
  });
  renderTimetable(line);
}

function renderTimetable(lineKey){
  const rows = TIMETABLES[lineKey] || [];
  const tb = $("#timetableBody");
  tb.innerHTML = rows.map(r=>{
    const stationName = currentLang==="bn" ? r.bn : (currentLang==="hi" ? r.en : r.en);
    return `<tr>
      <td>${r.no}</td>
      <td>${stationName}</td>
      <td>${r.open}</td>
      <td>${r.conn}</td>
      <td>${r.layout}</td>
      <td>${r.plat}</td>
    </tr>`;
  }).join('');
}

/* -------- Route calculation ---------- */
function lineOf(station){
  if (BLUE_LINE.includes(station)) return "blue";
  if (GREEN_LINE.includes(station)) return "green";
  return null;
}

function pathOnSameLine(lineArr, from, to){
  const i = lineArr.indexOf(from);
  const j = lineArr.indexOf(to);
  if (i===-1 || j===-1) return null;
  const step = i<=j ? 1 : -1;
  const path = [];
  for (let k=i; k!==j; k+=step) path.push(lineArr[k]);
  path.push(lineArr[j]);
  return path;
}

function withInterchange(from, to){
  // try Esplanade as single interchange
  const path1 = pathOnSameLine(lineOf(from)==="blue"?BLUE_LINE:GREEN_LINE, from, "Esplanade");
  const path2 = pathOnSameLine(lineOf(to)==="blue"?BLUE_LINE:GREEN_LINE, "Esplanade", to);
  if (!path1 || !path2) return null;
  // avoid duplicate Esplanade
  return [...path1, ...path2.slice(1)];
}

function computeDistance(path){
  if (!path || path.length<2) return 0;
  const segments = path.length-1;
  return +(segments * AVG_SEG_KM).toFixed(1);
}

function renderViz(path){
  const viz = $("#viz");
  if (!path){ viz.innerHTML = ""; return; }
  const chunks = [];
  path.forEach((name, idx)=>{
    chunks.push(`<span class="stop"><span class="dot"></span>${name}</span>`);
    if (idx < path.length-1) chunks.push(`<span class="connector"></span>`);
  });
  viz.innerHTML = `<div class="viz-track">${chunks.join('')}</div>`;
}

function updateMaps(from, to){
  // Use a standard maps URL that works without API key.
  // It will show transit options on open; iframe shows map area with both points.
  const q = encodeURIComponent(`${from} metro to ${to} metro, Kolkata`);
  const embed = `https://www.google.com/maps?q=${q}&output=embed`;
  $("#gmap").src = embed;

  // External open in maps (transit)
  const live = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from+" metro station, Kolkata")}&destination=${encodeURIComponent(to+" metro station, Kolkata")}&travelmode=transit`;
  $("#openMaps").href = live;
}

function answerText(path, from, to){
  const L = I18N[currentLang];
  const lineFrom = lineOf(from), lineTo = lineOf(to);
  if (lineFrom === lineTo){
    const lineName = lineFrom==="blue" ? L.blueLine : L.greenLine;
    return `${L.direct} ${lineName}.`;
  }
  return `${L.via} ${L.greenLine} / ${L.blueLine} — ${L.interchange} Esplanade.`;
}

/* ================== Events ================== */
document.addEventListener('DOMContentLoaded', ()=>{
  populateStations();
  setLang(currentLang);
  onTab('blue');

  // language buttons
  $$(".lang-btn").forEach(btn=>{
    btn.addEventListener('click', ()=> setLang(btn.dataset.lang));
  });

  // tabs
  $$(".tab").forEach(t => t.addEventListener('click', ()=> onTab(t.dataset.line)));

  // form submit
  $("#routeForm").addEventListener('submit', (e)=>{
    e.preventDefault();
    const from = $("#fromStation").value;
    const to = $("#toStation").value;
    if (!from || !to || from===to) return;

    let path = null;
    if (lineOf(from) === lineOf(to)){
      path = pathOnSameLine(lineOf(from)==="blue"?BLUE_LINE:GREEN_LINE, from, to);
    } else {
      path = withInterchange(from, to);
    }

    renderViz(path);

    const dist = computeDistance(path);
    const L = I18N[currentLang];
    $("#answerLabel").textContent = answerText(path, from, to);
    $("#summary").innerHTML =
      `<strong>${L.distance}:</strong> ${dist} km · <strong>${L.switches}:</strong> ${lineOf(from)===lineOf(to)?0:1}`;

    updateMaps(from, to);
  });
});
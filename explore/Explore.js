// ============================================================
// CONFIG
// ============================================================
var CONFIG = {
  submitFormUrl: "https://forms.gle/YOUR_FORM_LINK_HERE"
};

// ============================================================
// GAMES — edit here to add/remove/update games
// featured: true  shows in featured strip
// featured: false grid only
// takenDown: true hides game immediately
// multiplayer: true shows server.pros warning
// ============================================================
var GAMES = [

  {
    id: 1,
    name: "Dungeon Escape",
    author: "ProtonTeam",
    genre: "rpg",
    desc: "An RPG built entirely in Proton#. Descend through 5 dungeons, battle enemies, collect loot and escape. Every mechanic written in pure .pros code.",
    rating: 4.9,
    downloads: 312,
    age: "E10",
    date: "2026-03-01",
    link: "#",
    thumb: null,
    featured: true,
    takenDown: false,
    multiplayer: false
  },

  {
    id: 2,
    name: "Pixel Tycoon",
    author: "ProtonTeam",
    genre: "tycoon",
    desc: "Start with $500 and build a global empire. Hire staff, research upgrades, manage supply chains. A full tycoon loop in Proton#.",
    rating: 4.7,
    downloads: 198,
    age: "E",
    date: "2026-03-01",
    link: "#",
    thumb: null,
    featured: true,
    takenDown: false,
    multiplayer: false
  },

  {
    id: 3,
    name: "Shadow Arena",
    author: "ProtonTeam",
    genre: "shooter",
    desc: "A tactical multiplayer shooter demonstrating server.pros. Host or join a server and battle up to 8 players. Full server.pros reference included.",
    rating: 4.8,
    downloads: 275,
    age: "T",
    date: "2026-03-01",
    link: "#",
    thumb: null,
    featured: true,
    takenDown: true,
    multiplayer: true
  },

  {
    id: 4,
    name: "Block Jumper",
    author: "ProtonTeam",
    genre: "platformer",
    desc: "A precision platformer with 30 levels of increasing difficulty. Demonstrates Proton# physics and collision detection.",
    rating: 4.6,
    downloads: 143,
    age: "E",
    date: "2026-03-01",
    link: "#",
    thumb: null,
    featured: false,
    takenDown: false,
    multiplayer: false
  },

  {
    id: 5,
    name: "Mind Lock",
    author: "ProtonTeam",
    genre: "puzzle",
    desc: "50 logic puzzles across 5 worlds. Flip switches, redirect lasers and unlock doors. Demonstrates Proton# GUI and event-driven design.",
    rating: 4.5,
    downloads: 119,
    age: "E",
    date: "2026-03-01",
    link: "#",
    thumb: true,
    featured: false,
    takenDown: false,
    multiplayer: false
  }

  // Add approved community games below this line:
  // {
  //   id: 6,
  //   name: "Game Name",
  //   author: "Author",
  //   genre: "rpg",
  //   desc: "Description.",
  //   rating: 0,
  //   downloads: 0,
  //   age: "E",
  //   date: "2026-03-01",
  //   link: "#",
  //   thumb: null,
  //   featured: false,
  //   takenDown: false,
  //   multiplayer: false
  // },

];
// ============================================================
// END GAMES
// ============================================================

var ICONS = {rpg:"sword",tycoon:"factory",platformer:"target",shooter:"gun",puzzle:"puzzle",horror:"ghost",simulator:"truck",adventure:"map"};
var GENRE_EMOJI = {rpg:"⚔️",tycoon:"🏭",platformer:"🎯",shooter:"🔫",puzzle:"🧩",horror:"👻",simulator:"🚜",adventure:"🗺️"};
var AGE_CLASS = {E:"age-e",E10:"age-e10",T:"age-t",M:"age-m"};
var AGE_LABEL = {E:"E",E10:"E10+",T:"T",M:"M"};
var TITLES = {all:"All Games",rpg:"RPG Games",tycoon:"Tycoon Games",platformer:"Platformers",shooter:"Shooter Games",puzzle:"Puzzle Games",horror:"Horror Games",simulator:"Simulators",adventure:"Adventures"};

var currentGenre = "all";
var currentGame = null;
var DL_COOLDOWN = 30000;

function thumbSrc(g) {
  if (g.thumb) return g.thumb;
  var n = g.name.toLowerCase().replace(/[^a-z0-9]/g,"_");
  return "../media/thumb/" + n + ".png";
}

function fmtDL(n) {
  return n >= 1000 ? (n/1000).toFixed(1)+"k" : String(n);
}

function starStr(r) {
  var full = Math.round(r);
  var s = "";
  for(var i=0;i<5;i++) s += i < full ? "★" : "☆";
  return s;
}

function setGenre(g, btn) {
  currentGenre = g;
  document.querySelectorAll(".genre-btn").forEach(function(b){b.classList.remove("active");});
  btn.classList.add("active");
  document.getElementById("genre-title").textContent = TITLES[g] || g;
  document.getElementById("mp-notice").style.display = g === "shooter" ? "flex" : "none";
  document.getElementById("featured-row").style.display = g === "all" ? "block" : "none";
  filterGames();
}

function filterGames() {
  var search = document.getElementById("search-input").value.toLowerCase();
  var sort = document.getElementById("sort-select").value;
  var ratings = Array.from(document.querySelectorAll(".rating-opts input:checked")).map(function(i){return i.value;});

  var games = GAMES.filter(function(g){return !g.takenDown;});
  if (currentGenre !== "all") games = games.filter(function(g){return g.genre === currentGenre;});
  if (search) games = games.filter(function(g){return g.name.toLowerCase().indexOf(search) >= 0 || g.author.toLowerCase().indexOf(search) >= 0;});
  games = games.filter(function(g){return ratings.indexOf(g.age) >= 0;});

  if (sort === "downloads") games.sort(function(a,b){return b.downloads-a.downloads;});
  else if (sort === "rating") games.sort(function(a,b){return b.rating-a.rating;});
  else if (sort === "newest") games.sort(function(a,b){return new Date(b.date)-new Date(a.date);});
  else games.sort(function(a,b){return a.name.localeCompare(b.name);});

  document.getElementById("result-count").textContent = games.length + " game" + (games.length !== 1 ? "s" : "");
  document.getElementById("games-grid").innerHTML = games.map(gameCard).join("");
  document.getElementById("empty-state").style.display = games.length ? "none" : "block";

  var all = GAMES.filter(function(g){return !g.takenDown;});
  document.getElementById("total-games").textContent = all.length;
  var totalDL = all.reduce(function(s,g){return s+g.downloads;},0);
  document.getElementById("total-downloads").textContent = fmtDL(totalDL);
  ["all","rpg","tycoon","platformer","shooter","puzzle","horror","simulator","adventure"].forEach(function(genre){
    var el = document.getElementById("count-"+genre);
    if (el) el.textContent = genre === "all" ? all.length : all.filter(function(g){return g.genre===genre;}).length;
  });
}

function gameCard(g) {
  var emoji = GENRE_EMOJI[g.genre] || "🎮";
  var stars = starStr(g.rating);
  var dlFmt = fmtDL(g.downloads);
  var mpTag = g.multiplayer ? '<span class="mp-tag">MP</span>' : "";
  var btnCls = g.multiplayer ? "dl-btn mp-btn" : "dl-btn";
  var btnTxt = g.multiplayer ? "Download + Server" : "Download";
  return '<div class="game-card" onclick="openDetail(' + g.id + ')">'
    + '<div class="game-thumb">'
    + '<img src="' + thumbSrc(g) + '" alt="' + g.name + '" onerror="this.style.display=\'none\'">'
    + '<span style="position:relative;z-index:0;">' + emoji + '</span>'
    + '<div class="thumb-badges">'
    + '<span class="genre-tag gt-' + g.genre + '">' + emoji + ' ' + g.genre.toUpperCase() + '</span>'
    + mpTag + '</div></div>'
    + '<div class="game-body">'
    + '<div class="game-name">' + g.name + '</div>'
    + '<div class="game-author">by ' + g.author + '</div>'
    + '<div class="game-meta">'
    + '<span><span class="game-stars">' + stars + '</span><span class="game-star-val"> ' + g.rating + '</span></span>'
    + '<span class="age-badge ' + AGE_CLASS[g.age] + '">' + AGE_LABEL[g.age] + '</span>'
    + '</div>'
    + '<div class="game-dl">⬇ ' + dlFmt + ' downloads</div>'
    + '<button class="' + btnCls + '" onclick="event.stopPropagation();handleDL(' + g.id + ')">' + btnTxt + '</button>'
    + '</div></div>';
}

function renderFeatured() {
  var featured = GAMES.filter(function(g){return g.featured && !g.takenDown;});
  document.getElementById("featured-scroll").innerHTML = featured.map(function(g){
    var emoji = GENRE_EMOJI[g.genre] || "🎮";
    var stars = starStr(g.rating);
    return '<div class="featured-card" onclick="openDetail(' + g.id + ')">'
      + '<div class="featured-thumb">'
      + '<img src="' + thumbSrc(g) + '" alt="' + g.name + '" onerror="this.style.display=\'none\'">'
      + '<span class="dt-icon">' + emoji + '</span>'
      + '<span class="feat-badge">FEATURED</span>'
      + '<span class="mod-approved">✓ MOD APPROVED</span>'
      + '</div>'
      + '<div class="featured-body">'
      + '<h3>' + g.name + '</h3>'
      + '<div class="f-meta"><span class="f-author">by ' + g.author + '</span>'
      + '<span class="age-badge ' + AGE_CLASS[g.age] + '">' + AGE_LABEL[g.age] + '</span></div>'
      + '<div class="f-footer">'
      + '<span><span class="stars">' + stars + '</span><span class="star-count"> ' + g.rating + '</span></span>'
      + '<span class="dl-count">⬇ ' + fmtDL(g.downloads) + '</span>'
      + '</div></div></div>';
  }).join("");
}

function openDetail(id) {
  var g = GAMES.find(function(x){return x.id===id;});
  if (!g) return;
  currentGame = g;
  var dThumb = document.getElementById("d-thumb");
  dThumb.innerHTML = '<img src="' + thumbSrc(g) + '" alt="' + g.name + '" onerror="this.style.display=\'none\'">'
    + '<span class="dt-icon">' + (GENRE_EMOJI[g.genre]||"🎮") + '</span>';
  document.getElementById("d-title").textContent = g.name;
  document.getElementById("d-author").textContent = "by " + g.author;
  var badges = '<span class="genre-tag gt-' + g.genre + '" style="font-size:0.72rem;padding:3px 9px;">' + (GENRE_EMOJI[g.genre]||"🎮") + " " + g.genre.toUpperCase() + '</span>'
    + '<span class="age-badge ' + AGE_CLASS[g.age] + '" style="font-size:0.72rem;padding:3px 9px;">' + AGE_LABEL[g.age] + '</span>'
    + (g.multiplayer ? '<span class="mp-tag" style="font-size:0.72rem;padding:3px 9px;">🌐 Multiplayer</span>' : "");
  document.getElementById("d-badges").innerHTML = badges;
  document.getElementById("d-desc").textContent = g.desc;
  document.getElementById("d-rating").innerHTML = '<span style="color:var(--yellow)">' + starStr(g.rating) + '</span> ' + g.rating;
  document.getElementById("d-downloads").textContent = fmtDL(g.downloads);
  document.getElementById("d-date").textContent = g.date.slice(0,7);
  document.getElementById("d-mp").style.display = g.multiplayer ? "block" : "none";
  document.getElementById("d-dl-btn").textContent = g.multiplayer ? "🌐 Download + Server Guide" : "⬇ Download Game";
  document.getElementById("detail-overlay").classList.add("open");
}

function closeDetail(e) {
  if (!e || e.target === document.getElementById("detail-overlay")) {
    document.getElementById("detail-overlay").classList.remove("open");
  }
}

function canDownload(id) {
  var key = "dl_" + id;
  var last = parseInt(sessionStorage.getItem(key) || "0");
  var now = Date.now();
  if (now - last < DL_COOLDOWN) {
    var secs = Math.ceil((DL_COOLDOWN - (now - last)) / 1000);
    alert("Please wait " + secs + " seconds before downloading again.");
    return false;
  }
  sessionStorage.setItem(key, now);
  return true;
}

function handleDownload() {
  if (!currentGame) return;
  if (currentGame.age === "M") {
    document.getElementById("age-overlay").classList.add("open");
    return;
  }
  if (!canDownload(currentGame.id)) return;
  currentGame.downloads++;
  filterGames();
  renderFeatured();
  document.getElementById("d-downloads").textContent = fmtDL(currentGame.downloads);
  if (currentGame.link && currentGame.link !== "#") window.open(currentGame.link);
}

function handleDL(id) {
  openDetail(id);
}

function openSubmit() {
  window.open(CONFIG.submitFormUrl, "_blank");
}

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") closeDetail();
});

window.onload = function() {
  renderFeatured();
  filterGames();
};

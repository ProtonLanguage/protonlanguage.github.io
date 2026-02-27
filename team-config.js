// ════════════════════════════════════════════════
// PROTON# SITE CONFIG
// This is the ONLY file you ever need to edit!
// ════════════════════════════════════════════════


// ── LINKS ──────────────────────────────────────
// Set to null to hide the download or form button
const LINKS = {
  positions_doc: "https://docs.google.com/document/d/1lJOzzOJWunofEx4wEWXpCQPCdjj1Qn8TBqSZJvhX0XE/edit?usp=sharing",
  apply_form:    "YOUR_GOOGLE_FORM_LINK",
  download:      "https://github.com/ProtonLanguage/proton-sharp/releases/latest/download/ProtonSharp.zip",
  support_email: "protoncoding@outlook.com"
};


// ── SOCIAL LINKS ───────────────────────────────
// Set any value to null to hide that social card
const SOCIALS = {
  github:    "https://github.com/ProtonLanguage",
  discord:   null,
  youtube:   null,
  twitter:   null,
  instagram: null,
  facebook:  null,
  tiktok:    null,
  reddit:    null,
  twitch:    null,
};


// ── TEAM ───────────────────────────────────────
// HOW TO ADD A MEMBER:
//   1. Find the team section you want (dev or community)
//   2. Copy the template block below and paste it in
//   3. Fill in the details
//   4. Save the file — the site reads it automatically!
//
// MEMBER TEMPLATE (copy this):
// -----------------------------------------
// {
//   username: "TheirUsername",
//   role: "Their Role Title",
//   description: "What they do on the team.",
//   about: "Something about them personally.",
//   emoji: "🔧"
// },
// -----------------------------------------
// Set username and about to null for open positions

const TEAM = {

  // ── FOUNDER (do not add more here) ──
  founder: {
    username:    "Xynox1",
    role:        "Founder & Lead Developer",
    description: "Founder of Proton# and lead developer. Manages the project vision, Lua datastores, and overall direction of the platform.",
    about:       "Hey I'm Xynox1! I'm the founder and head devoloper of this project. I enjoy working with LUA for datastores and configs and Python for games. I mostly script on roblox. My idea for this came from me and my friends just talking about programming languages. Enjoy!,
    emoji:       "🔨"
  },

  // ── CORE DEVELOPMENT TEAM ──
  // Add new dev team members here by copying the template above
  dev: [
    {
      username:    null,
      role:        "C# Developer",
      description: "Builds and maintains the Proton# Studio editor.",
      about:       null,
      emoji:       "💻"
    },
    {
      username:    null,
      role:        "Python Developer",
      description: "Works on the Proton language interpreter and core logic.",
      about:       null,
      emoji:       "🐍"
    },
    {
      username:    null,
      role:        "UI/UX Designer",
      description: "Designs the look and feel of Proton# Studio and the website.",
      about:       null,
      emoji:       "🎨"
    },
    {
      username:    null,
      role:        "Graphics Designer",
      description: "Creates logos, banners, and visual assets for the platform.",
      about:       null,
      emoji:       "✏️"
    },
    // Paste new dev team members above this line
  ],

  // ── COMMUNITY TEAM ──
  // Add new community team members here by copying the template above
  community: [
    {
      username:    null,
      role:        "Website Manager",
      description: "Keeps the Proton# website up to date.",
      about:       null,
      emoji:       "🌐"
    },
    // Paste new community team members above this line
  ],

};

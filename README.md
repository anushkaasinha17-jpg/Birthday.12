# 🎂 Happy Birthday, Mayank — An Interactive Love Letter

A hand-crafted, single-page birthday experience built with pure **HTML5, CSS3, and Vanilla JavaScript** — no frameworks, no build tools, no npm. Just open `index.html` and it runs.

This project was made as a personal, romantic birthday gift. It blends a dreamy **Studio Ghibli** atmosphere, **Apple-style** polish and restraint, and a soft **Valentine's + Birthday** emotional core into one continuous scroll experience.

---

## ✨ What's Inside

| # | Section | Description |
|---|---------|-------------|
| 0 | **Intro** | Elegant title card with a ripple "Open Your Gift" button that transitions into the experience |
| 1 | **Birthday Cake** | An interactive CSS cake — click each candle to blow it out and trigger confetti |
| 2 | **Blooming Flowers** | Continuously blooming CSS flowers, falling petals, and drifting butterflies |
| 3 | **Love Letter** | A deeply personal, handwritten-style letter |
| 4 | **Memory Timeline** | Scroll-revealed timeline of your story together |
| 5 | **30 Reasons I Love You** | A grid of flip-cards, each revealing one reason |
| 6 | **Interactive Garden** | Click anywhere to plant a unique, procedurally styled flower |
| 7 | **Night Sky** | Twinkling stars, a glowing moon, shooting stars, and click-to-launch hearts |
| 8 | **Final Statement** | A closing glassmorphic message |

### Global Effects
- Animated gradient background that shifts slowly through dusk tones
- Glassmorphism cards throughout
- Floating hearts, petals, and fireflies drifting across the whole page
- A soft glow that follows the cursor, with a trailing sparkle effect
- A floating music player (bottom-right) that begins playing after you open the gift
- **Secret Easter Egg:** type the word `mayank` anywhere on the page to unlock a hidden message and a heart explosion 💗

---

## 📁 Folder Structure

```
happy-birthday-mayank/
├── README.md
├── index.html
├── style.css
├── script.js
└── music/
    └── happy-birthday.mp3   ← replace with your own audio file
```

---

## 🚀 How to Run

1. Download / clone this folder.
2. Double-click `index.html` (or right-click → Open with your browser).
3. That's it — everything runs locally, no server or internet connection required (fonts will use elegant system fallbacks if offline).

> 💡 Tip: For the smoothest experience, open it in Chrome, Edge, or Safari on desktop, or any modern mobile browser.

---

## 🎵 Adding Your Own Music

Replace the placeholder file at `music/happy-birthday.mp3` with any `.mp3` file — just keep the same filename, or update the `<source>` path in `index.html`. The music starts automatically the first time Mayank clicks **"Open Your Gift"** (browsers block autoplay before user interaction, so this is intentional and works reliably).

---

## 🛠️ Personalizing It Further

Everything is written in plain, readable code so you can easily edit it:

- **Love Letter text** → search for `id="love-letter-body"` in `index.html`
- **Timeline memories** → edit the `<article class="timeline-card">` blocks in the Memory Timeline section
- **30 Reasons** → each reason lives in the `reasons` array at the top of `script.js`
- **Colors & fonts** → all defined as CSS custom properties at the top of `style.css` under `:root`
- **Secret word** → change the `SECRET_WORD` constant in `script.js`

---

## 🧑‍💻 Tech Notes

- Pure vanilla JS (ES6+), no dependencies, no build step.
- Fonts loaded via Google Fonts CDN with graceful system-font fallback if offline.
- Confetti, fireflies, petals, and stars are rendered with a mix of lightweight `<canvas>` particle systems and CSS animations, tuned for 60fps on modern laptops and phones.
- Respects `prefers-reduced-motion` — ambient animation intensity is automatically reduced for accessibility.
- Fully responsive: fluid typography (`clamp()`), CSS Grid/Flexbox layouts, tested down to 360px width.

---

Made with a whole lot of love, for Mayank. Happy Birthday. 🎈❤️

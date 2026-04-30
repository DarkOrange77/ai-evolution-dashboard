<img width="1850" height="909" alt="image" src="https://github.com/user-attachments/assets/5e0f462b-c462-4a6d-afe8-5c5b454c6902" />

# 🌍 AI Evolution Dashboard
### A Spatio-Temporal Visualization of Artificial Intelligence Across Industrial Revolutions

> *From steam engines to large language models — mapped, compared, and told as a story.*

---

## 📌 What Is This?

The **AI Evolution Dashboard** is an interactive deeptech visualization that maps how Artificial Intelligence evolved across the four industrial revolutions (Industry 1.0 → 4.0) across 20+ countries worldwide.

It is not a flat map with dots. It is a **narrative system** — each country has a role, each era has a story, and the data tells it visually.

Built as an internship-level deeptech prototype. Designed like a real product.

---

## ✨ Features

- 🌐 **3D WebGL Globe** — interactive, rotatable, zoomable Earth with city-lights night texture
- ⏱️ **Timeline Slider** — scrub through Industry 1.0 → 2.0 → 3.0 → 4.0 and watch the globe update live
- 🎯 **Country Markers** — sized by `impact_score`, colored by narrative role
- 📋 **Country Cards** — click any marker to see AI stage, key historical events, and impact level
- 📊 **Comparison Panel** — select up to 4 countries and compare their impact across all eras side-by-side
- 🔀 **Layer System** — toggle Layer 2 countries (emerging ecosystems) on/off for visual clarity
- 🎨 **Narrative Roles** — every country is classified: Pioneer, Leapfrogger, Industrial Scaler, Cautionary Arc, or Policy Leader

---

## 🧱 Tech Stack

| Layer | Tool | Why |
|---|---|---|
| Framework | React 18 + Vite | Fast dev server, modern React |
| Globe | react-globe.gl | WebGL 3D globe, Three.js under the hood |
| Styling | Inline CSS + CSS variables | No build-time Tailwind needed |
| Charts | Custom bar chart in ComparisonPanel | Lightweight, no heavy chart library |
| Data | Local JSON | No backend, no latency, no cost |
| Fonts | Syne + JetBrains Mono | Clean deeptech aesthetic |
| Deploy | Render | One command, free tier |

---

## 🗂️ Project Structure

```
ai-evolution-dashboard/
│
├── public/
│
├── src/
│   ├── data/
│   │   └── evolution.json          ← Full dataset: 20+ countries × 4 eras
│   │
│   ├── components/
│   │   ├── GlobeView.jsx           ← WebGL globe (rendering only, no logic)
│   │   ├── TimelineSlider.jsx      ← Era selector at the bottom
│   │   ├── CountryCard.jsx         ← Right panel on country click
│   │   ├── ComparisonPanel.jsx     ← Left panel for multi-country comparison
│   │   └── EraLegend.jsx           ← Color key + Layer 2 toggle
│   │
│   ├── hooks/
│   │   └── useFilteredData.js      ← Filters evolution.json by era + layer
│   │
│   ├── utils/
│   │   └── globeMarkers.js         ← Converts JSON → globe marker format
│   │
│   ├── App.jsx                     ← Root state + layout
│   └── main.jsx                    ← Entry point
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Install & Run

```bash
# Clone the repo
git clone https://github.com/yourusername/ai-evolution-dashboard.git
cd ai-evolution-dashboard

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

---

## 🧠 Data Model

Each country in `evolution.json` follows this schema:

```json
{
  "country": "Japan",
  "code": "JP",
  "coordinates": [36.20, 138.25],
  "layer": 1,
  "narrative_weight": "cautionary_arc",
  "description": "The AI Winter cautionary tale...",
  "eras": [
    {
      "era": "Industry 3.0",
      "year_range": "1950–1990",
      "ai_stage": "Robotics Leader + AI Winter Trigger",
      "key_events": [
        "Fifth Generation Computer Project launched (1982)",
        "Project fails by 1992 — triggers global AI Winter"
      ],
      "impact_level": "Very High",
      "impact_score": 4
    }
  ]
}
```

### Narrative Roles

| Role | Color | Countries |
|---|---|---|
| `pioneer_arc` | Cyan | USA, UK, Canada |
| `leapfrog_arc` | Green | China, India |
| `scale_arc` | Purple | Germany, South Korea |
| `cautionary_arc` | Amber | Japan, Russia |
| `policy_arc` | Pink | France, EU nations |

### Layer System

- **Layer 1** — Always visible core countries
- **Layer 2** — Toggle-able expansion countries (emerging ecosystems, regional leaders)

---

## 🎨 Design Decisions

**Why a globe instead of a flat map?**
A 3D globe signals "deeptech visualization" instantly. It also accurately represents geographic relationships between countries — something a Mercator projection distorts.

**Why fixed JSON instead of a live API?**
The data is curated, narrative-driven, and historically grounded. A live API would pull unstructured data that breaks the storytelling model. The right data > more data.

**Why `narrative_weight`?**
It drives everything — marker color, card tone, comparison framing. Without it, the visualization is just a map with dots. With it, it's a system that communicates meaning.

**Why no backend?**
For a visualization prototype, a backend adds deployment complexity, cost, and failure points for zero benefit. The entire dataset is ~50KB of JSON.

---

## 📈 Roadmap

- [ ] Animated era transitions (markers grow/shrink as you scrub)
- [ ] Country search / filter by narrative role
- [ ] Export comparison as PNG
- [ ] India Layer 2 → Layer 1 upgrade with full dataset
- [ ] Mobile responsive layout
- [ ] Dark/light mode toggle

---

## 🙏 Acknowledgements

- [react-globe.gl](https://github.com/vasturiano/react-globe.gl) — the globe rendering engine
- [three-globe](https://github.com/vasturiano/three-globe) — textures and underlying 3D engine
- NASA Blue Marble / Earth Night imagery — via unpkg CDN
- Historical AI timeline references: Stanford HAI, Our World in Data, Wikipedia

---

## 📄 License

MIT — do whatever you want with it, just don't claim you built it alone if you pair-programmed it with an AI. That would be ironic given the subject matter.

---
Built with React + WebGL + a lot of historical curiosity

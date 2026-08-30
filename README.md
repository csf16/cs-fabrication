# CS Fabrication — Solar Mounting Structures Website

> A premium multi-page React website for CS Fabrication — a Mumbai-based manufacturer of high-tensile hot-dip galvanized solar mounting structures and slotted C-channel frameworks.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started (Local Development)](#getting-started-local-development)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Components Reference](#components-reference)
- [Design System](#design-system)
- [Available Scripts](#available-scripts)
- [Build & Deployment](#build--deployment)
- [Environment Notes](#environment-notes)
- [Adding a New Page](#adding-a-new-page)

---

## Project Overview

CS Fabrication's website is a **multi-page React + Vite** application that presents:

- An interactive **3D assembly hero** with a Three.js rendered slotted C-channel assembly
- Detailed product pages for **5 solar structure types** (Ground Mount, Rooftop, Carport, Tracker, Custom Agri-PV)
- A **photo gallery** with category filtering and fullscreen lightbox
- Engineering methodology, FEA simulation details, and IS code compliance pages
- An **RFQ proposal form** accessible from every page via a slide-out drawer
- About & Contact pages

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 19.x |
| Language | TypeScript | ~6.0 |
| Build Tool | Vite | 8.x |
| Routing | React Router DOM | 7.x |
| Styling | Tailwind CSS v4 (via Vite plugin) | 4.3.x |
| 3D Rendering | Three.js | 0.185.x |
| Icons | Lucide React | 1.34.x |
| Linting | Oxlint | 1.79.x |
| Fonts | Google Fonts — Inter + DM Mono | (CDN) |

---

## Prerequisites

```bash
node --version   # v18.0.0 or higher (v20 LTS recommended)
npm --version    # v9.0.0 or higher
```

> The project uses ES Modules. Do NOT use CommonJS require() syntax.

---

## Getting Started (Local Development)

### 1. Clone the repository

```bash
git clone <repository-url>
cd CS
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Opens at **http://localhost:5173** with Hot Module Replacement (HMR).

---

## Project Structure

```
CS/
├── public/                        # Static assets served as-is
│   ├── assets/                    # Product/site photos (JPG, WebP)
│   │   ├── steel_structure.jpg
│   │   ├── custom_metal.jpg
│   │   └── precision_prototyping.jpg
│   ├── gallery/                   # Gallery photos shown in GallerySection
│   ├── hardware/                  # Hardware catalog photos
│   └── favicon.svg                # Site favicon (CS lettermark SVG)
│
├── src/
│   ├── main.tsx                   # React entry point — mounts <App /> to #root
│   ├── App.tsx                    # Root: BrowserRouter, routes, global enquiry state
│   ├── index.css                  # Global CSS: tokens, fonts, scrollbar, animations
│   │
│   ├── pages/                     # One file per URL route
│   │   ├── HomePage.tsx           # /            — Hero3D, intro, structures, gallery, process
│   │   ├── StructuresPage.tsx     # /structures  — 5 profiles + comparison matrix
│   │   ├── GalleryPage.tsx        # /gallery     — Photo archive page
│   │   ├── EngineeringPage.tsx    # /engineering — 7-step FEA methodology
│   │   ├── AboutPage.tsx          # /about       — Company profile, certifications
│   │   └── ContactPage.tsx        # /contact     — RFQ form + direct contacts
│   │
│   └── components/                # Reusable shared components
│       ├── Navbar.tsx             # Fixed nav — scroll detection, mobile drawer
│       ├── Footer.tsx             # Site footer with links and copyright
│       ├── Hero3D.tsx             # Three.js interactive C-channel assembly
│       ├── GallerySection.tsx     # Photo grid + fullscreen lightbox
│       ├── EnquiryForm.tsx        # Global RFQ slide-out drawer
│       ├── SectionHeading.tsx     # Shared section title component
│       ├── SolarHardwareCatalog.tsx  # Hardware catalog (legacy, not in nav)
│       └── ScrollToTop.tsx        # Auto-scrolls to top on route change
│
├── index.html                     # Vite HTML template
├── vite.config.ts                 # React + Tailwind CSS v4 Vite plugins
├── tsconfig.json                  # TypeScript root config
├── tsconfig.app.json              # App TS config (strict, bundler resolution)
├── tsconfig.node.json             # Node TS config (for vite.config.ts)
└── package.json                   # Dependencies and scripts
```

---

## Pages & Routes

| URL | Page | Description |
|---|---|---|
| `/` | HomePage | Landing page: 3D hero, engineering intro, structure showcase, gallery preview, process tabs, benchmarks, CTA |
| `/structures` | StructuresPage | 5 structure types with filter pills, spec cards, comparison matrix |
| `/gallery` | GalleryPage | Photo archive with category filters and fullscreen lightbox |
| `/engineering` | EngineeringPage | 7-step methodology: Geotechnical → FEA → CAD → Fabrication → Galvanizing → QC → Installation |
| `/about` | AboutPage | Company story, 150+ MW track record, IS certifications |
| `/contact` | ContactPage | RFQ proposal form + direct contact info |
| `/hardware` | → `/structures` | Legacy redirect |
| `/projects` | → `/gallery` | Legacy redirect |
| `/*` | → `/` | 404 fallback |

---

## Components Reference

### App.tsx
- Wraps everything in `<BrowserRouter>`
- `<ScrollToTop>` as first child — resets scroll on every navigation
- Global `isEnquiryOpen` + `selectedService` state controls the RFQ drawer
- Listens for `window.dispatchEvent(new CustomEvent('open-enquiry', { detail: 'ServiceName' }))` from any child
- Renders: `<Navbar>` → `<Routes>` → `<Footer>` → `<EnquiryForm>`

### Hero3D.tsx
- Uses Three.js WebGL renderer
- Interactive C-channel assembly with mouse-parallax animation
- "EXPLORE ASSEMBLY" button triggers cinematic explode/reassemble
- Slotted oval punch holes and folded return lips in the 3D model

### Navbar.tsx
- Transparent at top → frosted glass backdrop-blur on scroll (>20px)
- Active route: gold underline indicator via NavLink isActive
- Mobile: hamburger toggle opens slide-in drawer from right
- Routes: Home · Structures · Gallery · Engineering · About + CTA button

### GallerySection.tsx
- Filter tabs: All / Solar Structures / C-Channels & Rails / Hardware / Factory
- Asymmetric masonry grid layout
- Click photo → fullscreen lightbox with Prev/Next arrows and Esc key support

### EnquiryForm.tsx
- Slide-out drawer from right edge (500px max-width)
- Fields: Name, Company, Email, Phone, Project Type, Location, Capacity, Notes
- Optional file upload (PDF, DXF, DWG, ZIP)
- Pre-populated project type via `preSelectedService` prop
- Trigger globally: `window.dispatchEvent(new CustomEvent('open-enquiry', { detail: 'Ground Mounted Fixed Tilt' }))`

### SectionHeading.tsx
```tsx
<SectionHeading badge="Label" title="Main Title" desc="Optional description" light />
// light prop: uses white text (for dark backgrounds)
```

### ScrollToTop.tsx
Calls `window.scrollTo(0, 0)` on every `location.pathname` change.

---

## Design System

### Colors

| CSS Variable | Hex | Role |
|---|---|---|
| `--ivory` | `#F7F6F1` | Page background |
| `--stone` | `#EEECE6` | Card / surface backgrounds |
| `--ink` | `#141516` | Primary text, dark sections |
| `--carbon` | `#2C2F32` | Secondary text, hover states |
| `--bronze` | `#A88A58` | Accent — badges, borders, links |
| `--bronze-light` | `#C4A96E` | Bronze hover |
| `--muted` | `#7A7D80` | Tertiary text, labels |

### Typography

| Font | Stack | Weights | Use |
|---|---|---|---|
| **Inter** | Google Fonts | 300–900 | All headings & body |
| **DM Mono** | Google Fonts | 400, 500 | Labels, badges, code specs |

### Layout

- Max content width: `1280px`
- Horizontal padding: `px-8 md:px-14`
- Navbar height: `64px` (h-16) → all page wrappers need `pt-16` or `pt-28`
- Breakpoints: `md` = 768px, `lg` = 1024px

---

## Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server at `http://localhost:5173` with HMR |
| `npm run build` | Type-check + production bundle → `dist/` |
| `npm run preview` | Serve `dist/` locally at `http://localhost:4173` |
| `npm run lint` | Run Oxlint static analysis |
| `npx tsc --noEmit` | Type-check without emitting files |

---

## Build & Deployment

### Build

```bash
npm run build
# Output: dist/index.html + dist/assets/*.js + dist/assets/*.css
```

### IMPORTANT: SPA Routing

This app uses **client-side routing**. All URLs must fall back to `index.html`. Configure your hosting:

#### Netlify — `public/_redirects`
```
/*  /index.html  200
```

#### Vercel — `vercel.json`
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

#### Apache — `.htaccess`
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

#### Nginx
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## Environment Notes

- **Node 18+** required (20 LTS recommended)
- **No `.env` needed** — no backend calls, all assets are static
- **Google Fonts** must be reachable at build/load time. For offline: self-host Inter + DM Mono
- **WebGL required** for the Three.js hero — supported in all modern browsers
- **TypeScript strict mode** is on — run `npx tsc --noEmit` before every commit

---

## Adding a New Page

1. Create `src/pages/MyNewPage.tsx`:
```tsx
export const MyNewPage: React.FC = () => {
  return (
    <div className="w-full pt-28 pb-24 bg-[#F7F6F1]">
      <div className="max-w-[1280px] mx-auto px-8 md:px-14">
        <h1>My New Page</h1>
      </div>
    </div>
  );
};
```

2. Add import + route in `src/App.tsx`:
```tsx
import { MyNewPage } from './pages/MyNewPage';
// Inside <Routes>:
<Route path="/new" element={<MyNewPage />} />
```

3. Add nav link in `src/components/Navbar.tsx`:
```tsx
{ to: '/new', label: 'New Section' },
```

4. Add footer link in `src/components/Footer.tsx`.

---

*Built for CS Fabrication · Mumbai, Maharashtra, India*  
*IS 2062 · IS 875 · IS 2629 Compliance*

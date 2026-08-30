# CS Fabrication — Architecture & Deployment Guide

Detailed structural breakdown and step-by-step deployment playbook for engineers new to this project.

---

## Application Architecture

```
                        Browser
                           │
                    React Router v7
                    (client-side SPA)
                           │
              ┌────────────┼────────────┐
              │            │            │
           <App>         Routes      Global State
              │                     (isEnquiryOpen,
        ┌─────┴─────┐               selectedService)
        │           │
    <Navbar>    <Footer>        <EnquiryForm> (drawer)
                                       │
                              fires on CustomEvent
                              'open-enquiry' from any page


  Routes:
  /                → HomePage
  /structures      → StructuresPage
  /gallery         → GalleryPage
  /engineering     → EngineeringPage
  /about           → AboutPage
  /contact         → ContactPage
  /hardware        → redirect /structures
  /projects        → redirect /gallery
  /*               → redirect /
```

---

## Data Flow

```
App.tsx (state owner)
  │
  ├── isEnquiryOpen (boolean)  ──────────────── EnquiryForm [visible/hidden]
  ├── selectedService (string) ──────────────── EnquiryForm [pre-fills project type]
  │
  ├── window.addEventListener('open-enquiry')   ← any component fires this
  │       └── CustomEvent({ detail: 'ServiceName' })
  │
  └── triggerEnquiry(service?) ──────────────── passed as prop onEnquireClick
          └── called by: Navbar, page CTAs, structure cards
```

---

## Component Dependency Map

```
App.tsx
├── ScrollToTop          (no deps)
├── Navbar               (react-router NavLink/Link, lucide Menu/X)
├── Footer               (react-router Link)
├── EnquiryForm          (react, lucide Upload/X)
│
└── Routes →
    ├── HomePage
    │   ├── Hero3D       (three.js)
    │   ├── SectionHeading
    │   └── GallerySection (fullscreen lightbox, category filters)
    │
    ├── StructuresPage
    │   └── SectionHeading
    │
    ├── GalleryPage
    │   └── GallerySection
    │
    ├── EngineeringPage
    │   └── SectionHeading
    │
    ├── AboutPage
    │   └── SectionHeading
    │
    └── ContactPage      (standalone, no shared components)
```

---

## Styling Architecture

```
index.css (loaded globally via main.tsx)
  │
  ├── @import "tailwindcss"           — Tailwind v4 via Vite plugin
  ├── @import Google Fonts (Inter, DM Mono)
  ├── :root { CSS custom properties } — design tokens
  ├── html/body base styles
  ├── scrollbar styles
  ├── typography (text-wrap)
  └── animations (@keyframes fadeUp)

All component styles → Tailwind utility classes (no separate CSS files)
Custom values → inline Tailwind arbitrary values: bg-[#141516] text-[11px]
```

### Design Token Reference

```css
:root {
  --ivory:        #F7F6F1;   /* page background                    */
  --stone:        #EEECE6;   /* card/surface backgrounds           */
  --ink:          #141516;   /* primary text, dark sections        */
  --carbon:       #2C2F32;   /* secondary text, hover              */
  --bronze:       #A88A58;   /* accent — badges, borders, links    */
  --bronze-light: #C4A96E;   /* bronze hover state                 */
  --muted:        #7A7D80;   /* tertiary text, labels              */
}
```

---

## Three.js Hero (Hero3D.tsx)

```
WebGL Renderer (Three.js 0.185)
  │
  ├── PerspectiveCamera (fov 45, near 0.1, far 200)
  ├── AmbientLight + DirectionalLight + SpotLight
  │
  └── C-Channel Assembly Group
      ├── Main Column (BoxGeometry + CylinderGeometry slots)
      ├── Rafter Rail (horizontal beam)
      ├── Purlin Members (crossbeams)
      └── Punch Holes (oval slot geometry)

Animation Loop:
  - requestAnimationFrame
  - Mouse parallax: lerp(current, target, 0.04)
  - "Explore Assembly" button: tweens all members apart (2.2s cubic ease)
  - Auto-reassemble after 3s hold

Canvas:  Full viewport, z-index 0 (behind navbar)
Overlay: HTML layer (z-index 10) for text/buttons
```

---

## State Management

There is **no external state library** (no Redux, Zustand, etc.). State lives in:

| State | Location | Description |
|---|---|---|
| `isEnquiryOpen` | `App.tsx` | Drawer visibility |
| `selectedService` | `App.tsx` | Pre-filled service in drawer |
| `scrolled` | `Navbar.tsx` | Nav transparency toggle |
| `mobileMenuOpen` | `Navbar.tsx` | Mobile drawer open/close |
| `activeStep` | `EngineeringPage.tsx` | Active methodology step |
| `activeTab` | `StructuresPage.tsx` | Active filter pill |
| `selectedPhoto` | `GallerySection.tsx` | Lightbox selected image |
| `filterCategory` | `GallerySection.tsx` | Gallery filter state |

---

## File Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Pages | PascalCase + Page suffix | `StructuresPage.tsx` |
| Components | PascalCase | `GallerySection.tsx` |
| CSS | camelCase | `index.css` |
| Public Assets | snake_case | `steel_structure.jpg` |
| Config files | camelCase | `vite.config.ts` |

---

## Development Workflow

```bash
# Daily development
npm run dev              # start HMR dev server

# Before committing
npx tsc --noEmit         # verify zero TypeScript errors
npm run lint             # run Oxlint static analysis

# Before deploying
npm run build            # full production build
npm run preview          # validate built bundle locally
```

---

## Step-by-Step Deployment

### Step 1 — Verify zero type errors

```bash
npx tsc --noEmit
# Must exit with code 0 (no output)
```

### Step 2 — Run production build

```bash
npm run build
# Creates: dist/index.html, dist/assets/*.js, dist/assets/*.css
# All public/ assets are copied into dist/
```

### Step 3 — Preview the build

```bash
npm run preview
# Opens http://localhost:4173
# Test all 6 routes: / /structures /gallery /engineering /about /contact
# Verify the 3D hero loads, gallery filters work, RFQ drawer opens
```

### Step 4A — Deploy to Netlify (Drag & Drop)

1. Open https://netlify.com → "Add new site" → "Deploy manually"
2. Drag the `dist/` folder into the upload area
3. Create `public/_redirects` with content: `/*  /index.html  200`
   - Rebuild with `npm run build` so it's included in `dist/`
4. Site is live at a Netlify subdomain

### Step 4B — Deploy to Netlify (Git CI/CD)

1. Push code to GitHub/GitLab
2. Netlify → "Add new site" → "Import from Git"
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add `netlify.toml` to project root:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 4C — Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Add `vercel.json` to project root:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
3. Run: `vercel --prod`

### Step 4D — Deploy to Apache / cPanel hosting

1. Run `npm run build`
2. Upload everything inside `dist/` to your `public_html/` via FTP/cPanel
3. Create `.htaccess` in `public_html/`:
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

### Step 4E — Deploy to Nginx VPS

1. Run `npm run build`
2. Copy `dist/` to server: `scp -r dist/ user@server:/var/www/csfabrication/`
3. Configure Nginx site block:
```nginx
server {
    listen 80;
    server_name csfabrication.com www.csfabrication.com;
    root /var/www/csfabrication;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```
4. Reload Nginx: `sudo nginx -s reload`
5. (Optional) Add SSL via Certbot: `sudo certbot --nginx -d csfabrication.com`

---

## Production Checklist

Before going live, verify:

- [ ] `npx tsc --noEmit` exits with code 0
- [ ] `npm run build` completes without errors
- [ ] All 6 routes work in `npm run preview`
- [ ] 3D hero loads (WebGL check)
- [ ] Gallery photos load (check `public/gallery/` is in `dist/`)
- [ ] RFQ drawer opens from navbar "Request Proposal" button
- [ ] Enquiry form submits (alert confirmation fires)
- [ ] Mobile nav drawer opens and closes correctly
- [ ] SPA redirect rule is in place (no 404 on page refresh)
- [ ] Fonts load (Inter + DM Mono from Google Fonts CDN)

---

## Adding Images to the Gallery

Gallery images are defined as an array inside `src/components/GallerySection.tsx`.

To add a new photo:

1. Copy the image file to `public/gallery/your-image.jpg`
2. Open `GallerySection.tsx` and find the `galleryItems` array
3. Add a new object:
```tsx
{
  id: 'unique-id',
  category: 'structures',  // structures | channels | hardware | factory
  src: '/gallery/your-image.jpg',
  alt: 'Descriptive alt text for SEO',
  caption: 'Optional caption shown in lightbox',
  span: 'col',   // 'col' = 1 column, 'row' = spans taller
}
```
4. Save — Vite HMR will hot-reload the gallery instantly in dev

---

*CS Fabrication · Mumbai, India · IS 2062 · IS 875 · IS 2629*

# ☕ Starbucks 3D Animated Café Website

A premium, interactive, and high-performance 3D animated Starbucks landing page built with **Next.js 16**, **Tailwind CSS v4**, **Framer Motion**, and **GSAP/Lenis** for ultra-smooth scroll experiences. 

This project features a fully optimized 90-frame 3D cup rotation sequence synced with scroll progress, complete with a live, dynamic drink configurator and a global shopping cart system.

---

## ✨ Upgraded Features & Interactive Modules

### 🎨 1. "Craft Your Cup" — Interactive Drink Configurator
A bespoke module where users can customize their favorite beverages in real-time with visual indicators:
* **Interactive SVG Cup Visualizer:** Watch the coffee and milk layers dynamically rise and fall using Framer Motion spring physics.
* **Ingredient Adjustments:** Toggle milk options (Whole Milk, Oat, Almond, Coconut), adjust espresso shot counts (up to 4 shots), select premium syrups, and choose sweet toppings (Whipped Cream, Caramel Drizzle, Cinnamon sprinkles).
* **Dynamic Cost Calculator:** Calculates the drink price on the fly based on base sizes (Tall, Grande, Venti) and add-on ingredients.
* **Cart Integration:** Click "Add Custom Cup" to bundle your custom recipe and add it as a unique line item in your order drawer.

### 🛒 2. Global Shopping Cart & Simulated Brewing Checkout
A complete state-managed e-commerce flow utilizing React Context:
* **Cart Drawer UI:** A sleek, glassmorphic side drawer listing item quantities, item descriptions, custom details, and subtotals.
* **Brewing Simulation:** The checkout experience simulates a premium "Brewing your order" loading micro-interaction.
* **Instant Toast Notifications:** Provides animated, responsive visual feedback when adding products to the cart.

### 🎭 3. Scroll-Linked Text Parallax & Centered Aesthetics
* Implemented scroll-linked translations and opacity shifts for the Hero section typography.
* Adjusted elements to a centered text layout to balance visual weight perfectly with the rotating 3D coffee cup canvas in the background.

---

## ⚡ Performance & Core Optimizations

### 🖼️ 1. WebP Sequence Conversion
* Converted the entire 90-frame scroll animation sequence from heavy JPEGs (~4.5MB total) into high-efficiency **WebP** formats.
* Achieved **>66% reduction in total payload** (~1.5MB total) with zero visible loss in image clarity.

### 🚀 2. Progressive Preloading & Rendering Fallback
* Re-architected the canvas preloading engine to download only **key frames** first (rendering the landing page in <1s) while loading background frames asynchronously.
* Built a **nearest-neighbor loaded frame fallback** that prevents visual flickers and guarantees continuous 60fps scrolling even on slower connections.

### 🔤 3. Performance Font Loading (`next/font/google`)
* Migrated Google Font links to Next.js's optimized font loader to avoid Layout Shifts (CLS) and bypass strict CSS `@import` ordering constraints in Turbopack.

---

## 🛠️ Technology Stack

* **Framework:** [Next.js 16](https://nextjs.org/) (Turbopack)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Animations:** [Framer Motion 12](https://motion.dev/), [GSAP](https://gsap.com/)
* **Scroll Physics:** [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
* **Image Processing:** [Sharp](https://sharp.pixelplumbing.com/) (Node.js script utility for frame optimization)
* **State Management:** React Context API

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to experience the website!

### 3. Production Build
To create a production-ready optimized build:
```bash
npm run build
```

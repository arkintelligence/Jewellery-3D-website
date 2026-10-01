# Goldentree Jewels — 3D Website

A cinematic, responsive jewellery showcase for **Goldentree Jewels Limited**. The experience combines React, Three.js, GSAP, and smooth scrolling to present an animated 3D showroom, editorial product collections, customer reviews, appointment actions, store information, and app-download links.

## Features

- Cinematic gold-bullion introduction and animated 3D showroom
- Scroll-driven necklace, ring, earrings, and bangles presentations
- Responsive layouts for desktop, tablet, and mobile
- GSAP animations and Lenis smooth scrolling
- Customer testimonial carousel
- Appointment, WhatsApp, store-location, and social links
- Android and iOS app-download links with QR codes
- Production build prepared for OpenAI Sites hosting

## Built With

- [React 19](https://react.dev/)
- [Vite 6](https://vite.dev/)
- [Three.js](https://threejs.org/)
- [React Three Fiber](https://r3f.docs.pmnd.rs/)
- [GSAP](https://gsap.com/)
- [Lenis](https://lenis.darkroom.engineering/)
- [Tailwind CSS](https://tailwindcss.com/)

## Requirements

Install these before running the project:

- [Node.js](https://nodejs.org/) 18 or newer (Node.js 20 LTS or newer is recommended)
- npm, which is included with Node.js
- A modern browser with WebGL enabled

## Download the Project

### Option 1: Download a ZIP

1. Open the repository page.
2. Select **Code → Download ZIP**.
3. Extract the downloaded ZIP file.
4. Open a terminal in the extracted `3D website` folder.

### Option 2: Clone with Git

```bash
git clone <repository-url>
cd "3D website"
```

Replace `<repository-url>` with this project's Git repository URL.

## Install and Run

Install the dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```
```

## Project Structure

```text
.
├── public/assets/              # Jewellery, branding, and background images
├── scripts/
│   └── prepare-sites-build.mjs # Prepares the Sites-compatible build output
├── src/
│   ├── components/             # Three.js showroom and scene components
│   ├── App.jsx                 # Main page content, interactions, and animation
│   ├── main.jsx                # React application entry point
│   └── styles.css              # Global and responsive styling
├── tests/
│   └── sites-worker.test.mjs   # Hosting worker tests
├── worker/index.js             # Production request handler
├── index.html
├── package.json
└── vite.config.mjs
```

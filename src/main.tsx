import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Initialize Lenis smooth scroll
const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1.2,
    gestureOrientation: 'vertical',
    smoothWheel: true,
});

// Synchronize ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);

function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

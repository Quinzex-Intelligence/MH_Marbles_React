import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Initialize Lenis smooth scroll
const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1.2,
    gestureOrientation: 'vertical',
    smoothWheel: true,
});

function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

createRoot(document.getElementById("root")!).render(<App />);

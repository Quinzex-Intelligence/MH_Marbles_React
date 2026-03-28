import { useEffect } from "react";

export default function HorizontalScrollHandler() {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        window.scrollBy({
          left: e.deltaY,
          behavior: "auto"
        });
        // Prevent default vertical scroll behavior
        if (e.deltaY !== 0) {
          // e.preventDefault(); // Might interfere with touch/pinning, use carefully
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return null;
}

import { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { tiles, Tile } from '@/data/tiles';
import { TileSelector } from './TileSelector';
import { RotateCcw, Maximize2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Lazy load the 3D scene for better initial page load
const Scene = lazy(() => import('./3d/Scene'));

function SceneLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-luxury">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground font-medium">Loading 3D Room...</p>
      </div>
    </div>
  );
}

export function FloorVisualizer() {
  const [selectedTile, setSelectedTile] = useState<Tile | null>(tiles[0]);
  const [isSelectorOpen, setIsSelectorOpen] = useState(true);

  return (
    <section id="visualizer" className="relative min-h-screen bg-gradient-luxury">
      {/* Section Header */}
      <div className="container mx-auto px-4 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-accent font-medium tracking-wider uppercase text-sm">
            Interactive Experience
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mt-3 mb-4">
            3D Floor Visualizer
          </h2>
          <p className="text-muted-foreground text-lg">
            Select different tiles from our collection and watch them transform the room floor in real-time.
            Rotate, zoom, and explore your dream flooring.
          </p>
        </motion.div>
      </div>

      {/* Visualizer Container */}
      <div className="container mx-auto px-4 pb-20">
        <div className="relative bg-card rounded-2xl shadow-luxury overflow-hidden border border-border">
          <div className="flex flex-col lg:flex-row h-[700px] lg:h-[600px]">
            {/* 3D Viewer */}
            <div className="relative flex-1 h-[400px] lg:h-full">
              <Suspense fallback={<SceneLoader />}>
                <Scene selectedTile={selectedTile} />
              </Suspense>

              {/* Overlay Controls */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-background/80 backdrop-blur-sm shadow-soft"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset View
                </Button>
              </div>

              {/* Mobile Toggle Button */}
              <button
                onClick={() => setIsSelectorOpen(!isSelectorOpen)}
                className="lg:hidden absolute bottom-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full shadow-gold font-medium flex items-center gap-2"
              >
                <Maximize2 className="w-4 h-4" />
                {isSelectorOpen ? 'Hide Tiles' : 'Select Tiles'}
              </button>

              {/* Instructions */}
              <div className="absolute bottom-4 left-4 hidden lg:flex items-center gap-2 text-sm text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-2 rounded-full">
                <Info className="w-4 h-4" />
                Drag to rotate • Scroll to zoom • Pinch on mobile
              </div>
            </div>

            {/* Tile Selector Panel */}
            <motion.div
              initial={false}
              animate={{
                width: isSelectorOpen ? '100%' : '0%',
                opacity: isSelectorOpen ? 1 : 0,
              }}
              className={`
                lg:w-[380px] lg:opacity-100 
                ${isSelectorOpen ? 'h-[300px] lg:h-full' : 'h-0 lg:h-full'}
                border-t lg:border-t-0 lg:border-l border-border
                bg-background overflow-hidden
              `}
            >
              <TileSelector
                selectedTile={selectedTile}
                onSelectTile={setSelectedTile}
              />
            </motion.div>
          </div>
        </div>

        {/* CTA Below Visualizer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-muted-foreground mb-4">
            Found your perfect flooring? Let's make it a reality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <a href="tel:+919876543210">Call for Quote</a>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#contact">Visit Showroom</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FloorVisualizer;
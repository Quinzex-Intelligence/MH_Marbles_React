import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tiles, categories, Tile } from '@/data/tiles';
import { cn } from '@/lib/utils';

interface TileSelectorProps {
  selectedTile: Tile | null;
  onSelectTile: (tile: Tile) => void;
}

export function TileSelector({ selectedTile, onSelectTile }: TileSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<string>('marble');

  const filteredTiles = tiles.filter((tile) => tile.category === activeCategory);

  return (
    <div className="flex flex-col h-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 p-4 border-b border-border">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Tiles Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {filteredTiles.map((tile, index) => (
              <motion.div
                key={tile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => onSelectTile(tile)}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 transition-all duration-300 text-left group",
                    selectedTile?.id === tile.id
                      ? "border-accent bg-accent/10 shadow-gold"
                      : "border-border bg-card hover:border-accent/50 hover:shadow-soft"
                  )}
                >
                  {/* Color Swatch */}
                  <div
                    className="w-full h-20 rounded-md mb-3 shadow-inner"
                    style={{ 
                      backgroundColor: tile.textureColor,
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                  
                  {/* Tile Info */}
                  <div className="space-y-1">
                    <h4 className="font-serif font-semibold text-foreground group-hover:text-accent transition-colors">
                      {tile.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {tile.finish} • {tile.color}
                    </p>
                    {tile.price && (
                      <p className="text-sm font-medium text-accent">
                        {tile.price}
                      </p>
                    )}
                  </div>

                  {/* Selection Indicator */}
                  {selectedTile?.id === tile.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Selected Tile Details */}
      <AnimatePresence>
        {selectedTile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-secondary/50 p-4"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-lg shadow-soft"
                style={{ backgroundColor: selectedTile.textureColor }}
              />
              <div className="flex-1">
                <h4 className="font-serif font-semibold">{selectedTile.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedTile.finish} {selectedTile.category}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedTile.usage.map((use) => (
                    <span
                      key={use}
                      className="text-xs bg-background px-2 py-0.5 rounded-full border border-border"
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>
              {selectedTile.price && (
                <div className="text-right">
                  <p className="text-lg font-semibold text-accent">{selectedTile.price}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TileSelector;
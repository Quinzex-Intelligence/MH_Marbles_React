import { useState } from 'react';
import { motion } from 'framer-motion';
import { tiles, categories, colors, usages, Tile } from '@/data/tiles';
import { cn } from '@/lib/utils';
import { Filter, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProductCollection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeUsage, setActiveUsage] = useState<string | null>(null);

  const filteredTiles = tiles.filter((tile) => {
    if (activeCategory && tile.category !== activeCategory) return false;
    if (activeColor && tile.color !== activeColor) return false;
    if (activeUsage && !tile.usage.includes(activeUsage)) return false;
    return true;
  });

  const clearFilters = () => {
    setActiveCategory(null);
    setActiveColor(null);
    setActiveUsage(null);
  };

  return (
    <section id="collection" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-medium tracking-wider uppercase text-sm">
            Our Collection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mt-3 mb-4">
            Premium Flooring Selection
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our curated collection of world-class marble, granite, vitrified tiles, 
            and wooden finishes. Each piece handpicked for exceptional quality.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-foreground">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter By</span>
            </div>
            {(activeCategory || activeColor || activeUsage) && (
              <button
                onClick={clearFilters}
                className="text-sm text-accent hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-accent"
                  )}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            {/* Color Filter */}
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setActiveColor(activeColor === color ? null : color)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                    activeColor === color
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-accent"
                  )}
                >
                  {color}
                </button>
              ))}
            </div>

            {/* Usage Filter */}
            <div className="flex flex-wrap gap-2">
              {usages.map((usage) => (
                <button
                  key={usage}
                  onClick={() => setActiveUsage(activeUsage === usage ? null : usage)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                    activeUsage === usage
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-accent"
                  )}
                >
                  {usage}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTiles.map((tile, index) => (
            <ProductCard key={tile.id} tile={tile} index={index} />
          ))}
        </div>

        {filteredTiles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tiles match your filters.</p>
            <button
              onClick={clearFilters}
              className="text-accent hover:underline mt-2"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="hero-outline" size="xl">
            View Full Catalog
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  tile: Tile;
  index: number;
}

function ProductCard({ tile, index }: ProductCardProps) {
  const categoryInfo = categories.find((c) => c.id === tile.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-luxury transition-all duration-500"
    >
      {/* Image/Color Swatch */}
      <div
        className="h-48 relative overflow-hidden"
        style={{ backgroundColor: tile.textureColor }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
          {categoryInfo?.icon} {categoryInfo?.name}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold group-hover:text-accent transition-colors">
          {tile.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {tile.finish} • {tile.color}
        </p>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {tile.usage.map((use) => (
            <span
              key={use}
              className="text-xs bg-secondary px-2 py-0.5 rounded-full"
            >
              {use}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          {tile.price && (
            <span className="text-lg font-semibold text-accent">{tile.price}</span>
          )}
          <Button variant="ghost" size="sm" className="ml-auto group-hover:text-accent">
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCollection;
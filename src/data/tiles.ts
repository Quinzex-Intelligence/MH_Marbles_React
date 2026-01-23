export interface Tile {
  id: string;
  name: string;
  category: 'marble' | 'granite' | 'vitrified' | 'wooden';
  finish: string;
  color: string;
  usage: string[];
  price?: string;
  textureColor: string; // For 3D rendering
  roughness: number;
  metalness: number;
}

export const tiles: Tile[] = [
  // Marble Collection
  {
    id: 'calacatta-gold',
    name: 'Calacatta Gold',
    category: 'marble',
    finish: 'Polished',
    color: 'White',
    usage: ['Living Room', 'Bedroom'],
    price: '₹450/sq.ft',
    textureColor: '#f5f3ef',
    roughness: 0.1,
    metalness: 0.1,
  },
  {
    id: 'statuario-white',
    name: 'Statuario White',
    category: 'marble',
    finish: 'Polished',
    color: 'White',
    usage: ['Living Room', 'Commercial'],
    price: '₹520/sq.ft',
    textureColor: '#fafafa',
    roughness: 0.05,
    metalness: 0.15,
  },
  {
    id: 'emperador-dark',
    name: 'Emperador Dark',
    category: 'marble',
    finish: 'Honed',
    color: 'Brown',
    usage: ['Living Room', 'Commercial'],
    price: '₹380/sq.ft',
    textureColor: '#4a3728',
    roughness: 0.3,
    metalness: 0.05,
  },
  {
    id: 'nero-marquina',
    name: 'Nero Marquina',
    category: 'marble',
    finish: 'Polished',
    color: 'Black',
    usage: ['Living Room', 'Commercial'],
    price: '₹490/sq.ft',
    textureColor: '#1a1a1a',
    roughness: 0.1,
    metalness: 0.2,
  },
  // Granite Collection
  {
    id: 'black-galaxy',
    name: 'Black Galaxy',
    category: 'granite',
    finish: 'Polished',
    color: 'Black',
    usage: ['Kitchen', 'Commercial'],
    price: '₹320/sq.ft',
    textureColor: '#0d0d0d',
    roughness: 0.15,
    metalness: 0.3,
  },
  {
    id: 'tan-brown',
    name: 'Tan Brown',
    category: 'granite',
    finish: 'Polished',
    color: 'Brown',
    usage: ['Living Room', 'Kitchen'],
    price: '₹280/sq.ft',
    textureColor: '#8b6914',
    roughness: 0.2,
    metalness: 0.1,
  },
  {
    id: 'kashmir-white',
    name: 'Kashmir White',
    category: 'granite',
    finish: 'Polished',
    color: 'White',
    usage: ['Kitchen', 'Bedroom'],
    price: '₹340/sq.ft',
    textureColor: '#e8e4de',
    roughness: 0.15,
    metalness: 0.1,
  },
  // Vitrified Tiles
  {
    id: 'arctic-white',
    name: 'Arctic White',
    category: 'vitrified',
    finish: 'Glossy',
    color: 'White',
    usage: ['Living Room', 'Bedroom'],
    price: '₹95/sq.ft',
    textureColor: '#ffffff',
    roughness: 0.05,
    metalness: 0.4,
  },
  {
    id: 'midnight-grey',
    name: 'Midnight Grey',
    category: 'vitrified',
    finish: 'Matte',
    color: 'Grey',
    usage: ['Living Room', 'Commercial'],
    price: '₹110/sq.ft',
    textureColor: '#4a4a4a',
    roughness: 0.4,
    metalness: 0.05,
  },
  {
    id: 'beige-elegance',
    name: 'Beige Elegance',
    category: 'vitrified',
    finish: 'Satin',
    color: 'Beige',
    usage: ['Bedroom', 'Living Room'],
    price: '₹105/sq.ft',
    textureColor: '#d4c4a8',
    roughness: 0.25,
    metalness: 0.1,
  },
  // Wooden Finish
  {
    id: 'oak-natural',
    name: 'Oak Natural',
    category: 'wooden',
    finish: 'Matte',
    color: 'Brown',
    usage: ['Bedroom', 'Living Room'],
    price: '₹180/sq.ft',
    textureColor: '#c4a77d',
    roughness: 0.5,
    metalness: 0.0,
  },
  {
    id: 'walnut-dark',
    name: 'Walnut Dark',
    category: 'wooden',
    finish: 'Matte',
    color: 'Brown',
    usage: ['Bedroom', 'Living Room'],
    price: '₹195/sq.ft',
    textureColor: '#5c4033',
    roughness: 0.5,
    metalness: 0.0,
  },
];

export const categories = [
  { id: 'marble', name: 'Marble', icon: '💎' },
  { id: 'granite', name: 'Granite', icon: '🪨' },
  { id: 'vitrified', name: 'Vitrified Tiles', icon: '✨' },
  { id: 'wooden', name: 'Wooden Finish', icon: '🌳' },
] as const;

export const colors = ['White', 'Black', 'Brown', 'Grey', 'Beige'] as const;
export const usages = ['Living Room', 'Bedroom', 'Kitchen', 'Commercial'] as const;
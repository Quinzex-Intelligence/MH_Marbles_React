import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const products = [
  {
    name: 'Calacatta Borghini',
    category: 'marble',
    brand: 'Italian Heritage',
    size: '1200x2400 mm',
    finish: 'Polished',
    origin: 'Carrara, Italy',
    description: 'A legendary marble with a creamy white field and bold, honey-gold veining. The apex of Italian luxury.',
    image_url: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?auto=format&fit=crop&q=80&w=1200',
    company: 1, // Assuming company ID 1 exists
    category_id: 1 // Assuming category ID 1 is Marble
  },
  {
    name: 'Nero Marquina Rare',
    category: 'marble',
    brand: 'Marquina Premium',
    size: '800x1600 mm',
    finish: 'Leather',
    origin: 'Spain',
    description: 'Deep obsidian black stone with white fossilized veins. A dramatic architectural statement.',
    image_url: 'https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&q=80&w=1200',
    company: 1,
    category_id: 1
  },
  {
    name: 'Blue Pearl Royal',
    category: 'granite',
    brand: 'Nordic Stone',
    size: '600x1200 mm',
    finish: 'Polished',
    origin: 'Norway',
    description: 'Intense blue-grey granite with large, iridescent feldspar crystals that shimmer like pearls.',
    image_url: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&q=80&w=1200',
    company: 2,
    category_id: 2
  },
  {
    name: 'Invisible Grey',
    category: 'marble',
    brand: 'Carrara Elite',
    size: '1200x2440 mm',
    finish: 'Honed',
    origin: 'Italy',
    description: 'A contemporary marble featuring a light grey background with subtle, nearly invisible white veining.',
    image_url: 'https://images.unsplash.com/photo-1620626011761-9963d7b69a9a?auto=format&fit=crop&q=80&w=1200',
    company: 1,
    category_id: 1
  },
  {
    name: 'Patagonia Quartzite',
    category: 'exotic',
    brand: 'Rare Earth',
    size: '1600x3200 mm',
    finish: 'Polished',
    origin: 'Brazil',
    description: 'A spectacular natural stone with translucent sections and volcanic-like mineral clusters. Highly backlit.',
    image_url: 'https://images.unsplash.com/photo-1590212151175-e58edd96d8f5?auto=format&fit=crop&q=80&w=1200',
    company: 3,
    category_id: 3
  },
  {
    name: 'Rosso Lepanto',
    category: 'marble',
    brand: 'Levantina',
    size: '800x800 mm',
    finish: 'Polished',
    origin: 'Turkey',
    description: 'Deep cherry-red marble with stark white veins, offering a regal and classical atmosphere.',
    image_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
    company: 1,
    category_id: 1
  },
  {
    name: 'Titanium Gold',
    category: 'granite',
    brand: 'Galaxy Stone',
    size: '600x600 mm',
    finish: 'Leather',
    origin: 'Brazil',
    description: 'A dark, swirling granite with metallic gold and ivory waves. Exceptional durability.',
    image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    company: 2,
    category_id: 2
  },
  {
    name: 'Arctic Crystal',
    category: 'vitrified',
    brand: 'Arctic Series',
    size: '1200x1200 mm',
    finish: 'Glossy',
    origin: 'Engineered',
    description: 'Pure white vitrified surface with embedded crystalline flakes for maximum light refraction.',
    image_url: 'https://images.unsplash.com/photo-1516633630673-67bbad747022?auto=format&fit=crop&q=80&w=1200',
    company: 4,
    category_id: 4
  },
  {
    name: 'Walnut Heritage',
    category: 'wooden',
    brand: 'Natural Wood',
    size: '200x1200 mm',
    finish: 'Matte',
    origin: 'Engineered',
    description: 'Hyper-realistic walnut wood grain with deep textures and warm, dark tones.',
    image_url: 'https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?auto=format&fit=crop&q=80&w=1200',
    company: 5,
    category_id: 5
  },
  {
    name: 'Statuario Oro',
    category: 'marble',
    brand: 'Carrara Elite',
    size: '1200x2400 mm',
    finish: 'Polished',
    origin: 'Italy',
    description: 'The most prestigious Statuario variant, featuring broad grey veins with subtle gold outlines.',
    image_url: 'https://images.unsplash.com/photo-1620626011761-9963d7b69a9a?auto=format&fit=crop&q=80&w=1200',
    company: 1,
    category_id: 1
  }
];

async function seed() {
  console.log('Starting product seeding...');
  for (const product of products) {
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('category', String(product.category_id));
      formData.append('company', String(product.company));
      formData.append('size', product.size);
      formData.append('finish', product.finish);
      formData.append('origin', product.origin);
      formData.append('description', product.description);
      formData.append('image_url', product.image_url);

      const response = await axios.post(`${API_BASE}/products/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(`Successfully added: ${product.name}`);
    } catch (error: any) {
      console.error(`Failed to add: ${product.name}`, error.response?.data || error.message);
    }
  }
  console.log('Seeding complete.');
}

seed();

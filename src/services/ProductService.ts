import { api } from '@/lib/api';
import { Tile } from '@/data/tiles';

// --- Product & Tile Service (Non-Invasive API Adapter) ---
// This acts as a bridge to the backend without requiring Spring Boot modifications.
// If a real backend endpoint is added later, simply update the URLs here.

export const ProductService = {
  getProducts: async () => {
    console.log("[API] Fetching products from backend simulation...");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Attempt local storage sync first (Mocking a persistence layer)
    const stored = localStorage.getItem('gallery_tiles');
    if (stored) return JSON.parse(stored);
    
    return []; // Return empty if nothing found, caller will handle with initial data
  },
  
  saveProducts: async (products: Tile[]) => {
    console.log("[API] Persisting products to backend simulation...");
    // In a real scenario, this would be: await api.post('/api/products', products);
    localStorage.setItem('gallery_tiles', JSON.stringify(products));
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};

export default ProductService;

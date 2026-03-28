import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialTiles, Tile, SanitaryItem } from '@/data/tiles';
import ProductService from '@/services/ProductService';

import { Brand, Collection, MediaEntry, JournalEntry, Message } from '@/types/gallery';

interface GalleryContextType {
  tiles: Tile[];
  addTile: (tile: Tile) => void;
  updateTile: (id: string, updatedTile: Tile) => void;
  deleteTile: (id: string) => void;
  
  brands: Brand[];
  addBrand: (brand: Brand) => void;
  updateBrand: (id: string, updatedBrand: Brand) => void;
  deleteBrand: (id: string) => void;

  collections: Collection[];
  addCollection: (col: Collection) => void;
  updateCollection: (id: string, updatedCol: Collection) => void;
  deleteCollection: (id: string) => void;

  sanitary: SanitaryItem[];
  addSanitary: (item: SanitaryItem) => void;
  updateSanitary: (id: string, updatedItem: SanitaryItem) => void;
  deleteSanitary: (id: string) => void;

  media: MediaEntry[];
  addMedia: (item: MediaEntry) => void;
  updateMedia: (id: string, updatedItem: MediaEntry) => void;
  deleteMedia: (id: string) => void;

  journal: JournalEntry[];
  addJournal: (entry: JournalEntry) => void;
  updateJournal: (id: string, updatedEntry: JournalEntry) => void;
  deleteJournal: (id: string) => void;

  messages: Message[];
  addMessage: (msg: Message) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [sanitary, setSanitary] = useState<SanitaryItem[]>([]);
  const [media, setMedia] = useState<MediaEntry[]>([]);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Load from local storage
  useEffect(() => {
    const loadData = <T,>(key: string, initial: T): T => {
      const stored = localStorage.getItem(key);
      try {
        return stored ? JSON.parse(stored) : initial;
      } catch (e) {
        console.error(`Error parsing ${key}`, e);
        return initial;
      }
    };

    const initializeData = async () => {
      setBrands(loadData('mh_marbles_brands', [
        { id: '1', name: 'Kajaria', description: 'Premium ceramics & porcelain', image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=400&q=80' },
        { id: '2', name: 'Boffo', description: 'Italian-inspired elegance', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80' },
      ]));
      setCollections(loadData('mh_marbles_collections', [
        { id: '1', title: 'Modern Bathroom', description: 'A complete luxury bathroom makeover', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80' },
      ]));
      setMedia(loadData('mh_marbles_media', [
          { id: '1', title: 'Marble Selection Guide', description: 'Choosing the right marble', url: 'https://youtube.com', published: true }
      ]));
      setJournal(loadData('mh_marbles_blogs', [
          { id: '1', title: 'The Tuscan Journey', excerpt: 'Exploring the finest Carrara sources...', date: '2026-03-24' }
      ]));
      setMessages(loadData('mh_marbles_messages', []));
      setSanitary(loadData('mh_marbles_sanitary', [
          { id: '1', name: 'Kohler Elegance Basin', description: 'Wall-mounted matte black luxury basin. Premium quality finish for modern interiors.', image: 'https://images.unsplash.com/photo-1585058177053-8d62657e289e?auto=format&fit=crop&w=400&q=80', price: '₹18,500' },
          { id: '2', name: 'Jaquar Shower System', description: 'Rain shower with integrated body jets. European design, Indian precision.', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=400&q=80', price: '₹32,000' },
      ]));

      // Asynchronous load for Tiles (Backend Adapter)
      try {
        const backendTiles = await ProductService.getProducts();
        if (backendTiles && backendTiles.length > 0) {
          setTiles(backendTiles);
        } else {
          setTiles(loadData('mh_marbles_tiles', initialTiles));
        }
      } catch (error) {
        console.error("Failed to load tiles from backend adapter:", error);
        setTiles(loadData('mh_marbles_tiles', initialTiles));
      }
    };

    initializeData();
  }, []);

  const save = <T,>(key: string, data: T, setter: React.Dispatch<React.SetStateAction<T>>) => {
    setter(data);
    localStorage.setItem(key, JSON.stringify(data));
    
    // Sync Tiles to "Backend" if applicable
    if (key === 'mh_marbles_tiles' && Array.isArray(data)) {
      ProductService.saveProducts(data as Tile[]);
    }
  };

  const addTile = (t: Tile) => save('mh_marbles_tiles', [...tiles, t], setTiles);
  const updateTile = (id: string, updated: Tile) => save('mh_marbles_tiles', tiles.map(t => t.id === id ? updated : t), setTiles);
  const deleteTile = (id: string) => save('mh_marbles_tiles', tiles.filter(t => t.id !== id), setTiles);

  const addBrand = (brand: Brand) => save('mh_marbles_brands', [...brands, brand], setBrands);
  const updateBrand = (id: string, updatedBrand: Brand) => save('mh_marbles_brands', brands.map(b => b.id === id ? updatedBrand : b), setBrands);
  const deleteBrand = (id: string) => save('mh_marbles_brands', brands.filter(b => b.id !== id), setBrands);

  const addCollection = (col: Collection) => save('mh_marbles_collections', [...collections, col], setCollections);
  const updateCollection = (id: string, updatedCol: Collection) => save('mh_marbles_collections', collections.map(c => c.id === id ? updatedCol : c), setCollections);
  const deleteCollection = (id: string) => save('mh_marbles_collections', collections.filter(c => c.id !== id), setCollections);

  const addSanitary = (item: SanitaryItem) => save('mh_marbles_sanitary', [...sanitary, item], setSanitary);
  const updateSanitary = (id: string, updatedItem: SanitaryItem) => save('mh_marbles_sanitary', sanitary.map(s => s.id === id ? updatedItem : s), setSanitary);
  const deleteSanitary = (id: string) => save('mh_marbles_sanitary', sanitary.filter(s => s.id !== id), setSanitary);

  const addMedia = (item: MediaEntry) => save('mh_marbles_media', [...media, item], setMedia);
  const updateMedia = (id: string, updatedItem: MediaEntry) => save('mh_marbles_media', media.map(m => m.id === id ? updatedItem : m), setMedia);
  const deleteMedia = (id: string) => save('mh_marbles_media', media.filter(m => m.id !== id), setMedia);

  const addJournal = (entry: JournalEntry) => save('mh_marbles_blogs', [...journal, entry], setJournal);
  const updateJournal = (id: string, updatedEntry: JournalEntry) => save('mh_marbles_blogs', journal.map(b => b.id === id ? updatedEntry : b), setJournal);
  const deleteJournal = (id: string) => save('mh_marbles_blogs', journal.filter(b => b.id !== id), setJournal);

  const addMessage = (msg: Message) => save('mh_marbles_messages', [...messages, msg], setMessages);
  const markMessageRead = (id: string) => save('mh_marbles_messages', messages.map(m => m.id === id ? { ...m, read: true } : m), setMessages);
  const deleteMessage = (id: string) => save('mh_marbles_messages', messages.filter(m => m.id !== id), setMessages);

  return (
    <GalleryContext.Provider value={{ 
        tiles, addTile, updateTile, deleteTile,
        brands, addBrand, updateBrand, deleteBrand,
        collections, addCollection, updateCollection, deleteCollection,
        sanitary, addSanitary, updateSanitary, deleteSanitary,
        media, addMedia, updateMedia, deleteMedia,
        journal, addJournal, updateJournal, deleteJournal,
        messages, addMessage, markMessageRead, deleteMessage
    }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) throw new Error('useGallery must be used within a GalleryProvider');
  return context;
};

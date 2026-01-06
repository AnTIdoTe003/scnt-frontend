export type ProductCategory = "Men" | "Women" | "Unisex";

export interface Product {
  name: string;
  slug: string;
  price: string;
  notes: string;
  intensity: "Low" | "Medium" | "High";
  category: ProductCategory;
  description: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  longevity: string;
  recommendations: Array<{ name: string; slug: string; price: string }>;
  images: string[];
}

// Single source of truth: every slug used in category pages MUST exist here.
export const PRODUCTS: Record<string, Product> = {
  // Men
  "midnight-essence": {
    name: "Midnight Essence",
    slug: "midnight-essence",
    price: "₹89",
    notes: "Woody, Spicy",
    intensity: "High",
    category: "Men",
    description:
      "A bold spicy opening that settles into a smooth, woody dry-down. Designed for nights out and lasting presence.",
    topNotes: ["Black Pepper", "Bergamot", "Ginger"],
    heartNotes: ["Leather", "Incense"],
    baseNotes: ["Sandalwood", "Patchouli", "Musk"],
    longevity: "8–10 hours",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Shadow", slug: "shadow", price: "₹79" },
      { name: "Noir", slug: "noir", price: "₹85" },
      { name: "Obsidian", slug: "obsidian", price: "₹99" },
    ],
  },
  shadow: {
    name: "Shadow",
    slug: "shadow",
    price: "₹79",
    notes: "Woody, Amber",
    intensity: "Medium",
    category: "Men",
    description:
      "A refined woody profile with warm amber depth—clean, confident, and easy to wear from day to night.",
    topNotes: ["Citrus", "Pink Pepper"],
    heartNotes: ["Cedar", "Iris"],
    baseNotes: ["Amber", "Vetiver", "Cedarwood"],
    longevity: "6–8 hours",
    images: [
      "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Midnight Essence", slug: "midnight-essence", price: "₹89" },
      { name: "Twilight", slug: "twilight", price: "₹79" },
      { name: "Noir", slug: "noir", price: "₹85" },
    ],
  },
  obsidian: {
    name: "Obsidian",
    slug: "obsidian",
    price: "₹99",
    notes: "Spicy, Oriental",
    intensity: "High",
    category: "Men",
    description:
      "An intense oriental built around warm spice and a deep, sensual base—commanding and memorable.",
    topNotes: ["Cinnamon", "Cardamom", "Clove"],
    heartNotes: ["Oud", "Amber"],
    baseNotes: ["Sandalwood", "Tonka Bean", "Musk"],
    longevity: "10+ hours",
    images: [
      "https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Venom", slug: "venom", price: "₹99" },
      { name: "Phantom", slug: "phantom", price: "₹89" },
      { name: "Midnight Essence", slug: "midnight-essence", price: "₹89" },
    ],
  },
  noir: {
    name: "Noir",
    slug: "noir",
    price: "₹85",
    notes: "Citrus, Woody",
    intensity: "Medium",
    category: "Men",
    description:
      "Crisp citrus brightness over a smooth woody base. A clean signature that feels sharp and modern.",
    topNotes: ["Grapefruit", "Bergamot"],
    heartNotes: ["Lavender", "Cedar"],
    baseNotes: ["Vetiver", "Amberwood"],
    longevity: "6–8 hours",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Shadow", slug: "shadow", price: "₹79" },
      { name: "Eclipse", slug: "eclipse", price: "₹95" },
      { name: "Twilight", slug: "twilight", price: "₹79" },
    ],
  },
  eclipse: {
    name: "Eclipse",
    slug: "eclipse",
    price: "₹95",
    notes: "Amber, Musk",
    intensity: "High",
    category: "Men",
    description:
      "Warm amber and clean musk with a confident trail—rich, smooth, and built for performance.",
    topNotes: ["Saffron", "Citrus"],
    heartNotes: ["Amber", "Suede"],
    baseNotes: ["Musk", "Woods"],
    longevity: "8–10 hours",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Obsidian", slug: "obsidian", price: "₹99" },
      { name: "Phantom", slug: "phantom", price: "₹89" },
      { name: "Shadow", slug: "shadow", price: "₹79" },
    ],
  },
  twilight: {
    name: "Twilight",
    slug: "twilight",
    price: "₹79",
    notes: "Fresh, Citrus",
    intensity: "Low",
    category: "Men",
    description:
      "Fresh citrus and clean aromatics—light, uplifting, and perfect for everyday wear.",
    topNotes: ["Lemon", "Mandarin"],
    heartNotes: ["Aromatic Herbs", "Neroli"],
    baseNotes: ["Soft Woods", "Musk"],
    longevity: "4–6 hours",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Noir", slug: "noir", price: "₹85" },
      { name: "Shadow", slug: "shadow", price: "₹79" },
      { name: "Catalyst", slug: "catalyst", price: "₹95" },
    ],
  },
  phantom: {
    name: "Phantom",
    slug: "phantom",
    price: "₹89",
    notes: "Leather, Tobacco",
    intensity: "High",
    category: "Men",
    description:
      "Smoky leather and warm tobacco with a refined sweetness—bold, luxe, and unmistakable.",
    topNotes: ["Spice", "Bergamot"],
    heartNotes: ["Leather", "Tobacco Leaf"],
    baseNotes: ["Vanilla", "Woods", "Amber"],
    longevity: "8–10 hours",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Obsidian", slug: "obsidian", price: "₹99" },
      { name: "Eclipse", slug: "eclipse", price: "₹95" },
      { name: "Venom", slug: "venom", price: "₹99" },
    ],
  },
  venom: {
    name: "Venom",
    slug: "venom",
    price: "₹99",
    notes: "Spicy, Animalic",
    intensity: "High",
    category: "Men",
    description:
      "A spicy, intense profile with a daring edge—made for statement nights and confident entrances.",
    topNotes: ["Pepper", "Cardamom"],
    heartNotes: ["Resins", "Leather Accord"],
    baseNotes: ["Amber", "Musk", "Woods"],
    longevity: "10+ hours",
    images: [
      "https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Obsidian", slug: "obsidian", price: "₹99" },
      { name: "Phantom", slug: "phantom", price: "₹89" },
      { name: "Midnight Essence", slug: "midnight-essence", price: "₹89" },
    ],
  },

  // Women
  "night-bloom": {
    name: "Night Bloom",
    slug: "night-bloom",
    price: "₹95",
    notes: "Floral, Citrus",
    intensity: "Medium",
    category: "Women",
    description:
      "A bright citrus opening that melts into a sensual floral heart—elegant, radiant, and modern.",
    topNotes: ["Lemon", "Bergamot", "Neroli"],
    heartNotes: ["Gardenia", "Tuberose", "Jasmine"],
    baseNotes: ["Amber", "Musk", "Sandalwood"],
    longevity: "6–8 hours",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Velvet Rose", slug: "velvet-rose", price: "₹89" },
      { name: "Dusk", slug: "dusk", price: "₹99" },
      { name: "Whisper", slug: "whisper", price: "₹79" },
    ],
  },
  "velvet-rose": {
    name: "Velvet Rose",
    slug: "velvet-rose",
    price: "₹89",
    notes: "Floral, Woody",
    intensity: "High",
    category: "Women",
    description:
      "A plush rose wrapped in creamy woods—romantic, confident, and designed to linger.",
    topNotes: ["Rose Petals", "Pink Pepper"],
    heartNotes: ["Jasmine", "Peony"],
    baseNotes: ["Cedar", "Amber", "Musk"],
    longevity: "8–10 hours",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Night Bloom", slug: "night-bloom", price: "₹95" },
      { name: "Seduction", slug: "seduction", price: "₹95" },
      { name: "Passion", slug: "passion", price: "₹99" },
    ],
  },
  moonlight: {
    name: "Moonlight",
    slug: "moonlight",
    price: "₹79",
    notes: "Fresh, Floral",
    intensity: "Low",
    category: "Women",
    description:
      "Soft florals with a fresh, airy opening—light, clean, and effortless.",
    topNotes: ["Pear", "Citrus"],
    heartNotes: ["White Florals", "Lily"],
    baseNotes: ["Musk", "Soft Woods"],
    longevity: "4–6 hours",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Whisper", slug: "whisper", price: "₹79" },
      { name: "Night Bloom", slug: "night-bloom", price: "₹95" },
      { name: "Enchant", slug: "enchant", price: "₹85" },
    ],
  },
  dusk: {
    name: "Dusk",
    slug: "dusk",
    price: "₹99",
    notes: "Amber, Musk",
    intensity: "High",
    category: "Women",
    description:
      "Warm amber and modern musk with a smooth finish—sensual, polished, and powerful.",
    topNotes: ["Bergamot", "Saffron"],
    heartNotes: ["Amber", "Floral Accord"],
    baseNotes: ["Musk", "Woods"],
    longevity: "8–10 hours",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Velvet Rose", slug: "velvet-rose", price: "₹89" },
      { name: "Seduction", slug: "seduction", price: "₹95" },
      { name: "Passion", slug: "passion", price: "₹99" },
    ],
  },
  enchant: {
    name: "Enchant",
    slug: "enchant",
    price: "₹85",
    notes: "Oriental, Vanilla",
    intensity: "Medium",
    category: "Women",
    description:
      "Creamy vanilla with warm oriental depth—comforting, elegant, and addictive.",
    topNotes: ["Bergamot", "Spice"],
    heartNotes: ["Vanilla", "Amber"],
    baseNotes: ["Woods", "Musk"],
    longevity: "6–8 hours",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Dusk", slug: "dusk", price: "₹99" },
      { name: "Moonlight", slug: "moonlight", price: "₹79" },
      { name: "Whisper", slug: "whisper", price: "₹79" },
    ],
  },
  whisper: {
    name: "Whisper",
    slug: "whisper",
    price: "₹79",
    notes: "Citrus, Musky",
    intensity: "Low",
    category: "Women",
    description: "A clean citrus-musk skin scent—minimal, soft, and intimate.",
    topNotes: ["Mandarin", "Bergamot"],
    heartNotes: ["Soft Florals", "Tea"],
    baseNotes: ["Musk", "Amberwood"],
    longevity: "4–6 hours",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Moonlight", slug: "moonlight", price: "₹79" },
      { name: "Night Bloom", slug: "night-bloom", price: "₹95" },
      { name: "Ethereal", slug: "ethereal", price: "₹89" },
    ],
  },
  seduction: {
    name: "Seduction",
    slug: "seduction",
    price: "₹95",
    notes: "Floral, Spicy",
    intensity: "High",
    category: "Women",
    description:
      "Spiced florals with a warm base—confident, daring, and built for nights out.",
    topNotes: ["Pink Pepper", "Citrus"],
    heartNotes: ["Jasmine", "Tuberose"],
    baseNotes: ["Amber", "Musk", "Woods"],
    longevity: "8–10 hours",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Velvet Rose", slug: "velvet-rose", price: "₹89" },
      { name: "Dusk", slug: "dusk", price: "₹99" },
      { name: "Passion", slug: "passion", price: "₹99" },
    ],
  },
  passion: {
    name: "Passion",
    slug: "passion",
    price: "₹99",
    notes: "Oriental, Floral",
    intensity: "High",
    category: "Women",
    description:
      "A rich floral core with oriental warmth—luxe, intense, and unforgettable.",
    topNotes: ["Saffron", "Bergamot"],
    heartNotes: ["Rose", "Jasmine"],
    baseNotes: ["Amber", "Vanilla", "Woods"],
    longevity: "10+ hours",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Seduction", slug: "seduction", price: "₹95" },
      { name: "Dusk", slug: "dusk", price: "₹99" },
      { name: "Velvet Rose", slug: "velvet-rose", price: "₹89" },
    ],
  },

  // Unisex
  ethereal: {
    name: "Ethereal",
    slug: "ethereal",
    price: "₹89",
    notes: "Fresh, Citrus",
    intensity: "Low",
    category: "Unisex",
    description:
      "Fresh citrus and airy softness—clean, bright, and easy to wear every day.",
    topNotes: ["Grapefruit", "Lemon", "Mandarin"],
    heartNotes: ["Peony", "White Tea"],
    baseNotes: ["Musk", "Soft Woods"],
    longevity: "4–6 hours",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Mirage", slug: "mirage", price: "₹85" },
      { name: "Awakening", slug: "awakening", price: "₹99" },
      { name: "Whisper", slug: "whisper", price: "₹79" },
    ],
  },
  sanctuary: {
    name: "Sanctuary",
    slug: "sanctuary",
    price: "₹95",
    notes: "Woody, Amber",
    intensity: "Medium",
    category: "Unisex",
    description:
      "Comforting woods with a warm amber glow—smooth, grounded, and versatile.",
    topNotes: ["Bergamot", "Spice"],
    heartNotes: ["Cedar", "Amber"],
    baseNotes: ["Musk", "Woods"],
    longevity: "6–8 hours",
    images: [
      "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Equilibrium", slug: "equilibrium", price: "₹89" },
      { name: "Reverie", slug: "reverie", price: "₹99" },
      { name: "Mirage", slug: "mirage", price: "₹85" },
    ],
  },
  solitude: {
    name: "Solitude",
    slug: "solitude",
    price: "₹79",
    notes: "Floral, Woody",
    intensity: "Medium",
    category: "Unisex",
    description:
      "A clean floral heart balanced by woods—calm, minimal, and modern.",
    topNotes: ["Citrus", "Aldehydes"],
    heartNotes: ["Iris", "White Florals"],
    baseNotes: ["Cedar", "Musk"],
    longevity: "6–8 hours",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Ethereal", slug: "ethereal", price: "₹89" },
      { name: "Mirage", slug: "mirage", price: "₹85" },
      { name: "Awakening", slug: "awakening", price: "₹99" },
    ],
  },
  reverie: {
    name: "Reverie",
    slug: "reverie",
    price: "₹99",
    notes: "Amber, Musk",
    intensity: "High",
    category: "Unisex",
    description:
      "A warm amber-musk signature with a luxurious trail—smooth, rich, and long-lasting.",
    topNotes: ["Saffron", "Citrus"],
    heartNotes: ["Amber", "Resins"],
    baseNotes: ["Musk", "Woods"],
    longevity: "8–10 hours",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Sanctuary", slug: "sanctuary", price: "₹95" },
      { name: "Catalyst", slug: "catalyst", price: "₹95" },
      { name: "Equilibrium", slug: "equilibrium", price: "₹89" },
    ],
  },
  mirage: {
    name: "Mirage",
    slug: "mirage",
    price: "₹85",
    notes: "Citrus, Fresh",
    intensity: "Low",
    category: "Unisex",
    description:
      "Bright citrus freshness with a clean base—easy, crisp, and uplifting.",
    topNotes: ["Lemon", "Mandarin"],
    heartNotes: ["Neroli", "Tea"],
    baseNotes: ["Musk", "Soft Woods"],
    longevity: "4–6 hours",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Ethereal", slug: "ethereal", price: "₹89" },
      { name: "Awakening", slug: "awakening", price: "₹99" },
      { name: "Solitude", slug: "solitude", price: "₹79" },
    ],
  },
  equilibrium: {
    name: "Equilibrium",
    slug: "equilibrium",
    price: "₹89",
    notes: "Woody, Spicy",
    intensity: "Medium",
    category: "Unisex",
    description:
      "Spiced woods with a clean, balanced finish—versatile for workdays and weekends.",
    topNotes: ["Pepper", "Bergamot"],
    heartNotes: ["Cedar", "Aromatic Herbs"],
    baseNotes: ["Amberwood", "Musk"],
    longevity: "6–8 hours",
    images: [
      "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Sanctuary", slug: "sanctuary", price: "₹95" },
      { name: "Catalyst", slug: "catalyst", price: "₹95" },
      { name: "Reverie", slug: "reverie", price: "₹99" },
    ],
  },
  catalyst: {
    name: "Catalyst",
    slug: "catalyst",
    price: "₹95",
    notes: "Citrus, Spicy",
    intensity: "High",
    category: "Unisex",
    description:
      "Sparkling citrus with modern spice and a strong base—high energy and long-lasting.",
    topNotes: ["Grapefruit", "Pepper"],
    heartNotes: ["Ginger", "Aromatic Herbs"],
    baseNotes: ["Woods", "Musk"],
    longevity: "8–10 hours",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Reverie", slug: "reverie", price: "₹99" },
      { name: "Equilibrium", slug: "equilibrium", price: "₹89" },
      { name: "Noir", slug: "noir", price: "₹85" },
    ],
  },
  awakening: {
    name: "Awakening",
    slug: "awakening",
    price: "₹99",
    notes: "Fresh, Floral",
    intensity: "Medium",
    category: "Unisex",
    description:
      "Fresh florals over a clean musk base—bright, modern, and effortless.",
    topNotes: ["Citrus", "Green Notes"],
    heartNotes: ["White Florals", "Peony"],
    baseNotes: ["Musk", "Soft Woods"],
    longevity: "6–8 hours",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
    ],
    recommendations: [
      { name: "Ethereal", slug: "ethereal", price: "₹89" },
      { name: "Mirage", slug: "mirage", price: "₹85" },
      { name: "Solitude", slug: "solitude", price: "₹79" },
    ],
  },
};

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS[slug];
}

export function getAllProducts(): Product[] {
  return Object.values(PRODUCTS);
}

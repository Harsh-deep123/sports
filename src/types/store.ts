export type ProductCategory = 'Footwear' | 'Outerwear' | 'Compression' | 'Packs';

export type ScreenView = 'storefront' | 'product' | 'specs' | 'checkout';

export type VisualAngle = 'profile' | 'chassis' | 'cutaway';

export interface Colorway {
  id: string;
  name: string;
  primaryHex: string;
  accentHex: string;
  soleHex: string;
}

export interface ProductSize {
  label: string;
  inStock: boolean;
}

export interface SpecEntry {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  discipline: 'Marathon' | 'Track' | 'Trail' | 'Recovery';
  price: number;
  compareAtPrice?: number;
  weightGrams: number;
  statusNote?: 'New Release' | 'Bestseller' | 'Limited Run';
  availabilityText: string;
  shortDescription: string;
  colorways: Colorway[];
  sizes: ProductSize[];
  specs: SpecEntry[];
  materialsDetail: string;
  careDetail: string;
  fitNotes: string;
}

export interface CartItem {
  key: string;
  product: Product;
  colorway: Colorway;
  size: string;
  quantity: number;
}

export interface OrderReceipt {
  orderNumber: string;
  placedAt: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  paymentMethod: 'Card' | 'Cash on Delivery';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
}

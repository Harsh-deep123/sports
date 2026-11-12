import { Product } from '../types/store';

export const PRODUCTS: Product[] = [
  {
    id: 'kp-aero-v4',
    slug: 'aero-carbon-v4',
    name: 'Aero-Carbon V4 Racer',
    category: 'Footwear',
    discipline: 'Marathon',
    price: 265,
    weightGrams: 198,
    statusNote: 'New Release',
    availabilityText: 'In Stock · Ships in 24h',
    shortDescription:
      'Dual-density nitrogen PEBAX chassis paired with a split-fork full-length carbon fiber propulsion plate for marathon pace stability.',
    colorways: [
      {
        id: 'impulse-orange',
        name: 'Impulse Orange / Obsidian',
        primaryHex: '#111418',
        accentHex: '#FF5500',
        soleHex: '#F1F3F5',
      },
      {
        id: 'chalk-carbon',
        name: 'Chalk White / Signal',
        primaryHex: '#E2E8F0',
        accentHex: '#FF5500',
        soleHex: '#111418',
      },
      {
        id: 'emerald-stealth',
        name: 'Obsidian / Kinetic Emerald',
        primaryHex: '#1E232A',
        accentHex: '#10B981',
        soleHex: '#E2E8F0',
      },
    ],
    sizes: [
      { label: 'US 7', inStock: true },
      { label: 'US 8', inStock: true },
      { label: 'US 8.5', inStock: true },
      { label: 'US 9', inStock: true },
      { label: 'US 9.5', inStock: true },
      { label: 'US 10', inStock: true },
      { label: 'US 10.5', inStock: false },
      { label: 'US 11', inStock: true },
      { label: 'US 12', inStock: true },
    ],
    specs: [
      { label: 'Chassis Mass', value: '198 g (Men US 9)' },
      { label: 'Stack Height', value: '39.5 mm Heel / 31.5 mm Forefoot' },
      { label: 'Heel-to-Toe Drop', value: '8.0 mm' },
      { label: 'Propulsion Core', value: '1.2 mm Split Carbon-Epoxy Plate' },
      { label: 'Midsole Foam', value: 'Supercritical PEBAX · 84% Return' },
      { label: 'Upper Matrix', value: 'Monofilament Vapor-Weave Mesh' },
    ],
    materialsDetail:
      'Constructed with a 42% bio-derived PEBAX supercritical midsole, unidirectional T700 carbon fiber plate, and 1.4 mm micro-lug high-abrasion rubber outsole.',
    careDetail:
      'Wipe outsole with cool water after wet road sessions. Air dry away from direct thermal vents to preserve midsole nitrogen cell rebound. Covered by 500 km structural delamination warranty.',
    fitNotes:
      'True-to-size race last with contoured midfoot lock and anatomical forefoot splay room for late-marathon swelling.',
  },
  {
    id: 'kp-apex-spike',
    slug: 'apex-track-spike',
    name: 'Apex 10K Track Spike',
    category: 'Footwear',
    discipline: 'Track',
    price: 210,
    weightGrams: 138,
    statusNote: 'Limited Run',
    availabilityText: 'In Stock · Ships in 24h',
    shortDescription:
      'World Athletics compliant sub-20 mm stack distance spike engineered for 5,000 m and 10,000 m track intervals.',
    colorways: [
      {
        id: 'track-flame',
        name: 'Signal Orange / Slate',
        primaryHex: '#FF5500',
        accentHex: '#111418',
        soleHex: '#F8F9FA',
      },
      {
        id: 'slate-pro',
        name: 'Obsidian / Chalk',
        primaryHex: '#111418',
        accentHex: '#64748B',
        soleHex: '#FFFFFF',
      },
    ],
    sizes: [
      { label: 'US 7', inStock: true },
      { label: 'US 8', inStock: true },
      { label: 'US 9', inStock: true },
      { label: 'US 9.5', inStock: false },
      { label: 'US 10', inStock: true },
      { label: 'US 11', inStock: true },
    ],
    specs: [
      { label: 'Chassis Mass', value: '138 g (Men US 9)' },
      { label: 'Stack Height', value: '19.5 mm WA Compliant' },
      { label: 'Heel-to-Toe Drop', value: '4.0 mm' },
      { label: 'Spike Configuration', value: '6-Pin Titanium Alloy Receptacles' },
      { label: 'Midsole Foam', value: 'High-Density Nitrogen Pebax' },
      { label: 'Upper Matrix', value: 'Zero-Stretch Dyneema Ripstop' },
    ],
    materialsDetail:
      'Dyneema-reinforced upper filaments resist lateral stretch through tight track bends, anchored over a 6-pin removable titanium spike plate.',
    careDetail:
      'Remove and dry spike pins after wet track workouts. Includes 12 ceramic-coated 6 mm pyramid pins and torque wrench.',
    fitNotes:
      'Snug competition fit. Athletes between half sizes seeking toe clearance should size up 0.5.',
  },
  {
    id: 'kp-storm-shell',
    slug: 'kinetic-storm-shell',
    name: 'Kinetic 3L Storm Anorak',
    category: 'Outerwear',
    discipline: 'Trail',
    price: 295,
    compareAtPrice: 340,
    weightGrams: 164,
    statusNote: 'Bestseller',
    availabilityText: 'In Stock · Ships in 24h',
    shortDescription:
      'Ultralight 3-layer electrospun waterproof membrane built to withstand alpine headwinds without trapping internal sweat vapor.',
    colorways: [
      {
        id: 'obsidian-signal',
        name: 'Deep Obsidian / Orange Seam',
        primaryHex: '#111418',
        accentHex: '#FF5500',
        soleHex: '#334155',
      },
      {
        id: 'chalk-storm',
        name: 'Glacier White / Obsidian',
        primaryHex: '#F1F3F5',
        accentHex: '#111418',
        soleHex: '#CBD5E1',
      },
    ],
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: false },
    ],
    specs: [
      { label: 'Garment Mass', value: '164 g (Size M)' },
      { label: 'Hydrostatic Head', value: '28,000 mm Waterproof' },
      { label: 'Breathability', value: '35,000 g/m²/24h MVTR' },
      { label: 'Seam Construction', value: '8 mm Micro-Taped Ultrasonic' },
      { label: 'Pack Volume', value: 'Stows into Internal Chest Pocket' },
      { label: 'Reflectivity', value: '360° 3M Glass-Bead Laminate' },
    ],
    materialsDetail:
      '7-denier Japanese nylon face fabric bonded to a hydrophobic electrospun polyurethane membrane with PFC-free durable water repellent.',
    careDetail:
      'Machine wash cold with technical wash detergent. Tumble dry low 15 minutes to reactivate DWR surface tension.',
    fitNotes:
      'Articulated shoulder gussets fit cleanly over a 5 L hydration vest without hem lift.',
  },
  {
    id: 'kp-aero-wind-vest',
    slug: 'aero-tempo-vest',
    name: 'Aero-Knit Tempo Gilet',
    category: 'Outerwear',
    discipline: 'Marathon',
    price: 155,
    weightGrams: 92,
    availabilityText: 'In Stock · Ships in 24h',
    shortDescription:
      'Wind-blocking chest shield with laser-perforated dorsal ventilation zone for crisp dawn tempo blocks.',
    colorways: [
      {
        id: 'slate-impulse',
        name: 'Technical Slate / Impulse',
        primaryHex: '#334155',
        accentHex: '#FF5500',
        soleHex: '#111418',
      },
      {
        id: 'obsidian-mono',
        name: 'Obsidian Monochrome',
        primaryHex: '#111418',
        accentHex: '#64748B',
        soleHex: '#E2E8F0',
      },
    ],
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
    ],
    specs: [
      { label: 'Garment Mass', value: '92 g (Size M)' },
      { label: 'Front Panel', value: '0 CFM Wind-Stopper Ripstop' },
      { label: 'Back Panel', value: 'Laser-Perforated Mesh Grid' },
      { label: 'Zipper Hardware', value: 'YKK Two-Way Locking Cam' },
      { label: 'Gel Storage', value: '2 Dual-Entry Lumbar Sleeves' },
    ],
    materialsDetail:
      '100% recycled micro-ripstop chest barrier paired with four-way stretch open-cell polyamide dorsal venting.',
    careDetail:
      'Gentle cold wash. Hang dry; never iron laminated reflective seam lines.',
    fitNotes:
      'Aerodynamic race cut eliminates fabric flutter above 18 km/h pace.',
  },
  {
    id: 'kp-compress-half',
    slug: 'quad-lock-half-tight',
    name: 'Quad-Lock Carbon Half Tight',
    category: 'Compression',
    discipline: 'Track',
    price: 135,
    weightGrams: 118,
    statusNote: 'Bestseller',
    availabilityText: 'In Stock · Ships in 24h',
    shortDescription:
      'Graduated 22 mmHg woven compression architecture with bounce-free gel holsters for sustained threshold runs.',
    colorways: [
      {
        id: 'obsidian-emerald',
        name: 'Obsidian / Emerald Seam',
        primaryHex: '#111418',
        accentHex: '#10B981',
        soleHex: '#1E232A',
      },
      {
        id: 'obsidian-orange',
        name: 'Obsidian / Impulse Seam',
        primaryHex: '#111418',
        accentHex: '#FF5500',
        soleHex: '#334155',
      },
    ],
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
    ],
    specs: [
      { label: 'Garment Mass', value: '118 g (Size M)' },
      { label: 'Compression Grade', value: '22 mmHg Graduated Warp Knit' },
      { label: 'Inseam Length', value: '23 cm (9 in)' },
      { label: 'Storage Capacity', value: '4 Side Gel Loops + Phone Sleeve' },
      { label: 'Seam Architecture', value: 'Flatlock Anti-Chafe Bonded Hem' },
    ],
    materialsDetail:
      'Italian warp-knit polyamide-elastane textile (68% PA / 32% EA) providing high modulus recovery without transparency at full stretch.',
    careDetail:
      'Rinse after salt-heavy marathon efforts. Cold wash without fabric softeners.',
    fitNotes:
      'High-compression athletic fit; raw-cut silicone-free thigh grippers prevent ride-up.',
  },
  {
    id: 'kp-alpine-pack',
    slug: 'trail-chassis-8l-pack',
    name: 'Trail Chassis 8L Vest',
    category: 'Packs',
    discipline: 'Trail',
    price: 185,
    weightGrams: 175,
    statusNote: 'New Release',
    availabilityText: 'In Stock · Ships in 24h',
    shortDescription:
      'Zero-bounce ergonomic endurance vest with dual 500 ml soft-flask holsters and carbon-rod trekking pole quivers.',
    colorways: [
      {
        id: 'chalk-orange',
        name: 'Chalk Slate / Signal Orange',
        primaryHex: '#E2E8F0',
        accentHex: '#FF5500',
        soleHex: '#111418',
      },
      {
        id: 'obsidian-pack',
        name: 'Obsidian / Slate',
        primaryHex: '#111418',
        accentHex: '#64748B',
        soleHex: '#E2E8F0',
      },
    ],
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
    ],
    specs: [
      { label: 'Vest Mass', value: '175 g (Excluding Flasks)' },
      { label: 'Total Volume', value: '8.0 Liters (11 Compartments)' },
      { label: 'Hydration Included', value: '2 × 500 ml High-Flow Soft Flasks' },
      { label: 'Sternum Rig', value: 'Micro-Ratchet Elastic Cord Lock' },
      { label: 'Back Structure', value: '3D Hex-Mesh Sweat Channel' },
    ],
    materialsDetail:
      'UHMWPE grid-stop main body resists granite abrasion while hydrophobic 3D monomesh prevents water retention.',
    careDetail:
      'Hand wash cold and air dry. Soft flasks are top-rack dishwasher safe and BPA-free.',
    fitNotes:
      'Wrap-around torso sizing: S (84–94 cm chest), M (94–104 cm), L (104–114 cm).',
  },
];

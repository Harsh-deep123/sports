import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../types/store';
import { ProductVisual } from './ProductVisual';

interface EngineeringParallaxBandProps {
  heroProduct: Product;
  onInspectProduct: (product: Product) => void;
  onOpenCompare: () => void;
}

interface ChassisLayer {
  id: string;
  index: string;
  title: string;
  summary: string;
  angle: 'cutaway' | 'chassis' | 'profile';
  metrics: { label: string; value: string }[];
}

const CHASSIS_LAYERS: ChassisLayer[] = [
  {
    id: 'carbon-plate',
    index: '01',
    title: 'Split-Fork T700 Carbon Plate',
    summary:
      'Dual independent forefoot forks decouple medial and lateral toe-off on cambered turns while maintaining torsional snap through midstance.',
    angle: 'cutaway',
    metrics: [
      { label: 'Flexural Modulus', value: '128 GPa' },
      { label: 'Plate Thickness', value: '1.20 mm' },
      { label: 'Forefoot Fork Split', value: '38 mm' },
    ],
  },
  {
    id: 'pebax-core',
    index: '02',
    title: 'Supercritical Nitrogen PEBAX',
    summary:
      'Micro-cellular closed-pore elastomer expanded with pure nitrogen gas preserves rebound consistency across temperatures from 2°C to 38°C.',
    angle: 'chassis',
    metrics: [
      { label: 'Energy Return', value: '84.2%' },
      { label: 'Foam Density', value: '0.11 g/cm³' },
      { label: 'Compression Retention', value: '500+ km' },
    ],
  },
  {
    id: 'vapor-upper',
    index: '03',
    title: 'Monofilament Vapor-Weave Upper',
    summary:
      'Hydrophobic single-layer yarns shed road spray instantly, holding zero water weight during wet marathon conditions while locking down the heel.',
    angle: 'profile',
    metrics: [
      { label: 'Moisture Absorption', value: '< 1.2%' },
      { label: 'Air Permeability', value: '420 CFM' },
      { label: 'Upper Mass', value: '34 g' },
    ],
  },
];

export const EngineeringParallaxBand: React.FC<EngineeringParallaxBandProps> = ({
  heroProduct,
  onInspectProduct,
  onOpenCompare,
}) => {
  const bandRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeLayerIdx, setActiveLayerIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ['start end', 'end start'],
  });

  const horizontalTrackX = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : -80, prefersReducedMotion ? 0 : 80]
  );
  const visualParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 36, prefersReducedMotion ? 0 : -36]
  );

  const activeLayer = CHASSIS_LAYERS[activeLayerIdx];

  return (
    <section
      ref={bandRef}
      className="relative overflow-hidden bg-[#111418] text-white py-20 lg:py-28"
    >
      {/* Parallax Aerodynamic Grid & Horizon Track */}
      <motion.div
        style={{ x: horizontalTrackX }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-12 opacity-20"
      >
        <svg viewBox="0 0 1440 240" className="w-full h-40" preserveAspectRatio="none">
          <g stroke="#64748B" strokeWidth="1" fill="none">
            <path d="M-120 40 H1560" />
            <path d="M-120 90 H1560" strokeDasharray="8 12" />
            <path d="M-120 140 H1560" stroke="#FF5500" strokeOpacity="0.65" />
            <path d="M-120 190 H1560" />
          </g>
        </svg>
      </motion.div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.08em] text-[#FF5500] mb-2">
              Chassis Engineering Breakdown
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.02em] text-white text-balance max-w-2xl">
              Three Interlocking Layers Built for Race Day Economy
            </h2>
          </div>

          <button
            type="button"
            onClick={onOpenCompare}
            className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-lg border border-white/25 text-white hover:bg-white/10 font-display text-sm font-bold uppercase tracking-[0.06em] transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto cursor-pointer"
          >
            <span>Open Spec Matrix</span>
            <ArrowUpRight className="w-4 h-4 text-[#FF5500]" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Interactive Layer Selector Column */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {CHASSIS_LAYERS.map((layer, idx) => {
              const selected = idx === activeLayerIdx;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveLayerIdx(idx)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-150 cursor-pointer ${
                    selected
                      ? 'bg-white/10 border-[#FF5500]'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-lg font-bold text-[#FF5500] tabular-nums">
                      {layer.index}.
                    </span>
                    <span className="font-display text-2xl font-bold uppercase tracking-[0.02em] text-white">
                      {layer.title}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {layer.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Parallax Interactive Cutaway Stage */}
          <motion.div
            style={{ y: visualParallaxY }}
            className="lg:col-span-7 rounded-2xl bg-[#1A1F26] border border-white/10 p-6 sm:p-10"
          >
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#FF5500]">
                  Active Inspection Layer · {activeLayer.index}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white mt-0.5">
                  {activeLayer.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => onInspectProduct(heroProduct)}
                className="px-4 py-2 rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white font-display text-sm font-bold uppercase tracking-[0.06em] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Inspect Shoe
              </button>
            </div>

            <div className="py-8 flex items-center justify-center">
              <ProductVisual
                product={heroProduct}
                colorway={heroProduct.colorways[0]}
                angle={activeLayer.angle}
                className="max-h-[250px]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              {activeLayer.metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{metric.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

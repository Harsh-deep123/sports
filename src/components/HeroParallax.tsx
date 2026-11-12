import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Layers } from 'lucide-react';
import { Product, VisualAngle } from '../types/store';
import { ProductVisual } from './ProductVisual';

interface HeroParallaxProps {
  featuredProduct: Product;
  onSelectProduct: (product: Product) => void;
  onExploreCollection: () => void;
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({
  featuredProduct,
  onSelectProduct,
  onExploreCollection,
}) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [angle, setAngle] = useState<VisualAngle>('profile');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    mass: 0.4,
  });

  const bgY = useTransform(smoothProgress, [0, 1], [0, prefersReducedMotion ? 0 : 90]);
  const stageY = useTransform(smoothProgress, [0, 1], [0, prefersReducedMotion ? 0 : -48]);
  const copyY = useTransform(smoothProgress, [0, 1], [0, prefersReducedMotion ? 0 : 32]);
  const trackShiftX = useTransform(smoothProgress, [0, 1], [0, prefersReducedMotion ? 0 : -64]);

  const activeColorway = featuredProduct.colorways[selectedColorIdx] ?? featuredProduct.colorways[0];

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: ny * -5, y: nx * 7 });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const proofMetrics = [
    { value: '198 g', label: 'Carbon Chassis Mass (US 9)' },
    { value: '84%', label: 'Supercritical PEBAX Return' },
    { value: '39.5 mm', label: 'Legal Race Stack Height' },
    { value: '30 Days', label: 'Unconditional Field Trial' },
  ];

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-white border-b border-[#E2E8F0]"
    >
      {/* Parallax Background Track-Lane Geometry */}
      <motion.div
        style={{ y: bgY, x: trackShiftX }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 720"
          preserveAspectRatio="xMidYMid slice"
        >
          <g stroke="#E2E8F0" strokeWidth="1" fill="none">
            <line x1="0" y1="140" x2="1440" y2="140" />
            <line x1="0" y1="360" x2="1440" y2="360" />
            <line x1="0" y1="580" x2="1440" y2="580" />
            <line x1="240" y1="0" x2="240" y2="720" />
            <line x1="720" y1="0" x2="720" y2="720" />
            <line x1="1200" y1="0" x2="1200" y2="720" />
            <path d="M 920 -40 L 1480 520" stroke="#F1F3F5" strokeWidth="44" />
            <path d="M 860 -40 L 1420 520" stroke="#FF5500" strokeOpacity="0.08" strokeWidth="2" />
          </g>
        </svg>
      </motion.div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-10 pb-12 lg:pt-16 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Foreground Left: High-Contrast Athletic Typography */}
          <motion.div
            style={{ y: copyY }}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center py-2 lg:py-8"
          >
            <p className="font-display text-sm font-bold uppercase tracking-[0.08em] text-[#FF5500] mb-3">
              Marathon Chassis Series · Autumn 2026
            </p>

            <h1 className="font-display text-[44px] leading-[44px] sm:text-[60px] sm:leading-[60px] lg:text-[72px] lg:leading-[72px] font-extrabold uppercase tracking-[0.03em] text-[#111418] text-balance max-w-xl">
              Engineered for Threshold Velocity
            </h1>

            <p className="mt-5 text-[16px] sm:text-[18px] leading-[28px] text-[#64748B] max-w-lg">
              Split-fork T700 carbon propulsion meets nitrogen-infused PEBAX cushioning. Built to sustain marathon turnover when neuromuscular fatigue sets in.
            </p>

            {/* Primary & Secondary Action Pair */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onSelectProduct(featuredProduct)}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white font-display text-base font-bold uppercase tracking-[0.06em] shadow-[0_10px_20px_-5px_rgba(255,85,0,0.35)] hover:-translate-y-0.5 transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#111418]"
              >
                <span>Shop {featuredProduct.name}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onExploreCollection}
                className="inline-flex items-center justify-center px-6 py-3.5 min-h-[48px] rounded-lg border-[1.5px] border-[#111418] text-[#111418] hover:bg-[#F1F3F5] font-display text-base font-bold uppercase tracking-[0.06em] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF5500]"
              >
                Browse Full Lineup
              </button>
            </div>
          </motion.div>

          {/* Midground Right: Interactive Parallax Studio Showcase */}
          <motion.div
            style={{ y: stageY }}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col"
          >
            <div
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              className="relative flex-1 min-h-[340px] sm:min-h-[420px] rounded-3xl bg-[#F8F9FA] border border-[#E2E8F0] shadow-[0_4px_20px_-2px_rgba(17,20,24,0.04)] overflow-hidden flex flex-col justify-between p-6 sm:p-8"
            >
              {/* Top Bar Inside Stage: Product Spec Label & Angle Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 z-10">
                <div className="text-xs font-semibold text-[#64748B] flex items-center gap-2">
                  <span className="text-[#111418]">{featuredProduct.name}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">${featuredProduct.price}</span>
                </div>

                <div
                  className="inline-flex items-center gap-1 p-1 rounded-lg bg-white border border-[#E2E8F0]"
                  role="group"
                  aria-label="Inspect angle"
                >
                  {(['profile', 'cutaway', 'chassis'] as VisualAngle[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setAngle(mode)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                        angle === mode
                          ? 'bg-[#111418] text-white'
                          : 'text-[#64748B] hover:text-[#111418]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3D Tiltable Product Render */}
              <motion.div
                animate={{
                  rotateX: tilt.x,
                  rotateY: tilt.y,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                className="my-auto py-4 flex items-center justify-center"
              >
                <ProductVisual
                  product={featuredProduct}
                  colorway={activeColorway}
                  angle={angle}
                  className="max-h-[260px] sm:max-h-[300px]"
                />
              </motion.div>

              {/* Bottom Stage Bar: Colorway Swatches & Direct Inspect Trigger */}
              <div className="flex flex-wrap items-center justify-between gap-4 z-10 pt-3 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-[#64748B]">Colorway:</span>
                  <div className="flex items-center gap-2">
                    {featuredProduct.colorways.map((cw, idx) => (
                      <button
                        key={cw.id}
                        type="button"
                        onClick={() => setSelectedColorIdx(idx)}
                        aria-label={`Select colorway ${cw.name}`}
                        className={`w-6 h-6 rounded-full border-2 transition-transform duration-150 cursor-pointer flex items-center justify-center ${
                          idx === selectedColorIdx
                            ? 'border-[#FF5500] scale-110'
                            : 'border-[#CBD5E1] hover:scale-105'
                        }`}
                        style={{ backgroundColor: cw.primaryHex }}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: cw.accentHex }}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="hidden sm:inline text-xs font-medium text-[#111418]">
                    {activeColorway.name}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProduct(featuredProduct)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111418] hover:text-[#FF5500] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Full Technical Sheet</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Proof Metric Strip Below Hero Split */}
        <div className="mt-10 pt-8 border-t border-[#E2E8F0] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {proofMetrics.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-1">
              <span className="font-display text-3xl sm:text-4xl font-bold text-[#111418] tabular-nums tracking-tight">
                {metric.value}
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#64748B]">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

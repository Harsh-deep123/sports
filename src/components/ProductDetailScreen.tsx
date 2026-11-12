import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Heart,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { Colorway, Product, VisualAngle } from '../types/store';
import { ProductVisual } from './ProductVisual';

interface ProductDetailScreenProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onBackToCollection: () => void;
  onAddToBag: (product: Product, colorway: Colorway, size: string) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onBackToCollection,
  onAddToBag,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const firstAvailable = product.sizes.find((s) => s.inStock)?.label ?? product.sizes[0].label;
  const [selectedSize, setSelectedSize] = useState(firstAvailable);
  const [angle, setAngle] = useState<VisualAngle>('profile');
  const [zoomed, setZoomed] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('materials');

  const activeColorway = product.colorways[selectedColorIdx] ?? product.colorways[0];

  const handleAdd = () => {
    onAddToBag(product, activeColorway, selectedSize);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1400);
  };

  const accordions = [
    { id: 'materials', title: 'Materials & Construction', content: product.materialsDetail },
    { id: 'care', title: 'Care & Structural Warranty', content: product.careDetail },
    { id: 'fit', title: 'Athlete Fit Guidance', content: product.fitNotes },
  ];

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white pb-24 lg:pb-20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-8">
        {/* Clean Breadcrumb Navigation */}
        <button
          type="button"
          onClick={onBackToCollection}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] hover:text-[#111418] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Collection</span>
        </button>

        {/* Contiguous PDP Layout: Sticky Gallery Left + Sticky Purchase Module Right */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Sticky Gallery Column */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 flex flex-col gap-4">
            <div className="relative rounded-2xl bg-[#F8F9FA] border border-[#E2E8F0] p-6 sm:p-10 min-h-[360px] sm:min-h-[460px] flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between gap-4 z-10">
                <div className="text-xs font-semibold text-[#64748B] flex items-center gap-2">
                  <span className="text-[#111418]">{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.discipline}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{product.weightGrams} g</span>
                </div>

                <button
                  type="button"
                  onClick={() => setZoomed((z) => !z)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-lg bg-white border border-[#E2E8F0] text-xs font-semibold text-[#111418] hover:border-[#CBD5E1] cursor-pointer"
                >
                  {zoomed ? (
                    <>
                      <ZoomOut className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Reset View</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Inspect Zoom</span>
                    </>
                  )}
                </button>
              </div>

              <div
                className={`my-auto py-6 flex items-center justify-center transition-transform duration-300 ease-out ${
                  zoomed ? 'scale-125' : 'scale-100'
                }`}
              >
                <ProductVisual
                  product={product}
                  colorway={activeColorway}
                  angle={angle}
                  className="max-h-[300px]"
                />
              </div>

              {/* Angle Selector Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E2E8F0] z-10">
                <span className="text-xs font-medium text-[#64748B]">
                  Active Studio Angle: <strong className="text-[#111418] capitalize">{angle}</strong>
                </span>
                <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-white border border-[#E2E8F0]">
                  {(['profile', 'chassis', 'cutaway'] as VisualAngle[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setAngle(mode)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors whitespace-nowrap cursor-pointer ${
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
            </div>

            {/* Technical Spec Sheet Table */}
            <div className="rounded-xl border border-[#EDF2F7] overflow-hidden">
              <div className="px-5 py-3.5 bg-[#F8F9FA] border-b border-[#EDF2F7]">
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-[#111418]">
                  Laboratory Specification Sheet
                </h2>
              </div>
              <dl>
                {product.specs.map((spec, idx) => (
                  <div
                    key={spec.label}
                    className={`px-5 py-3 flex items-center justify-between gap-4 border-b last:border-b-0 border-[#EDF2F7] ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'
                    }`}
                  >
                    <dt className="font-display text-sm font-bold uppercase tracking-[0.06em] text-[#64748B]">
                      {spec.label}
                    </dt>
                    <dd className="text-sm font-semibold text-[#111418] tabular-nums text-right">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right Sticky Contiguous Purchase Module */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 rounded-2xl bg-white border border-[#E2E8F0] p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(17,20,24,0.04)]">
            <div className="flex items-center justify-between gap-3">
              <span className="font-display text-sm font-bold uppercase tracking-[0.08em] text-[#FF5500]">
                {product.category} · {product.discipline}
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#006947]">
                <Check className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
                <span>{product.availabilityText}</span>
              </span>
            </div>

            <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.02em] text-[#111418] text-balance">
              {product.name}
            </h1>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#111418] tabular-nums">
                ${product.price}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-base text-[#64748B] line-through tabular-nums">
                    ${product.compareAtPrice}
                  </span>
                  <span className="text-xs font-semibold text-[#006947]">
                    Save ${product.compareAtPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <p className="mt-4 text-[15px] leading-relaxed text-[#64748B]">
              {product.shortDescription}
            </p>

            {/* Colorway Selector */}
            <div className="mt-6 pt-6 border-t border-[#EDF2F7]">
              <div className="flex items-center justify-between text-xs font-semibold mb-3">
                <span className="text-[#64748B] uppercase tracking-[0.06em] font-display text-sm">
                  Colorway
                </span>
                <span className="text-[#111418]">{activeColorway.name}</span>
              </div>

              <div className="flex items-center gap-3">
                {product.colorways.map((cw, idx) => (
                  <button
                    key={cw.id}
                    type="button"
                    onClick={() => setSelectedColorIdx(idx)}
                    aria-label={`Select colorway ${cw.name}`}
                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-transform cursor-pointer ${
                      idx === selectedColorIdx
                        ? 'border-[#FF5500] scale-105'
                        : 'border-[#CBD5E1] hover:border-[#64748B]'
                    }`}
                    style={{ backgroundColor: cw.primaryHex }}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/40"
                      style={{ backgroundColor: cw.accentHex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Segmented Size Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-semibold mb-3">
                <span className="text-[#64748B] uppercase tracking-[0.06em] font-display text-sm">
                  Select Size
                </span>
                <span className="text-[#111418] tabular-nums">Selected: {selectedSize}</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size.label;
                  return (
                    <button
                      key={size.label}
                      type="button"
                      disabled={!size.inStock}
                      onClick={() => setSelectedSize(size.label)}
                      className={`min-h-[44px] px-3 py-2 rounded-lg text-sm font-semibold tabular-nums border transition-all duration-150 ${
                        !size.inStock
                          ? 'bg-[#F8F9FA] border-[#E2E8F0] text-[#94A3B8] line-through cursor-not-allowed'
                          : isSelected
                          ? 'bg-[#111418] border-[#111418] text-white cursor-pointer'
                          : 'bg-white border-[#E2E8F0] text-[#111418] hover:border-[#111418] cursor-pointer'
                      }`}
                    >
                      {size.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary CTA + Wishlist Action */}
            <div className="mt-7 flex items-center gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 min-h-[52px] px-6 py-3.5 rounded-lg font-display text-base font-bold uppercase tracking-[0.06em] text-white transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 ${
                  addedFeedback
                    ? 'bg-[#10B981]'
                    : 'bg-[#FF5500] hover:bg-[#E04B00] shadow-[0_10px_20px_-5px_rgba(255,85,0,0.35)] hover:-translate-y-0.5'
                }`}
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-5 h-5" aria-hidden="true" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag · ${product.price}</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                className="w-[52px] h-[52px] rounded-lg border-[1.5px] border-[#E2E8F0] hover:border-[#111418] flex items-center justify-center text-[#111418] transition-colors cursor-pointer shrink-0"
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? 'fill-[#FF5500] text-[#FF5500]' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-[#64748B]">
              <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" aria-hidden="true" />
              <span>Free express dispatch over $180 · 30-day wear-tested returns</span>
            </div>

            {/* Technical Details Accordion */}
            <div className="mt-7 border-t border-[#EDF2F7] divide-y divide-[#EDF2F7]">
              {accordions.map((item) => {
                const isOpen = openAccordion === item.id;
                return (
                  <div key={item.id}>
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                      className="w-full py-4 flex items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <span className="font-display text-base font-bold uppercase tracking-[0.04em] text-[#111418]">
                        {item.title}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#64748B] transition-transform duration-150 ${
                          isOpen ? 'rotate-180 text-[#FF5500]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <p className="pb-4 text-sm leading-relaxed text-[#64748B]">
                        {item.content}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Buy Bar (Compact <= 64px to stay well under 15% mobile viewport cap) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-[#111418] truncate">{product.name}</div>
          <div className="text-sm font-bold text-[#111418] tabular-nums">
            ${product.price} · {selectedSize}
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-5 py-2.5 min-h-[44px] rounded-lg bg-[#FF5500] text-white font-display text-sm font-bold uppercase tracking-[0.06em] whitespace-nowrap shrink-0 cursor-pointer"
        >
          {addedFeedback ? 'Added' : 'Add to Bag'}
        </button>
      </div>
    </motion.div>
  );
};

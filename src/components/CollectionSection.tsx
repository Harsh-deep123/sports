import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Heart, Search, SlidersHorizontal, Check, Plus } from 'lucide-react';
import { Colorway, Product, ProductCategory } from '../types/store';
import { ProductVisual } from './ProductVisual';

interface CollectionSectionProps {
  products: Product[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, colorway: Colorway, size: string) => void;
}

const CATEGORIES: ('All' | ProductCategory)[] = [
  'All',
  'Footwear',
  'Outerwear',
  'Compression',
  'Packs',
];

type SortOption = 'featured' | 'price-asc' | 'weight-asc';

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  products,
  activeCategory,
  onCategoryChange,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [cardColorwayIdx, setCardColorwayIdx] = useState<Record<string, number>>({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = products.filter((p) => {
      const catMatch = activeCategory === 'All' || p.category === activeCategory;
      const searchMatch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.discipline.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q);
      return catMatch && searchMatch;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'weight-asc') {
      return [...list].sort((a, b) => a.weightGrams - b.weightGrams);
    }
    return list;
  }, [products, activeCategory, searchQuery, sortBy]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product, colorway: Colorway) => {
    e.stopPropagation();
    const firstAvailableSize = product.sizes.find((s) => s.inStock)?.label ?? product.sizes[0].label;
    onQuickAdd(product, colorway, firstAvailableSize);
    setJustAddedId(product.id);
    window.setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1300);
  };

  return (
    <section id="collection" className="bg-white py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E2E8F0]">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.08em] text-[#FF5500] mb-1.5">
              Technical Equipment Catalog
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-[0.02em] text-[#111418] text-balance">
              Performance Lineup
            </h2>
          </div>

          <p className="text-sm text-[#64748B] tabular-nums">
            Showing {filteredProducts.length} of {products.length} engineered units
          </p>
        </div>

        {/* Filter Bar: Segmented Category Tabs + Search + Sort */}
        <div className="mt-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Interactive Segmented Category Tabs */}
          <div
            className="flex items-center gap-1 p-1 rounded-lg bg-[#F8F9FA] border border-[#E2E8F0] overflow-x-auto"
            role="tablist"
            aria-label="Filter equipment by category"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-4 py-2 min-h-[40px] rounded-md text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#111418] text-white shadow-sm'
                      : 'text-[#64748B] hover:text-[#111418]'
                  }`}
                >
                  {cat === 'All' ? 'All Gear' : cat}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search
                className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gear, discipline..."
                aria-label="Search gear"
                className="w-full min-h-[48px] pl-10 pr-4 rounded-lg bg-[#F8F9FA] border border-[#E2E8F0] text-sm text-[#111418] placeholder:text-[#64748B] focus:outline-2 focus:outline-[#FF5500] focus:outline-offset-0"
              />
            </div>

            <div className="relative flex items-center">
              <SlidersHorizontal
                className="w-4 h-4 text-[#64748B] absolute left-3.5 pointer-events-none"
                aria-hidden="true"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products"
                className="w-full sm:w-48 min-h-[48px] pl-10 pr-4 rounded-lg bg-[#F8F9FA] border border-[#E2E8F0] text-sm font-medium text-[#111418] focus:outline-2 focus:outline-[#FF5500] focus:outline-offset-0 cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="weight-asc">Mass: Lightest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="mt-12 p-12 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] text-center">
            <h3 className="font-display text-2xl font-bold uppercase text-[#111418]">
              No Matching Gear Found
            </h3>
            <p className="mt-2 text-sm text-[#64748B]">
              Clear your search filter or switch back to all categories to view the full lineup.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                onCategoryChange('All');
              }}
              className="mt-5 px-5 py-2.5 min-h-[44px] rounded-lg bg-[#111418] text-white text-sm font-semibold hover:bg-[#1E232A] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* 3-Column Product Grid */
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product, index) => {
              const colorIdx = cardColorwayIdx[product.id] ?? 0;
              const activeColorway = product.colorways[colorIdx] ?? product.colorways[0];
              const isWishlisted = wishlistIds.includes(product.id);
              const isHovered = hoveredCardId === product.id;
              const wasAdded = justAddedId === product.id;

              return (
                <motion.article
                  key={product.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.35,
                    delay: prefersReducedMotion ? 0 : Math.min(index * 0.05, 0.25),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseEnter={() => setHoveredCardId(product.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className="group flex flex-col rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_20px_-2px_rgba(17,20,24,0.04)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-4px_rgba(17,20,24,0.08)] hover:border-[#CBD5E1] transition-all duration-200 overflow-hidden"
                >
                  {/* Neutral Staging Photo Bed (68% visual dominance) */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="relative aspect-[4/3] bg-[#F8F9FA] border-b border-[#EDF2F7] p-5 flex items-center justify-center cursor-pointer overflow-hidden"
                  >
                    {product.statusNote && (
                      <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-[0.08em] font-display text-[#111418]">
                        {product.statusNote}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      aria-label={
                        isWishlisted
                          ? `Remove ${product.name} from wishlist`
                          : `Save ${product.name} to wishlist`
                      }
                      className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#FF5500] hover:border-[#CBD5E1] transition-colors cursor-pointer z-10"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted ? 'fill-[#FF5500] text-[#FF5500]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <div className="w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.04]">
                      <ProductVisual
                        product={product}
                        colorway={activeColorway}
                        angle={isHovered ? 'chassis' : 'profile'}
                      />
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex-1 p-5 flex flex-col justify-between gap-4">
                    <div>
                      {/* Clean Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-[#64748B] font-medium">
                        <span>{product.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.discipline}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{product.weightGrams} g</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="mt-1.5 text-left font-display text-2xl font-bold uppercase tracking-[0.01em] text-[#111418] group-hover:text-[#FF5500] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </button>

                      <p className="mt-1.5 text-sm text-[#64748B] line-clamp-2">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#EDF2F7] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-[#111418] tabular-nums">
                            ${product.price}
                          </span>
                          {product.compareAtPrice && (
                            <span className="text-xs text-[#64748B] line-through tabular-nums">
                              ${product.compareAtPrice}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          {product.colorways.map((cw, cIdx) => (
                            <button
                              key={cw.id}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCardColorwayIdx((prev) => ({ ...prev, [product.id]: cIdx }));
                              }}
                              aria-label={`${product.name} ${cw.name}`}
                              className={`w-4 h-4 rounded-full border transition-transform cursor-pointer ${
                                cIdx === colorIdx
                                  ? 'border-[#FF5500] scale-115'
                                  : 'border-[#CBD5E1]'
                              }`}
                              style={{ backgroundColor: cw.primaryHex }}
                            />
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(e, product, activeColorway)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-bold uppercase tracking-[0.06em] font-display whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                          wasAdded
                            ? 'bg-[#10B981] text-white'
                            : 'bg-[#111418] text-white hover:bg-[#FF5500]'
                        }`}
                      >
                        {wasAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Quick Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

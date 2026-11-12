import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, Check, Plus } from 'lucide-react';
import { Colorway, Product } from '../types/store';
import { ProductVisual } from './ProductVisual';

interface SpecCompareScreenProps {
  products: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, colorway: Colorway, size: string) => void;
}

const DISCIPLINES = ['All', 'Marathon', 'Track', 'Trail'] as const;

export const SpecCompareScreen: React.FC<SpecCompareScreenProps> = ({
  products,
  onBack,
  onSelectProduct,
  onQuickAdd,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [discipline, setDiscipline] = useState<(typeof DISCIPLINES)[number]>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([
    products[0]?.id ?? '',
    products[1]?.id ?? '',
    products[2]?.id ?? '',
  ]);

  const filteredPool = useMemo(() => {
    if (discipline === 'All') return products;
    return products.filter((p) => p.discipline === discipline);
  }, [products, discipline]);

  const comparedProducts = useMemo(() => {
    return selectedIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [products, selectedIds]);

  const toggleProductInCompare = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev;
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  return (
    <motion.section
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white py-10 lg:py-16"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] hover:text-[#111418] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Storefront</span>
        </button>

        <div className="mt-5 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E2E8F0]">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.08em] text-[#FF5500] mb-1.5">
              Side-by-Side Technical Matrix
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.02em] text-[#111418] text-balance">
              Equipment Specification Compare
            </h1>
          </div>

          <div
            className="flex items-center gap-1 p-1 rounded-lg bg-[#F8F9FA] border border-[#E2E8F0] self-start"
            role="tablist"
            aria-label="Filter by discipline"
          >
            {DISCIPLINES.map((disc) => (
              <button
                key={disc}
                type="button"
                role="tab"
                aria-selected={discipline === disc}
                onClick={() => setDiscipline(disc)}
                className={`px-3.5 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  discipline === disc
                    ? 'bg-[#111418] text-white'
                    : 'text-[#64748B] hover:text-[#111418]'
                }`}
              >
                {disc}
              </button>
            ))}
          </div>
        </div>

        {/* Selector Strip */}
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.06em] font-display text-[#64748B] mb-3">
            Select up to 3 units to compare ({comparedProducts.length}/3 active)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredPool.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleProductInCompare(item.id)}
                  className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#111418] border-[#111418] text-white'
                      : 'bg-[#F8F9FA] border-[#E2E8F0] text-[#111418] hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-display text-lg font-bold uppercase truncate">
                      {item.name}
                    </div>
                    <div
                      className={`text-xs tabular-nums ${
                        isSelected ? 'text-slate-300' : 'text-[#64748B]'
                      }`}
                    >
                      {item.category} · {item.weightGrams} g · ${item.price}
                    </div>
                  </div>
                  <span
                    className={`w-6 h-6 rounded-sm border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-[#FF5500] border-[#FF5500] text-white'
                        : 'border-[#CBD5E1] bg-white text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="mt-10 overflow-x-auto rounded-2xl border border-[#E2E8F0]">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#E2E8F0]">
                <th className="w-52 p-5 align-bottom font-display text-sm font-bold uppercase tracking-[0.08em] text-[#64748B]">
                  Specification
                </th>
                {comparedProducts.map((product) => {
                  const defaultSize =
                    product.sizes.find((s) => s.inStock)?.label ?? product.sizes[0].label;
                  return (
                    <th key={product.id} className="p-5 align-top border-l border-[#E2E8F0]">
                      <div
                        onClick={() => onSelectProduct(product)}
                        className="h-36 bg-white rounded-xl border border-[#EDF2F7] p-3 mb-4 cursor-pointer flex items-center justify-center"
                      >
                        <ProductVisual
                          product={product}
                          colorway={product.colorways[0]}
                          angle="profile"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="font-display text-2xl font-bold uppercase text-[#111418] hover:text-[#FF5500] transition-colors text-left cursor-pointer"
                      >
                        {product.name}
                      </button>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <span className="text-lg font-bold text-[#111418] tabular-nums">
                          ${product.price}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onQuickAdd(product, product.colorways[0], defaultSize)
                          }
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white font-display text-xs font-bold uppercase tracking-[0.06em] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Add</span>
                        </button>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EDF2F7] text-sm">
              <tr className="bg-white">
                <td className="p-4 font-display text-sm font-bold uppercase tracking-[0.06em] text-[#64748B]">
                  Category
                </td>
                {comparedProducts.map((p) => (
                  <td
                    key={p.id}
                    className="p-4 font-medium text-[#111418] border-l border-[#EDF2F7]"
                  >
                    {p.category}
                  </td>
                ))}
              </tr>
              <tr className="bg-[#F8F9FA]">
                <td className="p-4 font-display text-sm font-bold uppercase tracking-[0.06em] text-[#64748B]">
                  Primary Discipline
                </td>
                {comparedProducts.map((p) => (
                  <td
                    key={p.id}
                    className="p-4 font-medium text-[#111418] border-l border-[#EDF2F7]"
                  >
                    {p.discipline}
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="p-4 font-display text-sm font-bold uppercase tracking-[0.06em] text-[#64748B]">
                  Measured Mass
                </td>
                {comparedProducts.map((p) => (
                  <td
                    key={p.id}
                    className="p-4 font-bold text-[#111418] tabular-nums border-l border-[#EDF2F7]"
                  >
                    {p.weightGrams} g
                  </td>
                ))}
              </tr>
              {[0, 1, 2, 3].map((rowIdx) => (
                <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-[#F8F9FA]' : 'bg-white'}>
                  <td className="p-4 font-display text-sm font-bold uppercase tracking-[0.06em] text-[#64748B]">
                    Technical Metric 0{rowIdx + 1}
                  </td>
                  {comparedProducts.map((p) => {
                    const spec = p.specs[rowIdx];
                    return (
                      <td
                        key={p.id}
                        className="p-4 border-l border-[#EDF2F7] text-[#111418]"
                      >
                        {spec ? (
                          <div>
                            <div className="text-xs text-[#64748B]">{spec.label}</div>
                            <div className="font-semibold tabular-nums mt-0.5">
                              {spec.value}
                            </div>
                          </div>
                        ) : (
                          <span className="text-[#64748B]">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="bg-[#F8F9FA]">
                <td className="p-4 font-display text-sm font-bold uppercase tracking-[0.06em] text-[#64748B]">
                  Availability
                </td>
                {comparedProducts.map((p) => (
                  <td
                    key={p.id}
                    className="p-4 font-semibold text-[#006947] border-l border-[#EDF2F7]"
                  >
                    {p.availabilityText}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  );
};

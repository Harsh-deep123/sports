import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { CartItem } from '../types/store';
import { ProductVisual } from './ProductVisual';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  promoCode: string;
  onApplyPromo: (code: string) => boolean;
  onClose: () => void;
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onProceedToCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD = 180;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  promoCode,
  onApplyPromo,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [promoInput, setPromoInput] = useState(promoCode);
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = promoCode === 'KINETIC10' ? Math.round(subtotal * 0.1) : 0;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const total = Math.max(0, subtotal - discount);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onApplyPromo(promoInput.trim().toUpperCase());
    if (ok) {
      setPromoFeedback('KINETIC10 applied (10% off)');
    } else if (!promoInput.trim()) {
      setPromoFeedback(null);
    } else {
      setPromoFeedback('Invalid code. Try KINETIC10');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping Bag">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#111418]/45 backdrop-blur-md"
          />

          {/* Slide-Over Panel */}
          <motion.aside
            initial={prefersReducedMotion ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={prefersReducedMotion ? undefined : { x: '100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-white h-full shadow-[0_24px_48px_-8px_rgba(17,20,24,0.16)] flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#E2E8F0] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#FF5500]" aria-hidden="true" />
                <h2 className="font-display text-2xl font-bold uppercase tracking-[0.02em] text-[#111418]">
                  Gear Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close gear bag"
                className="w-10 h-10 rounded-lg border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#111418] hover:bg-[#F8F9FA] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Strip */}
            <div className="px-6 py-3.5 bg-[#F8F9FA] border-b border-[#E2E8F0]">
              <div className="flex items-center justify-between text-xs font-semibold text-[#111418] mb-2">
                {remainingForFreeShipping === 0 ? (
                  <span className="text-[#006947]">
                    Unlocked: Complimentary Express Dispatch
                  </span>
                ) : (
                  <span className="tabular-nums">
                    Add ${remainingForFreeShipping} more for free express shipping
                  </span>
                )}
                <span className="tabular-nums text-[#64748B]">{shippingProgress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
                <div
                  className="h-full bg-[#10B981] transition-all duration-300"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {items.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="font-display text-2xl font-bold uppercase text-[#111418]">
                    Your Bag is Empty
                  </p>
                  <p className="mt-2 text-sm text-[#64748B]">
                    Add footwear or technical outerwear from the performance lineup to begin.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 px-6 py-3 rounded-lg bg-[#111418] text-white font-display text-sm font-bold uppercase tracking-[0.06em] hover:bg-[#1E232A] cursor-pointer"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.key}
                    className="flex gap-4 pb-4 border-b border-[#EDF2F7] last:border-b-0"
                  >
                    <div className="w-24 h-20 rounded-lg bg-[#F8F9FA] border border-[#E2E8F0] p-2 shrink-0 flex items-center justify-center">
                      <ProductVisual
                        product={item.product}
                        colorway={item.colorway}
                        angle="profile"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg font-bold uppercase text-[#111418] truncate">
                          {item.product.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.key)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-[#64748B] hover:text-[#ba1a1a] p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-[#64748B] mt-0.5">
                        {item.colorway.name} · Size {item.size}
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center border border-[#E2E8F0] rounded-lg bg-[#F8F9FA]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.key, -1)}
                            aria-label="Decrease quantity"
                            className="w-8 h-8 flex items-center justify-center text-[#111418] hover:bg-white rounded-l-lg cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold tabular-nums text-[#111418]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.key, 1)}
                            aria-label="Increase quantity"
                            className="w-8 h-8 flex items-center justify-center text-[#111418] hover:bg-white rounded-r-lg cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-[#111418] tabular-nums">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Totals & Checkout CTA */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#E2E8F0] bg-white space-y-4">
                <form onSubmit={handlePromoSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. KINETIC10)"
                    aria-label="Promo code"
                    className="flex-1 min-h-[44px] px-3.5 rounded-lg bg-[#F8F9FA] border border-[#E2E8F0] text-sm text-[#111418] focus:outline-2 focus:outline-[#FF5500] focus:outline-offset-0"
                  />
                  <button
                    type="submit"
                    className="px-4 min-h-[44px] rounded-lg border border-[#111418] text-xs font-bold uppercase tracking-[0.06em] font-display text-[#111418] hover:bg-[#F1F3F5] cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {promoFeedback && (
                  <p
                    className={`text-xs font-semibold ${
                      promoCode === 'KINETIC10' ? 'text-[#006947]' : 'text-[#ba1a1a]'
                    }`}
                  >
                    {promoFeedback}
                  </p>
                )}

                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#64748B]">
                    <span>Subtotal</span>
                    <span className="tabular-nums font-medium text-[#111418]">${subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#006947]">
                      <span>Promo (KINETIC10)</span>
                      <span className="tabular-nums font-semibold">-${discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#64748B]">
                    <span>Express Dispatch</span>
                    <span className="tabular-nums font-medium text-[#111418]">
                      {remainingForFreeShipping === 0 ? 'Free' : '$14'}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#EDF2F7] flex justify-between text-base font-bold text-[#111418]">
                    <span>Estimated Total</span>
                    <span className="tabular-nums">
                      ${total + (remainingForFreeShipping === 0 ? 0 : 14)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onProceedToCheckout}
                  className="w-full min-h-[52px] rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white font-display text-base font-bold uppercase tracking-[0.06em] shadow-[0_10px_20px_-5px_rgba(255,85,0,0.35)] transition-all duration-150 cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};

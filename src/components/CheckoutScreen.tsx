import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, Check, CreditCard, PackageCheck, Truck } from 'lucide-react';
import { CartItem, OrderReceipt } from '../types/store';
import { ProductVisual } from './ProductVisual';

interface CheckoutScreenProps {
  items: CartItem[];
  promoCode: string;
  onBack: () => void;
  onOrderConfirmed: (receipt: OrderReceipt) => void;
  confirmedReceipt: OrderReceipt | null;
  onReturnToStorefront: () => void;
}

const FREE_SHIPPING_THRESHOLD = 180;

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  items,
  promoCode,
  onBack,
  onOrderConfirmed,
  confirmedReceipt,
  onReturnToStorefront,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Cash on Delivery'>('Card');
  const [cardLastFour, setCardLastFour] = useState('');
  const [acceptTrialTerms, setAcceptTrialTerms] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = promoCode === 'KINETIC10' ? Math.round(subtotal * 0.1) : 0;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 14;
  const total = Math.max(0, subtotal - discount + shippingCost);

  if (confirmedReceipt) {
    return (
      <motion.section
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white py-12 lg:py-20"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-10 shadow-[0_4px_20px_-2px_rgba(17,20,24,0.04)]">
            <div className="flex items-center gap-3 text-[#006947]">
              <div className="w-10 h-10 rounded-full bg-[#ECFDF5] flex items-center justify-center">
                <PackageCheck className="w-5 h-5 text-[#10B981]" aria-hidden="true" />
              </div>
              <span className="font-display text-sm font-bold uppercase tracking-[0.08em]">
                Order #{confirmedReceipt.orderNumber} Confirmed — Preparing Shipment
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold uppercase text-[#111418] text-balance">
              Dispatch Scheduled
            </h1>
            <p className="mt-2 text-sm text-[#64748B]">
              A confirmation copy has been prepared for{' '}
              <strong className="text-[#111418]">{confirmedReceipt.email}</strong>. Express
              courier handoff departs within 24 hours.
            </p>

            {/* Delivery & Payment Summary */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-xl bg-[#F8F9FA] border border-[#EDF2F7] text-sm">
              <div>
                <div className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#64748B]">
                  Recipient &amp; Destination
                </div>
                <div className="mt-1.5 font-semibold text-[#111418]">
                  {confirmedReceipt.customerName}
                </div>
                <div className="text-[#64748B]">{confirmedReceipt.phone}</div>
                <div className="text-[#64748B] mt-1">
                  {confirmedReceipt.address}, {confirmedReceipt.postalCode}
                </div>
              </div>
              <div>
                <div className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#64748B]">
                  Settlement Method
                </div>
                <div className="mt-1.5 font-semibold text-[#111418]">
                  {confirmedReceipt.paymentMethod}
                </div>
                <div className="text-[#64748B] mt-1 tabular-nums">
                  Placed {confirmedReceipt.placedAt}
                </div>
              </div>
            </div>

            {/* Itemized Receipt */}
            <div className="mt-8 border-t border-[#E2E8F0] pt-6">
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-[#64748B] mb-4">
                Itemized Equipment Manifest
              </h2>
              <div className="divide-y divide-[#EDF2F7]">
                {confirmedReceipt.items.map((item) => (
                  <div key={item.key} className="py-3 flex items-center justify-between gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-[#111418]">{item.product.name}</span>
                      <span className="text-[#64748B]">
                        {' '}
                        · {item.colorway.name} · Size {item.size} × {item.quantity}
                      </span>
                    </div>
                    <span className="font-bold text-[#111418] tabular-nums">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-[#E2E8F0] space-y-1.5 text-sm">
                <div className="flex justify-between text-[#64748B]">
                  <span>Subtotal</span>
                  <span className="tabular-nums">${confirmedReceipt.subtotal}</span>
                </div>
                {confirmedReceipt.discount > 0 && (
                  <div className="flex justify-between text-[#006947]">
                    <span>Discount</span>
                    <span className="tabular-nums">-${confirmedReceipt.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#64748B]">
                  <span>Express Dispatch</span>
                  <span className="tabular-nums">
                    {confirmedReceipt.shippingCost === 0 ? 'Free' : `$${confirmedReceipt.shippingCost}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#EDF2F7] flex justify-between text-lg font-bold text-[#111418]">
                  <span>Total {confirmedReceipt.paymentMethod === 'Cash on Delivery' ? 'Due on Delivery' : 'Paid'}</span>
                  <span className="tabular-nums">${confirmedReceipt.total}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onReturnToStorefront}
              className="mt-8 w-full min-h-[50px] rounded-lg bg-[#111418] hover:bg-[#1E232A] text-white font-display text-base font-bold uppercase tracking-[0.06em] transition-colors cursor-pointer"
            >
              Return to Storefront
            </button>
          </div>
        </div>
      </motion.section>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setFormError('Your bag is empty.');
      return;
    }
    if (!customerName.trim() || !email.trim() || !phone.trim() || !address.trim() || !postalCode.trim()) {
      setFormError('Complete all delivery and contact fields before placing your order.');
      return;
    }
    if (paymentMethod === 'Card' && cardLastFour.trim().length < 4) {
      setFormError('Enter a valid card number (or switch to Cash on Delivery).');
      return;
    }
    if (!acceptTrialTerms) {
      setFormError('Confirm the 30-day dispatch terms to continue.');
      return;
    }

    setFormError(null);
    const orderNum = `KP-${Math.floor(1000 + Math.random() * 8999)}`;
    onOrderConfirmed({
      orderNumber: orderNum,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customerName: customerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      postalCode: postalCode.trim(),
      paymentMethod,
      items: [...items],
      subtotal,
      discount,
      shippingCost,
      total,
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

        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.02em] text-[#111418]">
          Express Checkout
        </h1>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Form Column */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-5">
              <h2 className="font-display text-2xl font-bold uppercase text-[#111418]">
                01. Contact &amp; Shipping Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkout-name" className="block text-xs font-semibold text-[#111418] mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Jordan Vance"
                    className="w-full min-h-[48px] px-4 rounded-lg bg-[#F8F9FA] border border-[#E2E8F0] text-sm text-[#111418] focus:outline-2 focus:outline-[#FF5500] focus:outline-offset-0"
                  />
                </div>

                <div>
                  <label htmlFor="checkout-phone" className="block text-xs font-semibold text-[#111418] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (415) 555-0192"
                    className="w-full min-h-[48px] px-4 rounded-lg bg-[#F8F9FA] border border-[#E2E8F0] text-sm text-[#111418] focus:outline-2 focus:outline-[#FF5500] focus:outline-offset-0"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="checkout-email" className="block text-xs font-semibold text-[#111418] mb-1.5">
                  Email Address
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="athlete@kinetic-dispatch.com"
                  className="w-full min-h-[48px] px-4 rounded-lg bg-[#F8F9FA] border border-[#E2E8F0] text-sm text-[#111418] focus:outline-2 focus:outline-[#FF5500] focus:outline-offset-0"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="checkout-address" className="block text-xs font-semibold text-[#111418] mb-1.5">
                    Street Address
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="742 Embarcadero Way, Apt 4B"
                    className="w-full min-h-[48px] px-4 rounded-lg bg-[#F8F9FA] border border-[#E2E8F0] text-sm text-[#111418] focus:outline-2 focus:outline-[#FF5500] focus:outline-offset-0"
                  />
                </div>

                <div>
                  <label htmlFor="checkout-postal" className="block text-xs font-semibold text-[#111418] mb-1.5">
                    Postal Code
                  </label>
                  <input
                    id="checkout-postal"
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="94107"
                    className="w-full min-h-[48px] px-4 rounded-lg bg-[#F8F9FA] border border-[#E2E8F0] text-sm text-[#111418] tabular-nums focus:outline-2 focus:outline-[#FF5500] focus:outline-offset-0"
                  />
                </div>
              </div>
            </div>

            {/* Payment Selection */}
            <div className="rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-5">
              <h2 className="font-display text-2xl font-bold uppercase text-[#111418]">
                02. Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-colors cursor-pointer ${
                    paymentMethod === 'Card'
                      ? 'border-[#FF5500] bg-[#F8F9FA]'
                      : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#111418]" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-bold text-[#111418]">Debit / Credit Card</div>
                    <div className="text-xs text-[#64748B]">Instant order authorization</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cash on Delivery')}
                  className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-colors cursor-pointer ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'border-[#FF5500] bg-[#F8F9FA]'
                      : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#111418]" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-bold text-[#111418]">Cash on Delivery (COD)</div>
                    <div className="text-xs text-[#64748B]">Pay ${total} upon courier arrival</div>
                  </div>
                </button>
              </div>

              {paymentMethod === 'Card' ? (
                <div>
                  <label htmlFor="checkout-card" className="block text-xs font-semibold text-[#111418] mb-1.5">
                    Card Number
                  </label>
                  <input
                    id="checkout-card"
                    type="text"
                    value={cardLastFour}
                    onChange={(e) => setCardLastFour(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="w-full min-h-[48px] px-4 rounded-lg bg-[#F8F9FA] border border-[#E2E8F0] text-sm text-[#111418] tabular-nums focus:outline-2 focus:outline-[#FF5500] focus:outline-offset-0"
                  />
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] text-xs text-[#64748B] leading-relaxed">
                  Cash on Delivery verified: total payable at door is{' '}
                  <strong className="text-[#111418] tabular-nums">${total}</strong>. Free express
                  dispatch applies automatically on orders $180 and above.
                </div>
              )}

              {/* Custom 20px Checkbox */}
              <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={acceptTrialTerms}
                  onClick={() => setAcceptTrialTerms((v) => !v)}
                  className={`w-5 h-5 rounded-sm border-[1.5px] flex items-center justify-center transition-colors shrink-0 ${
                    acceptTrialTerms
                      ? 'bg-[#FF5500] border-[#FF5500] text-white'
                      : 'bg-white border-[#CBD5E1] text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <span className="text-xs text-[#64748B]">
                  Include 30-day wear-tested field trial guarantee and courier SMS updates.
                </span>
              </label>

              {formError && (
                <div
                  role="alert"
                  className="p-3.5 rounded-lg bg-[#ffdad6] text-[#93000a] text-xs font-semibold"
                >
                  {formError}
                </div>
              )}

              <button
                type="submit"
                className="w-full min-h-[54px] rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white font-display text-lg font-bold uppercase tracking-[0.06em] shadow-[0_10px_20px_-5px_rgba(255,85,0,0.35)] transition-all duration-150 cursor-pointer"
              >
                Confirm Order · ${total}
              </button>
            </div>
          </form>

          {/* Right Order Summary Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 rounded-2xl border border-[#E2E8F0] bg-[#F8F9FA] p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold uppercase text-[#111418] pb-4 border-b border-[#E2E8F0]">
              Order Summary
            </h2>

            <div className="mt-4 space-y-4">
              {items.map((item) => (
                <div key={item.key} className="flex items-center gap-3.5">
                  <div className="w-16 h-14 rounded-lg bg-white border border-[#E2E8F0] p-1.5 shrink-0 flex items-center justify-center">
                    <ProductVisual
                      product={item.product}
                      colorway={item.colorway}
                      angle="profile"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-[#111418] truncate">
                      {item.product.name}
                    </div>
                    <div className="text-xs text-[#64748B]">
                      {item.colorway.name} · Size {item.size} × {item.quantity}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-[#111418] tabular-nums">
                    ${item.product.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[#E2E8F0] space-y-2 text-sm">
              <div className="flex justify-between text-[#64748B]">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-[#111418]">${subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#006947]">
                  <span>Promo ({promoCode})</span>
                  <span className="tabular-nums font-semibold">-${discount}</span>
                </div>
              )}
              <div className="flex justify-between text-[#64748B]">
                <span>Express Dispatch (Free ≥ $180)</span>
                <span className="tabular-nums font-medium text-[#111418]">
                  {shippingCost === 0 ? 'Free' : `$${shippingCost}`}
                </span>
              </div>
              <div className="pt-3 border-t border-[#E2E8F0] flex justify-between text-lg font-bold text-[#111418]">
                <span>Total</span>
                <span className="tabular-nums">${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

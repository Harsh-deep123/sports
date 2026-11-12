import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface FooterProps {
  onNavigateCategory: (cat: string) => void;
  onOpenSpecs: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateCategory, onOpenSpecs }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#F8F9FA] border-t border-[#E2E8F0] py-14">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          <div className="md:col-span-5">
            <div className="font-display text-2xl font-extrabold uppercase tracking-[0.06em] text-[#111418]">
              KINETIC PRECISION
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#64748B] max-w-sm">
              Performance running footwear, storm-rated shells, and compression gear engineered for measurable pace economy.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <div className="font-display text-sm font-bold uppercase tracking-[0.08em] text-[#111418]">
              Equipment
            </div>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateCategory('Footwear')}
                  className="hover:text-[#111418] transition-colors cursor-pointer"
                >
                  Carbon Footwear
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateCategory('Outerwear')}
                  className="hover:text-[#111418] transition-colors cursor-pointer"
                >
                  3L Storm Outerwear
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateCategory('Compression')}
                  className="hover:text-[#111418] transition-colors cursor-pointer"
                >
                  Compression Apparel
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSpecs}
                  className="hover:text-[#111418] transition-colors cursor-pointer"
                >
                  Specification Matrix
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="font-display text-sm font-bold uppercase tracking-[0.08em] text-[#111418]">
              Release Dispatch Notes
            </div>
            <p className="mt-2 text-xs text-[#64748B]">
              Receive product drop dates and laboratory test updates. Zero noise.
            </p>

            {subscribed ? (
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#006947]">
                <Check className="w-4 h-4 text-[#10B981]" aria-hidden="true" />
                <span>Registered for release dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="athlete@domain.com"
                  aria-label="Email address for release updates"
                  className="flex-1 min-h-[44px] px-3.5 rounded-lg bg-white border border-[#E2E8F0] text-sm text-[#111418] focus:outline-2 focus:outline-[#FF5500] focus:outline-offset-0"
                />
                <button
                  type="submit"
                  className="px-4 min-h-[44px] rounded-lg bg-[#111418] hover:bg-[#1E232A] text-white font-display text-sm font-bold uppercase tracking-[0.06em] whitespace-nowrap cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#64748B]">
          <span>© 2026 Kinetic Precision Athletic Systems. All rights reserved.</span>
          <span>Free Express Dispatch Over $180 · 30-Day Field Trial</span>
        </div>
      </div>
    </footer>
  );
};

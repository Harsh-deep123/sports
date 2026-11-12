import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { ScreenView } from '../types/store';

interface HeaderProps {
  activeScreen: ScreenView;
  activeCategoryFilter: string;
  cartCount: number;
  onNavigateHome: (category?: string) => void;
  onOpenSpecs: () => void;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  activeCategoryFilter,
  cartCount,
  onNavigateHome,
  onOpenSpecs,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: 'Collection',
      active: activeScreen === 'storefront' && activeCategoryFilter === 'All',
      onClick: () => {
        onNavigateHome('All');
        setMobileMenuOpen(false);
      },
    },
    {
      label: 'Footwear',
      active: activeScreen === 'storefront' && activeCategoryFilter === 'Footwear',
      onClick: () => {
        onNavigateHome('Footwear');
        setMobileMenuOpen(false);
      },
    },
    {
      label: 'Apparel',
      active: activeScreen === 'storefront' && activeCategoryFilter === 'Outerwear',
      onClick: () => {
        onNavigateHome('Outerwear');
        setMobileMenuOpen(false);
      },
    },
    {
      label: 'Compare Specs',
      active: activeScreen === 'specs',
      onClick: () => {
        onOpenSpecs();
        setMobileMenuOpen(false);
      },
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigateHome('All')}
          className="font-display text-2xl font-extrabold uppercase tracking-[0.06em] text-[#111418] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#FF5500] rounded-sm cursor-pointer"
        >
          KINETIC PRECISION
        </button>

        {/* Zone 2: 4 Single-line Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF5500] rounded-sm ${
                item.active
                  ? 'text-[#111418] font-semibold'
                  : 'text-[#64748B] hover:text-[#111418]'
              }`}
            >
              {item.label}
              <span
                className={`absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#FF5500] transition-transform duration-150 origin-left ${
                  item.active ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-lg bg-[#111418] text-white text-sm font-semibold whitespace-nowrap shrink-0 hover:bg-[#1E232A] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF5500]"
          >
            <ShoppingBag className="w-4 h-4 text-[#FF5500]" aria-hidden="true" />
            <span>Bag</span>
            <span className="tabular-nums text-white/90">({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E2E8F0] text-[#111418] hover:bg-[#F8F9FA] cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white px-4 py-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                item.active
                  ? 'bg-[#F8F9FA] text-[#111418] font-semibold'
                  : 'text-[#64748B] hover:bg-[#F8F9FA] hover:text-[#111418]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

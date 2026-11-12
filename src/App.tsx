import { useState } from 'react';
import { PRODUCTS } from './data/products';
import { CartItem, Colorway, OrderReceipt, Product, ScreenView } from './types/store';
import { Header } from './components/Header';
import { HeroParallax } from './components/HeroParallax';
import { CollectionSection } from './components/CollectionSection';
import { EngineeringParallaxBand } from './components/EngineeringParallaxBand';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { SpecCompareScreen } from './components/SpecCompareScreen';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutScreen } from './components/CheckoutScreen';
import { Footer } from './components/Footer';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenView>('storefront');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[0].id]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [confirmedReceipt, setConfirmedReceipt] = useState<OrderReceipt | null>(null);

  const totalBagCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCollection = () => {
    window.setTimeout(() => {
      const el = document.getElementById('collection');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleNavigateHome = (category = 'All') => {
    setActiveCategory(category);
    setActiveScreen('storefront');
    setConfirmedReceipt(null);
    if (category === 'All') {
      scrollToTop();
    } else {
      scrollToCollection();
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveScreen('product');
    scrollToTop();
  };

  const handleOpenSpecs = () => {
    setActiveScreen('specs');
    scrollToTop();
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToBag = (product: Product, colorway: Colorway, size: string) => {
    const key = `${product.id}-${colorway.id}-${size}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { key, product, colorway, size, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleApplyPromo = (code: string) => {
    if (code === 'KINETIC10') {
      setPromoCode(code);
      return true;
    }
    return false;
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setConfirmedReceipt(null);
    setActiveScreen('checkout');
    scrollToTop();
  };

  const handleOrderConfirmed = (receipt: OrderReceipt) => {
    setConfirmedReceipt(receipt);
    setCartItems([]);
    setPromoCode('');
    scrollToTop();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111418]">
      <Header
        activeScreen={activeScreen}
        activeCategoryFilter={activeCategory}
        cartCount={totalBagCount}
        onNavigateHome={handleNavigateHome}
        onOpenSpecs={handleOpenSpecs}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {activeScreen === 'storefront' && (
          <>
            <HeroParallax
              featuredProduct={PRODUCTS[0]}
              onSelectProduct={handleSelectProduct}
              onExploreCollection={scrollToCollection}
            />

            <CollectionSection
              products={PRODUCTS}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onSelectProduct={handleSelectProduct}
              onQuickAdd={handleAddToBag}
            />

            <EngineeringParallaxBand
              heroProduct={PRODUCTS[0]}
              onInspectProduct={handleSelectProduct}
              onOpenCompare={handleOpenSpecs}
            />
          </>
        )}

        {activeScreen === 'product' && (
          <ProductDetailScreen
            key={selectedProduct.id}
            product={selectedProduct}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            onBackToCollection={() => handleNavigateHome('All')}
            onAddToBag={handleAddToBag}
          />
        )}

        {activeScreen === 'specs' && (
          <SpecCompareScreen
            products={PRODUCTS}
            onBack={() => handleNavigateHome('All')}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={handleAddToBag}
          />
        )}

        {activeScreen === 'checkout' && (
          <CheckoutScreen
            items={cartItems}
            promoCode={promoCode}
            onBack={() => handleNavigateHome('All')}
            onOrderConfirmed={handleOrderConfirmed}
            confirmedReceipt={confirmedReceipt}
            onReturnToStorefront={() => handleNavigateHome('All')}
          />
        )}
      </main>

      <Footer
        onNavigateCategory={(cat) => handleNavigateHome(cat)}
        onOpenSpecs={handleOpenSpecs}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        promoCode={promoCode}
        onApplyPromo={handleApplyPromo}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />
    </div>
  );
}

import { HeroSection } from "@/sections/HeroSection";
import { CategorySection } from "@/sections/CategorySection";
import { ProductsSection } from "@/sections/ProductsSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <ProductsSection 
        title="Produk Unggulan" 
        filter="popular" 
        limit={8} 
        viewAllLink="/topup"
      />
      <ProductsSection 
        title="Mobile Legends" 
        filter="Mobile Legends" 
        limit={4}
        viewAllLink="/mobile-legends"
      />
      <ProductsSection 
        title="Free Fire" 
        filter="Free Fire" 
        limit={4}
        viewAllLink="/free-fire"
      />
      <ProductsSection 
        title="PUBG Mobile" 
        filter="PUBG Mobile" 
        limit={4}
        viewAllLink="/pubg-mobile"
      />
      <ProductsSection 
        title="Genshin Impact" 
        filter="Genshin Impact" 
        limit={4}
        viewAllLink="/genshin-impact"
      />
      <ProductsSection 
        title="Roblox" 
        filter="Roblox" 
        limit={4}
        viewAllLink="/roblox"
      />
      <ProductsSection
        title="Semua Produk"
        filter="all"
        limit={8}
        showPagination={true}
        showViewAll={false}
      />
    </>
  );
}

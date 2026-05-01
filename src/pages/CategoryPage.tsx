import { useParams, Link, useLocation } from "react-router-dom";
import { PRODUCTS, CATEGORIES } from "@/data/config";
import { ProductCard } from "@/components/ProductCard";
import { ChevronRight, Home } from "lucide-react";

// Map URL paths to game names
const gameNameMap: Record<string, string> = {
  "mobile-legends": "Mobile Legends",
  "free-fire": "Free Fire",
  "pubg-mobile": "PUBG Mobile",
  "genshin-impact": "Genshin Impact",
  "roblox": "Roblox",
  "valorant": "Valorant",
  "steam": "Steam",
};

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const location = useLocation();
  
  // Get the path from URL
  const path = location.pathname.replace("/", "");
  
  // Determine what to filter by
  let filterValue = categoryId || "";
  let filterType: "category" | "game" = "category";
  
  // If accessing via /game-name path
  if (!categoryId && gameNameMap[path]) {
    filterValue = gameNameMap[path];
    filterType = "game";
  }
  
  // Find category info
  const category = CATEGORIES.find((c) => c.id === filterValue);
  
  // Filter products
  let filteredProducts: typeof PRODUCTS = [];
  
  if (filterType === "game") {
    // Filter by game name
    filteredProducts = PRODUCTS.filter((p) => p.game === filterValue);
  } else {
    // Filter by category
    filteredProducts = PRODUCTS.filter((p) => p.category === filterValue);
    
    // If no products found by category, try by game name
    if (filteredProducts.length === 0) {
      const gameName = filterValue.charAt(0).toUpperCase() + filterValue.slice(1).replace(/-/g, " ");
      filteredProducts = PRODUCTS.filter((p) => 
        p.game.toLowerCase() === gameName.toLowerCase()
      );
    }
  }
  
  // Get display name
  const displayName = category?.name || 
    gameNameMap[path] ||
    (filterValue.charAt(0).toUpperCase() + filterValue.slice(1).replace(/-/g, " "));

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link to="/" className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
            <Home className="w-4 h-4" />
            Beranda
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <span className="text-white">{displayName}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{displayName}</h1>
          <p className="text-slate-400">
            Temukan {filteredProducts.length} produk {displayName} terbaik dengan harga terjangkau
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📦</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Belum Ada Produk
            </h3>
            <p className="text-slate-400 mb-6">
              Produk untuk {displayName} sedang dalam persiapan
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

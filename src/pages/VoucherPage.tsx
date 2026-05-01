import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/config";

export function VoucherPage() {
  // Filter produk voucher (giftcard dan steam)
  const voucherProducts = PRODUCTS.filter(
    (p) => p.category === "giftcard" || p.game === "Steam"
  );

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link to="/" className="text-slate-400 hover:text-white flex items-center gap-1">
            <Home className="w-4 h-4" />
            Beranda
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <span className="text-white">Voucher Game</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Voucher Game
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Beli voucher game dengan harga terbaik. Tersedia Steam Wallet, 
            Google Play, iTunes, dan berbagai voucher game lainnya.
          </p>
        </div>

        {/* Products */}
        {voucherProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {voucherProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🎫</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Voucher Sedang Dipersiapkan
            </h3>
            <p className="text-slate-400 mb-6">
              Voucher game akan segera tersedia. Nantikan update dari kami!
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

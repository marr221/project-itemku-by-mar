import { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "@/data/config";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductsSectionProps {
  title?: string;
  filter?: "all" | "popular" | string;
  limit?: number;
  showPagination?: boolean;
  showViewAll?: boolean;
  viewAllLink?: string;
}

export function ProductsSection({
  title = "Produk Unggulan",
  filter = "all",
  limit = 8,
  showPagination = false,
  showViewAll = true,
  viewAllLink = "/topup",
}: ProductsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter products
  let filteredProducts = PRODUCTS;
  if (filter === "popular") {
    filteredProducts = PRODUCTS.filter((p) => p.popular);
  } else if (filter !== "all") {
    filteredProducts = PRODUCTS.filter(
      (p) => p.category === filter || p.game.toLowerCase() === filter.toLowerCase()
    );
  }

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = showPagination
    ? filteredProducts.slice(startIndex, startIndex + itemsPerPage)
    : filteredProducts.slice(0, limit);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          {showViewAll && (
            <Link
              to={viewAllLink}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              Lihat Semua
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {paginatedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">Tidak ada produk yang tersedia</p>
          </div>
        )}

        {/* Pagination */}
        {showPagination && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border-slate-600 text-white hover:bg-slate-800 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "border-slate-600 text-white hover:bg-slate-800"
                }
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="border-slate-600 text-white hover:bg-slate-800 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

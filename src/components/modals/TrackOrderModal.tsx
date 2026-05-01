import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getOrderById, getOrdersByUser, type Order } from "@/data/orders";
import { useAuth } from "@/contexts/AuthContext";
import {
  Search,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TrackOrderModal({ isOpen, onClose }: TrackOrderModalProps) {
  const { isLoggedIn, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<Order | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Load user orders saat modal dibuka
  const handleOpenChange = (open: boolean) => {
    if (open && isLoggedIn && user) {
      const orders = getOrdersByUser(user.id);
      setUserOrders(orders.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    }
    if (!open) {
      resetSearch();
      onClose();
    }
  };

  const resetSearch = () => {
    setSearchQuery("");
    setSearchResult(null);
    setError("");
    setExpandedOrder(null);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError("");
    setSearchResult(null);

    // Cari order berdasarkan ID
    const order = getOrderById(searchQuery.trim().toUpperCase());

    if (order) {
      setSearchResult(order);
    } else {
      setError("Pesanan tidak ditemukan. Periksa kembali nomor pesanan Anda.");
    }

    setIsSearching(false);
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending_payment":
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case "processing":
        return <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getStatusLabel = (status: Order["status"]) => {
    const labels = {
      pending_payment: "Menunggu Pembayaran",
      processing: "Sedang Diproses",
      completed: "Selesai",
      cancelled: "Dibatalkan",
    };
    return labels[status];
  };

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      pending_payment: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
      processing: "bg-blue-500/20 text-blue-400 border-blue-500/50",
      completed: "bg-green-500/20 text-green-400 border-green-500/50",
      cancelled: "bg-red-500/20 text-red-400 border-red-500/50",
    };
    return colors[status];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const OrderCard = ({ order, isExpanded, onToggle }: { 
    order: Order; 
    isExpanded: boolean;
    onToggle: () => void;
  }) => (
    <div className="bg-slate-800 rounded-lg overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-slate-750 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
            </div>
            <div>
              <p className="font-semibold text-white">{order.id}</p>
              <p className="text-sm text-slate-400">{formatDate(order.createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
              {getStatusLabel(order.status)}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-slate-700">
          <div className="pt-4 space-y-4">
            {/* Items */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-400">Detail Produk:</p>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-slate-900 p-3 rounded-lg">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-slate-400">{item.product.game}</p>
                    {item.gameId && (
                      <p className="text-xs text-slate-500">
                        ID: {item.gameId}
                        {item.gameServer && ` | Server: ${item.gameServer}`}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">x{item.quantity}</p>
                    <p className="text-xs text-blue-400">
                      Rp {(item.product.discountedPrice * item.quantity).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-700">
              <span className="text-slate-400">Total Pembayaran</span>
              <span className="text-lg font-bold text-blue-400">
                Rp {order.totalPrice.toLocaleString("id-ID")}
              </span>
            </div>

            {/* WhatsApp Link */}
            {order.whatsappLink && (
              <a
                href={order.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="outline"
                  className="w-full border-green-600 text-green-400 hover:bg-green-600/20"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Hubungi Admin via WhatsApp
                </Button>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-slate-900 border-slate-700 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6" />
            Lacak Pesanan
          </DialogTitle>
        </DialogHeader>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="order-id">Nomor Pesanan</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="order-id"
                  type="text"
                  placeholder="Contoh: GM-000001"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 pr-10 uppercase"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              </div>
              <Button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSearching ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Cari"
                )}
              </Button>
            </div>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Search Result */}
        {searchResult && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded-full" />
              <h3 className="font-semibold text-white">Hasil Pencarian</h3>
            </div>
            <OrderCard
              order={searchResult}
              isExpanded={expandedOrder === searchResult.id}
              onToggle={() =>
                setExpandedOrder(
                  expandedOrder === searchResult.id ? null : searchResult.id
                )
              }
            />
          </div>
        )}

        {/* User Orders (if logged in) */}
        {isLoggedIn && userOrders.length > 0 && !searchResult && (
          <div className="space-y-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded-full" />
              <h3 className="font-semibold text-white">Pesanan Saya</h3>
            </div>
            <div className="space-y-3">
              {userOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  isExpanded={expandedOrder === order.id}
                  onToggle={() =>
                    setExpandedOrder(
                      expandedOrder === order.id ? null : order.id
                    )
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {isLoggedIn && userOrders.length === 0 && !searchResult && !error && (
          <div className="text-center py-8">
            <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Anda belum memiliki pesanan</p>
            <p className="text-slate-500 text-sm mt-2">
              Pesan produk dan lacak statusnya di sini
            </p>
          </div>
        )}

        {/* Guest Info */}
        {!isLoggedIn && !searchResult && !error && (
          <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg mt-4">
            <p className="text-sm text-blue-300">
              Login untuk melihat semua pesanan Anda. Atau cari menggunakan nomor
              pesanan yang telah dikirim ke WhatsApp Anda.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

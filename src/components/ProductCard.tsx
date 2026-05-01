import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import type { Product } from "@/data/config";
import { Star, ShoppingCart, Check, Loader2, MessageCircle } from "lucide-react";
import {
  createOrder,
  formatOrderForWhatsApp,
  generateWhatsAppLink,
  updateOrderWhatsAppLink,
} from "@/data/orders";
import { WHATSAPP_CONFIG } from "@/data/config";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const { isLoggedIn, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState<{
    orderId: string;
    whatsappLink: string;
  } | null>(null);

  // Form states
  const [gameId, setGameId] = useState("");
  const [gameServer, setGameServer] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    addToCart({
      product,
      quantity,
      gameId: gameId || undefined,
      gameServer: gameServer || undefined,
      notes: notes || undefined,
    });
    setIsAdding(false);
    setIsModalOpen(false);
    resetForm();
  };

  const handleBuyNow = async () => {
    setIsCheckingOut(true);

    try {
      const userName = isLoggedIn ? user!.name : "Guest";
      const userEmail = isLoggedIn ? user!.email : "guest@email.com";
      const userPhone = isLoggedIn ? user!.phone || "" : "";
      const userId = isLoggedIn ? user!.id : `guest_${Date.now()}`;

      // Create order
      const order = createOrder(
        userId,
        userName,
        userEmail,
        userPhone,
        [{ product, quantity, gameId: gameId || undefined, gameServer: gameServer || undefined, notes: notes || undefined }],
        product.discountedPrice * quantity
      );

      // Generate WhatsApp message
      const message = formatOrderForWhatsApp(order);
      const whatsappLink = generateWhatsAppLink(WHATSAPP_CONFIG.phoneNumber, message);

      // Update order dengan WhatsApp link
      updateOrderWhatsAppLink(order.id, whatsappLink);

      // Show success
      setOrderComplete({
        orderId: order.id,
        whatsappLink,
      });
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const resetForm = () => {
    setGameId("");
    setGameServer("");
    setQuantity(1);
    setNotes("");
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsBuyModalOpen(false);
    setOrderComplete(null);
    resetForm();
  };

  const alreadyInCart = isInCart(product.id);

  return (
    <>
      <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-blue-500/10 group">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.discount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}
            </span>
          )}
          {product.stock < 10 && (
            <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
              Stok: {product.stock}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-slate-500 mb-1">{product.game}</p>
          <h3 className="text-sm font-medium text-white line-clamp-2 mb-2 min-h-[40px]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-white">{product.rating}</span>
            <span className="text-xs text-slate-500">({product.reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="mb-3">
            <p className="text-xs text-slate-500 line-through">
              Rp {product.originalPrice.toLocaleString("id-ID")}
            </p>
            <p className="text-lg font-bold text-blue-400">
              Rp {product.discountedPrice.toLocaleString("id-ID")}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="outline"
              size="sm"
              className={`flex-1 border-slate-600 text-white hover:bg-slate-800 ${
                alreadyInCart ? "border-green-600 text-green-400" : ""
              }`}
            >
              {alreadyInCart ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  Di Keranjang
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  + Keranjang
                </>
              )}
            </Button>
            <Button
              onClick={() => setIsBuyModalOpen(true)}
              size="sm"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Beli
            </Button>
          </div>
        </div>
      </div>

      {/* Add to Cart Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Tambah ke Keranjang</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Product Info */}
            <div className="flex gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-medium text-white">{product.name}</h4>
                <p className="text-sm text-slate-400">{product.game}</p>
                <p className="text-blue-400 font-bold mt-1">
                  Rp {product.discountedPrice.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="game-id">ID Game (Opsional)</Label>
                <Input
                  id="game-id"
                  type="text"
                  placeholder="Masukkan ID game"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="game-server">Server (Opsional)</Label>
                <Input
                  id="game-server"
                  type="text"
                  placeholder="Masukkan server"
                  value={gameServer}
                  onChange={(e) => setGameServer(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Jumlah</Label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700"
                  >
                    -
                  </button>
                  <Input
                    id="quantity"
                    type="number"
                    min={1}
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-20 bg-slate-800 border-slate-700 text-white text-center"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Catatan (Opsional)</Label>
                <Input
                  id="notes"
                  type="text"
                  placeholder="Catatan tambahan"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-700">
              <span className="text-slate-400">Total</span>
              <span className="text-xl font-bold text-blue-400">
                Rp {(product.discountedPrice * quantity).toLocaleString("id-ID")}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-slate-600 text-white hover:bg-slate-800"
              >
                Batal
              </Button>
              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isAdding ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Tambah
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Buy Now Modal */}
      <Dialog open={isBuyModalOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
          {!orderComplete ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Beli Sekarang</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* Product Info */}
                <div className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-white">{product.name}</h4>
                    <p className="text-sm text-slate-400">{product.game}</p>
                    <p className="text-blue-400 font-bold mt-1">
                      Rp {product.discountedPrice.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="buy-game-id">ID Game (Opsional)</Label>
                    <Input
                      id="buy-game-id"
                      type="text"
                      placeholder="Masukkan ID game"
                      value={gameId}
                      onChange={(e) => setGameId(e.target.value)}
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buy-game-server">Server (Opsional)</Label>
                    <Input
                      id="buy-game-server"
                      type="text"
                      placeholder="Masukkan server"
                      value={gameServer}
                      onChange={(e) => setGameServer(e.target.value)}
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buy-quantity">Jumlah</Label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700"
                      >
                        -
                      </button>
                      <Input
                        id="buy-quantity"
                        type="number"
                        min={1}
                        max={product.stock}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className="w-20 bg-slate-800 border-slate-700 text-white text-center"
                      />
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buy-notes">Catatan (Opsional)</Label>
                    <Input
                      id="buy-notes"
                      type="text"
                      placeholder="Catatan tambahan"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                  <span className="text-slate-400">Total</span>
                  <span className="text-xl font-bold text-blue-400">
                    Rp {(product.discountedPrice * quantity).toLocaleString("id-ID")}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1 border-slate-600 text-white hover:bg-slate-800"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    disabled={isCheckingOut}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {isCheckingOut ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Beli via WA
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center space-y-6 py-4">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-green-400">
                  Pesanan Berhasil!
                </DialogTitle>
              </DialogHeader>

              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-10 h-10 text-green-400" />
              </div>

              <div className="space-y-2">
                <p className="text-slate-400">Nomor Pesanan Anda:</p>
                <p className="text-3xl font-bold text-white">{orderComplete.orderId}</p>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-sm text-slate-400">
                  Silakan lanjutkan pembayaran melalui WhatsApp
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={orderComplete.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Lanjutkan ke WhatsApp
                  </Button>
                </a>

                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="w-full border-slate-600 text-white hover:bg-slate-800"
                >
                  Tutup
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

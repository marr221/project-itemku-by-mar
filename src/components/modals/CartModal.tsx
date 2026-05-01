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
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  Loader2,
  MessageCircle,
} from "lucide-react";
import {
  createOrder,
  formatOrderForWhatsApp,
  generateWhatsAppLink,
  updateOrderWhatsAppLink,
} from "@/data/orders";
import { WHATSAPP_CONFIG } from "@/data/config";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export function CartModal({ isOpen, onClose, onLoginClick }: CartModalProps) {
  const { items, itemCount, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const { isLoggedIn, user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [orderComplete, setOrderComplete] = useState<{
    orderId: string;
    whatsappLink: string;
  } | null>(null);

  // Form checkout untuk guest (jika tidak login)
  const [guestData, setGuestData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      setShowCheckoutForm(true);
      return;
    }

    await processCheckout();
  };

  const processCheckout = async () => {
    setIsCheckingOut(true);

    try {
      const userName = isLoggedIn ? user!.name : guestData.name;
      const userEmail = isLoggedIn ? user!.email : guestData.email;
      const userPhone = isLoggedIn ? user!.phone || "" : guestData.phone;
      const userId = isLoggedIn ? user!.id : `guest_${Date.now()}`;

      // Create order
      const order = createOrder(
        userId,
        userName,
        userEmail,
        userPhone,
        items,
        totalPrice
      );

      // Generate WhatsApp message
      const message = formatOrderForWhatsApp(order);
      const whatsappLink = generateWhatsAppLink(WHATSAPP_CONFIG.phoneNumber, message);

      // Update order dengan WhatsApp link
      updateOrderWhatsAppLink(order.id, whatsappLink);

      // Clear cart
      clearCart();

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

  const handleGuestCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    await processCheckout();
  };

  const resetModal = () => {
    setShowCheckoutForm(false);
    setOrderComplete(null);
    setGuestData({ name: "", email: "", phone: "" });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  // Order Complete View
  if (orderComplete) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px] bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-green-400">
              Pesanan Berhasil Dibuat!
            </DialogTitle>
          </DialogHeader>

          <div className="text-center space-y-6 py-4">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="w-10 h-10 text-green-400" />
            </div>

            <div className="space-y-2">
              <p className="text-slate-400">Nomor Pesanan Anda:</p>
              <p className="text-3xl font-bold text-white">{orderComplete.orderId}</p>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg space-y-3">
              <p className="text-sm text-slate-400">
                Silakan lanjutkan pembayaran melalui WhatsApp. Klik tombol di bawah untuk
                mengirim detail pesanan ke admin.
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

            <p className="text-xs text-slate-500">
              Simpan nomor pesanan Anda untuk melacak status pesanan
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Guest Checkout Form
  if (showCheckoutForm && !isLoggedIn) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Data Pembeli</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleGuestCheckout} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="guest-name">Nama Lengkap</Label>
              <Input
                id="guest-name"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={guestData.name}
                onChange={(e) => setGuestData({ ...guestData, name: e.target.value })}
                required
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guest-email">Email</Label>
              <Input
                id="guest-email"
                type="email"
                placeholder="nama@email.com"
                value={guestData.email}
                onChange={(e) => setGuestData({ ...guestData, email: e.target.value })}
                required
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guest-phone">Nomor Telepon</Label>
              <Input
                id="guest-phone"
                type="tel"
                placeholder="08123456789"
                value={guestData.phone}
                onChange={(e) => setGuestData({ ...guestData, phone: e.target.value })}
                required
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCheckoutForm(false)}
                className="flex-1 border-slate-600 text-white hover:bg-slate-800"
              >
                Kembali
              </Button>
              <Button
                type="submit"
                disabled={isCheckingOut}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Lanjutkan"
                )}
              </Button>
            </div>

            <p className="text-center text-sm text-slate-400">
              Atau{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLoginClick();
                }}
                className="text-blue-400 hover:text-blue-300"
              >
                login
              </button>{" "}
              untuk checkout lebih cepat
            </p>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] bg-slate-900 border-slate-700 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Keranjang Belanja
            {itemCount > 0 && (
              <span className="text-sm font-normal text-slate-400">
                ({itemCount} item)
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Keranjang belanja Anda kosong</p>
            <p className="text-slate-500 text-sm mt-2">
              Tambahkan produk untuk memulai belanja
            </p>
            <Button
              onClick={handleClose}
              className="mt-6 bg-blue-600 hover:bg-blue-700"
            >
              Lanjutkan Belanja
            </Button>
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {/* Cart Items */}
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 bg-slate-800 p-4 rounded-lg"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-slate-400">{item.product.game}</p>
                    <p className="text-blue-400 font-semibold mt-1">
                      Rp {item.product.discountedPrice.toLocaleString("id-ID")}
                    </p>
                    {item.gameId && (
                      <p className="text-xs text-slate-500 mt-1">
                        ID: {item.gameId}
                        {item.gameServer && ` | Server: ${item.gameServer}`}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-7 h-7 bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-600"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-7 h-7 bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-slate-700 pt-4 space-y-3">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white">
                <span>Total</span>
                <span className="text-blue-400">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              {!isLoggedIn && (
                <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                  <p className="text-sm text-blue-300">
                    Anda belum login.{" "}
                    <button
                      onClick={() => {
                        onClose();
                        onLoginClick();
                      }}
                      className="font-semibold underline"
                    >
                      Login
                    </button>{" "}
                    untuk checkout lebih cepat atau lanjutkan sebagai tamu.
                  </p>
                </div>
              )}

              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Checkout via WhatsApp
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleClose}
                className="w-full border-slate-600 text-white hover:bg-slate-800"
              >
                Lanjutkan Belanja
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

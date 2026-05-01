// ============================================
// FILE KONFIGURASI - EDIT DI SINI UNTUK MENGUBAH
// PRODUK, STOK, HALAMAN, DAN PENGATURAN LAINNYA
// ============================================

// Konfigurasi WhatsApp untuk Checkout
export const WHATSAPP_CONFIG = {
  // Ganti dengan nomor WhatsApp Anda (format: 6285136506343)
  phoneNumber: "6285136506343",
  // Pesan default yang akan dikirim
  defaultMessage: "Halo GameMarket, saya ingin memesan:",
};

// Konfigurasi Website
export const SITE_CONFIG = {
  name: "GameMarket",
  tagline: "Marketplace Gaming Terbesar & Terpercaya",
  logo: "/logo.png",
  // Warna tema (tailwind colors)
  theme: {
    primary: "blue-600",
    secondary: "purple-600",
    accent: "yellow-400",
  },
};

// Data Kategori Produk
export const CATEGORIES = [
  { id: "topup", name: "Top Up", icon: "Zap", color: "bg-blue-500" },
  { id: "roblox", name: "Roblox", icon: "Gamepad2", color: "bg-red-500" },
  { id: "giftcard", name: "Gift Card", icon: "Gift", color: "bg-green-500" },
  { id: "akun", name: "Akun Game", icon: "User", color: "bg-orange-500" },
  { id: "item", name: "Item", icon: "Package", color: "bg-pink-500" },
  { id: "currency", name: "Currency", icon: "Coins", color: "bg-yellow-500" },
  { id: "joki", name: "Joki", icon: "Trophy", color: "bg-indigo-500" },
];

// Data Produk - TAMBAH/EDIT/HAPUS PRODUK DI SINI
export interface Product {
  id: string;
  name: string;
  category: string;
  game: string;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  rating: number;
  reviews: number;
  image: string;
  stock: number; // Stok produk
  description: string;
  popular: boolean;
}

export const PRODUCTS: Product[] = [
  // Mobile Legends Products
  {
    id: "ml-1",
    name: "AKUN ML MURMER",
    category: "akun",
    game: "Mobile Legends",
    originalPrice: 19000000,
    discountedPrice: 1000000,
    discount: "-94,74%",
    rating: 4.9,
    reviews: 3420,
    image: "https://i.ibb.co.com/tMdVw2TQ/kali-ini-pilihan-ada-ditanganku.jpg",
    stock: 100,
    description: "Weekly Diamond Pass Mobile Legends - Dapatkan diamond setiap hari selama 7 hari",
    popular: true,
  },
];

// Data Banner/Promo - EDIT PROMO DI SINI
export const BANNERS = [
  {
    id: 1,
    title: "Mega Sale Robux",
    subtitle: "Diskon hingga 20% untuk semua nominal Robux",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800",
    cta: "Beli Sekarang",
    link: "/roblox",
    color: "from-red-600 to-orange-600",
  },
  {
    id: 2,
    title: "Mobile Legends Top Up",
    subtitle: "Bonus diamond hingga 10% untuk top up besar",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
    cta: "Top Up Sekarang",
    link: "/mobile-legends",
    color: "from-blue-600 to-purple-600",
  },
  {
    id: 3,
    title: "Steam Wallet Promo",
    subtitle: "Diskon 8% untuk semua nominal Steam Wallet",
    image: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=800",
    cta: "Beli Voucher",
    link: "/steam",
    color: "from-gray-700 to-gray-900",
  },
];

// Status Pesanan
export const ORDER_STATUS = {
  PENDING_PAYMENT: { label: "Menunggu Pembayaran", color: "yellow" },
  PROCESSING: { label: "Sedang Diproses", color: "blue" },
  COMPLETED: { label: "Selesai", color: "green" },
  CANCELLED: { label: "Dibatalkan", color: "red" },
} as const;

// Cara Pembayaran
export const PAYMENT_METHODS = [
  { id: "dana", name: "DANA", icon: "Wallet" },
  { id: "gopay", name: "GoPay", icon: "Wallet" },
  { id: "ovo", name: "OVO", icon: "Wallet" },
  { id: "shopeepay", name: "ShopeePay", icon: "Wallet" },
  { id: "transfer", name: "Transfer Bank", icon: "Building2" },
  { id: "qris", name: "QRIS", icon: "QrCode" },
];

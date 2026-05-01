# GameMarket - Website Marketplace Gaming

Website marketplace gaming lengkap dengan sistem autentikasi, cart, checkout WhatsApp, dan tracking pesanan.

## Fitur Utama

### 1. Sistem Autentikasi
- Login dan Register dengan localStorage
- Setelah login, navbar menampilkan profil user (bukan tombol masuk/daftar)
- Data user tersimpan di browser

### 2. Keranjang Belanja (Cart)
- Tambah produk ke keranjang
- Edit jumlah dan detail produk
- Hapus item dari keranjang
- Data cart tersimpan di localStorage

### 3. Checkout WhatsApp
- Saat checkout, otomatis dibuat nomor pesanan unik (format: GM-XXXXXX)
- Pelanggan diarahkan ke WhatsApp admin dengan pesan otomatis
- Nomor WhatsApp admin: **6285136506343**

### 4. Tracking Pesanan
- Halaman untuk melacak status pesanan
- Status: Menunggu Pembayaran, Sedang Diproses, Selesai, Dibatalkan
- User yang login dapat melihat semua pesanan mereka

## File Konfigurasi

### `src/data/config.ts`
File utama untuk mengedit:
- **Produk**: Tambah/edit/hapus produk
- **Kategori**: Ubah kategori produk
- **Banner**: Edit banner promo
- **WhatsApp**: Ganti nomor WhatsApp admin
- **Stok**: Kelola stok produk

```typescript
// Ganti nomor WhatsApp admin
export const WHATSAPP_CONFIG = {
  phoneNumber: "6285136506343", // <-- Ganti di sini
};

// Tambah/Edit Produk
export const PRODUCTS: Product[] = [
  {
    id: "ml-1",
    name: "Nama Produk",
    category: "topup",
    game: "Mobile Legends",
    originalPrice: 35000,
    discountedPrice: 28000,
    discount: "-20%",
    stock: 100, // <-- Stok produk
    // ...
  },
];
```

## Struktur Folder

```
app/
├── src/
│   ├── components/       # Komponen reusable
│   │   ├── Navbar.tsx   # Navbar dengan profil user
│   │   ├── ProductCard.tsx # Card produk
│   │   └── modals/      # Modal components
│   │       ├── AuthModal.tsx    # Login/Register
│   │       ├── CartModal.tsx    # Keranjang
│   │       └── TrackOrderModal.tsx # Tracking pesanan
│   ├── contexts/        # React Context
│   │   ├── AuthContext.tsx  # State autentikasi
│   │   └── CartContext.tsx  # State keranjang
│   ├── data/           # Data & Konfigurasi
│   │   ├── config.ts   # Konfigurasi produk, WhatsApp, dll
│   │   └── orders.ts   # Fungsi database pesanan
│   ├── sections/       # Section halaman
│   │   ├── HeroSection.tsx
│   │   ├── CategorySection.tsx
│   │   ├── ProductsSection.tsx
│   │   └── FooterSection.tsx
│   ├── App.tsx         # Komponen utama
│   └── main.tsx        # Entry point
├── dist/               # Build output (untuk deploy)
└── index.html
```

## Cara Mengedit

### Menambah Produk Baru
1. Buka `src/data/config.ts`
2. Tambahkan objek produk baru di array `PRODUCTS`
3. Isi semua field yang diperlukan

### Mengganti Nomor WhatsApp
1. Buka `src/data/config.ts`
2. Cari `WHATSAPP_CONFIG`
3. Ganti `phoneNumber` dengan nomor baru (format: 628xx)

### Mengubah Stok Produk
1. Buka `src/data/config.ts`
2. Cari produk yang ingin diubah
3. Edit field `stock`

### Menambah Kategori
1. Buka `src/data/config.ts`
2. Tambahkan kategori baru di array `CATEGORIES`
3. Pilih icon dari Lucide React

## Database (LocalStorage)

Website ini menggunakan localStorage sebagai database:

- `gamemarket_user` - Data user yang login
- `gamemarket_users` - Database semua user
- `gamemarket_cart` - Data keranjang
- `gamemarket_orders` - Database pesanan
- `gamemarket_order_counter` - Counter nomor pesanan

## Build & Deploy

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Deploy folder 'dist'
```

## Teknologi

- React + TypeScript + Vite
- Tailwind CSS
- shadcn/ui components
- Lucide React icons

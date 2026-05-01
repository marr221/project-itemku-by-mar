import { Link } from "react-router-dom";
import { ChevronRight, Home, ShoppingCart, MessageCircle, CheckCircle } from "lucide-react";

export function HowToBuyPage() {
  const steps = [
    {
      number: "01",
      title: "Pilih Produk",
      description: "Cari dan pilih produk game yang ingin Anda beli dari katalog kami.",
      icon: ShoppingCart,
    },
    {
      number: "02",
      title: "Tambah ke Keranjang",
      description: "Klik tombol 'Beli' atau 'Tambah ke Keranjang' untuk memilih produk.",
      icon: ShoppingCart,
    },
    {
      number: "03",
      title: "Checkout",
      description: "Isi data ID game dan server (jika diperlukan), lalu klik checkout.",
      icon: CheckCircle,
    },
    {
      number: "04",
      title: "Pembayaran via WhatsApp",
      description: "Anda akan diarahkan ke WhatsApp admin untuk melakukan pembayaran.",
      icon: MessageCircle,
    },
    {
      number: "05",
      title: "Proses Pengiriman",
      description: "Setelah pembayaran dikonfirmasi, pesanan akan segera diproses.",
      icon: CheckCircle,
    },
  ];

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
          <span className="text-white">Cara Pembelian</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Cara Pembelian
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Ikuti langkah-langkah mudah berikut untuk melakukan pembelian di GameMarket
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-start gap-6 hover:border-slate-700 transition-colors"
              >
                <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-2xl font-bold text-blue-400">{step.number}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-slate-400 mb-4">Siap untuk berbelanja?</p>
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-colors"
            >
              Lihat Produk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

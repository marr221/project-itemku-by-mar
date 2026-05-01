import { Link } from "react-router-dom";
import { ChevronRight, Home, MessageCircle } from "lucide-react";
import { WHATSAPP_CONFIG } from "@/data/config";

export function CurrencyPage() {
  const currencies = [
    {
      game: "Old School RuneScape",
      name: "OSRS Gold",
      price: "1M = Rp 15.000",
      minOrder: "10M",
    },
    {
      game: "RuneScape 3",
      name: "RS3 Gold",
      price: "10M = Rp 10.000",
      minOrder: "100M",
    },
    {
      game: "World of Warcraft",
      name: "WoW Gold",
      price: "100K = Rp 50.000",
      minOrder: "500K",
    },
    {
      game: "Lost Ark",
      name: "Lost Ark Gold",
      price: "10K = Rp 25.000",
      minOrder: "50K",
    },
    {
      game: "Albion Online",
      name: "Silver",
      price: "1M = Rp 20.000",
      minOrder: "10M",
    },
    {
      game: "EVE Online",
      name: "ISK",
      price: "1B = Rp 100.000",
      minOrder: "5B",
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
          <span className="text-white">Currency</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Game Currency
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Beli gold, silver, dan currency untuk MMORPG favorit Anda. 
            Harga kompetitif dan pengiriman cepat!
          </p>
        </div>

        {/* Currency List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currencies.map((curr, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
            >
              <div className="mb-4">
                <span className="text-sm text-slate-500">{curr.game}</span>
                <h3 className="text-xl font-semibold text-white">{curr.name}</h3>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">Harga:</span>
                  <span className="text-blue-400 font-medium">{curr.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Min. Order:</span>
                  <span className="text-white">{curr.minOrder}</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=Halo, saya ingin beli ${curr.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
              >
                Pesan
              </a>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            Informasi Penting
          </h3>
          <ul className="space-y-3 text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Semua transaksi dilakukan via trade in-game yang aman</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Waktu pengiriman 15-30 menit setelah pembayaran</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Garansi 100% - uang kembali jika tidak terkirim</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Support 24/7 untuk semua transaksi</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">
            Butuh currency untuk game lain?
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=Halo, saya mencari currency untuk game...`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Tanya Admin
          </a>
        </div>
      </div>
    </div>
  );
}

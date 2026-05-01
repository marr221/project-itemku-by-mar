import { Link } from "react-router-dom";
import { ChevronRight, Home, MessageCircle } from "lucide-react";
import { WHATSAPP_CONFIG } from "@/data/config";

export function GameKeyPage() {
  const gameKeys = [
    {
      game: "Minecraft",
      platform: "PC",
      price: 350000,
      originalPrice: 450000,
    },
    {
      game: "GTA V",
      platform: "Rockstar",
      price: 280000,
      originalPrice: 350000,
    },
    {
      game: "The Witcher 3",
      platform: "Steam",
      price: 150000,
      originalPrice: 200000,
    },
    {
      game: "Cyberpunk 2077",
      platform: "GOG",
      price: 450000,
      originalPrice: 600000,
    },
    {
      game: "Elden Ring",
      platform: "Steam",
      price: 550000,
      originalPrice: 700000,
    },
    {
      game: "Red Dead Redemption 2",
      platform: "Rockstar",
      price: 380000,
      originalPrice: 500000,
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
          <span className="text-white">Game Key</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Game Key
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Beli game key original untuk PC dengan harga terjangkau. 
            Aktivasi instant via Steam, Epic Games, GOG, dan platform lainnya.
          </p>
        </div>

        {/* Game Keys List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gameKeys.map((key, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{key.game}</h3>
                  <span className="text-sm text-slate-500">{key.platform}</span>
                </div>
                <span className="bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded">
                  Original
                </span>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500 line-through">
                    Rp {key.originalPrice.toLocaleString("id-ID")}
                  </p>
                  <p className="text-2xl font-bold text-blue-400">
                    Rp {key.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=Halo, saya ingin beli game key ${key.game}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
              >
                Beli Sekarang
              </a>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            Cara Pembelian Game Key
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-400 font-bold">1</span>
              </div>
              <h4 className="font-medium text-white mb-2">Pilih Game</h4>
              <p className="text-sm text-slate-400">Pilih game yang ingin Anda beli</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-400 font-bold">2</span>
              </div>
              <h4 className="font-medium text-white mb-2">Chat Admin</h4>
              <p className="text-sm text-slate-400">Hubungi admin via WhatsApp</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-400 font-bold">3</span>
              </div>
              <h4 className="font-medium text-white mb-2">Dapatkan Key</h4>
              <p className="text-sm text-slate-400">Key dikirim setelah pembayaran</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">
            Cari game yang tidak ada di daftar?
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=Halo, saya mencari game key...`}
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

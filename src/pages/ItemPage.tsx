import { Link } from "react-router-dom";
import { ChevronRight, Home, MessageCircle } from "lucide-react";
import { WHATSAPP_CONFIG } from "@/data/config";

export function ItemPage() {
  const items = [
    {
      game: "Mobile Legends",
      items: [
        { name: "Skin Epic", price: "150.000 - 300.000" },
        { name: "Skin Legend", price: "800.000 - 1.200.000" },
        { name: "Skin Collector", price: "500.000 - 800.000" },
        { name: "Recall Effect", price: "100.000 - 200.000" },
      ],
    },
    {
      game: "Free Fire",
      items: [
        { name: "Bundle Elite", price: "100.000 - 200.000" },
        { name: "Bundle Evo", price: "300.000 - 500.000" },
        { name: "Senjata Evolusi", price: "500.000 - 1.000.000" },
        { name: "Pet Langka", price: "150.000 - 300.000" },
      ],
    },
    {
      game: "PUBG Mobile",
      items: [
        { name: "Outfit Rare", price: "200.000 - 500.000" },
        { name: "Skin Senjata Mythic", price: "1.000.000+" },
        { name: "Vehicle Skin", price: "500.000 - 800.000" },
        { name: "Parachute Skin", price: "100.000 - 200.000" },
      ],
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
          <span className="text-white">Item Game</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Item Game
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Beli item langka, skin, dan equipment untuk game favorit Anda. 
            Skin epic, legend, dan limited edition tersedia!
          </p>
        </div>

        {/* Items by Game */}
        <div className="space-y-8 mb-12">
          {items.map((game, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">{game.game}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {game.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800 rounded-lg p-4 hover:bg-slate-750 transition-colors"
                  >
                    <h4 className="font-medium text-white mb-1">{item.name}</h4>
                    <p className="text-blue-400">Rp {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Cari Item Spesifik?
          </h3>
          <p className="text-white/80 mb-6">
            Hubungi kami untuk melihat stok item terbaru atau request item tertentu
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=Halo, saya ingin beli item game`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-purple-600 hover:bg-slate-100 px-8 py-4 rounded-lg font-medium transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Chat WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

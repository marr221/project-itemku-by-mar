import { Link } from "react-router-dom";
import { ChevronRight, Home, MessageCircle } from "lucide-react";
import { WHATSAPP_CONFIG } from "@/data/config";

export function GameAccountPage() {
  const accounts = [
    {
      game: "Mobile Legends",
      rank: "Mythic",
      price: 500000,
      features: ["100+ Hero", "200+ Skin", "Epic Skin 20+", "Squad Aktif"],
    },
    {
      game: "Free Fire",
      rank: "Grandmaster",
      price: 350000,
      features: ["50+ Karakter", "100+ Bundle", "Senjata Evolusi", "Pet Langka"],
    },
    {
      game: "PUBG Mobile",
      rank: "Ace",
      price: 750000,
      features: ["Royale Pass Max", "100+ Outfit", "Skin Senjata Rare", "Vehicle Skin"],
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
          <span className="text-white">Akun Game</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Akun Game
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Beli akun game berkualitas dengan rank tinggi, skin langka, 
            dan item eksklusif. Aman dan terpercaya!
          </p>
        </div>

        {/* Available Accounts */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {accounts.map((account, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{account.game}</h3>
                <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                  {account.rank}
                </span>
              </div>
              
              <ul className="space-y-2 mb-6">
                {account.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-400">
                    <span className="text-green-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Harga mulai dari</p>
                  <p className="text-2xl font-bold text-blue-400">
                    Rp {account.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=Halo, saya tertarik dengan akun ${account.game}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
              >
                Lihat Detail
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Cari Akun Spesifik?
          </h3>
          <p className="text-slate-400 mb-6">
            Hubungi kami untuk melihat stok akun terbaru atau request akun sesuai kebutuhan
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=Halo, saya ingin melihat stok akun game`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Chat WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

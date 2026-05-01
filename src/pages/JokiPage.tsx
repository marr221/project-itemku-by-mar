import { Link } from "react-router-dom";
import { ChevronRight, Home, MessageCircle, Star, Shield, Clock } from "lucide-react";
import { WHATSAPP_CONFIG } from "@/data/config";

export function JokiPage() {
  const services = [
    {
      game: "Mobile Legends",
      icon: "🏆",
      packages: [
        { name: "Rank Up", description: "Naik rank dari Epic ke Mythic", price: "150.000" },
        { name: "Win Rate", description: "Boost win rate 10 match", price: "75.000" },
        { name: "MCL", description: "Joki turnamen MCL", price: "50.000" },
      ],
    },
    {
      game: "Free Fire",
      icon: "🔥",
      packages: [
        { name: "Rank Up", description: "Naik rank dari Platinum ke Grandmaster", price: "100.000" },
        { name: "CS Ranked", description: "Push CS Ranked", price: "80.000" },
        { name: "Booyah", description: "Jaminan Booyah 5 match", price: "60.000" },
      ],
    },
    {
      game: "PUBG Mobile",
      icon: "🎯",
      packages: [
        { name: "Rank Up", description: "Naik rank dari Crown ke Ace", price: "200.000" },
        { name: "KD Boost", description: "Tingkatkan KD ratio", price: "120.000" },
        { name: "Conqueror", description: "Push ke Conqueror", price: "500.000" },
      ],
    },
  ];

  const guarantees = [
    { icon: Shield, title: "100% Aman", description: "Akun dijaga keamanannya" },
    { icon: Star, title: "Pro Player", description: "Dikerjakan oleh player berpengalaman" },
    { icon: Clock, title: "Cepat", description: "Pengerjaan 1-3 hari" },
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
          <span className="text-white">Joki Game</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Joki Game Profesional
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Naikkan rank Anda dengan bantuan pro player berpengalaman. 
            Aman, cepat, dan terpercaya!
          </p>
        </div>

        {/* Guarantees */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {guarantees.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center hover:border-slate-700 transition-colors"
            >
              <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Service Packages */}
        <div className="space-y-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{service.icon}</span>
                <h3 className="text-2xl font-semibold text-white">{service.game}</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {service.packages.map((pkg, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800 rounded-lg p-4 hover:bg-slate-750 transition-colors"
                  >
                    <h4 className="font-semibold text-white mb-1">{pkg.name}</h4>
                    <p className="text-sm text-slate-400 mb-3">{pkg.description}</p>
                    <p className="text-blue-400 font-bold">Rp {pkg.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Siap Naik Rank?
          </h3>
          <p className="text-white/80 mb-6">
            Hubungi kami sekarang untuk memulai joki. Gratis konsultasi!
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=Halo, saya ingin joki game`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-slate-100 px-8 py-4 rounded-lg font-medium transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Pesan Joki Sekarang
          </a>
        </div>
      </div>
    </div>
  );
}

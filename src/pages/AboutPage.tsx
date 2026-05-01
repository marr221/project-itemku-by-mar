import { Link } from "react-router-dom";
import { ChevronRight, Home, Shield, Clock, Headphones, Users } from "lucide-react";

export function AboutPage() {
  const stats = [
    { value: "50,000+", label: "Pelanggan Puas" },
    { value: "100,000+", label: "Transaksi Berhasil" },
    { value: "4.9/5", label: "Rating Rata-rata" },
    { value: "24/7", label: "Support Online" },
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Aman & Terpercaya",
      description: "Sistem transaksi yang aman dengan garansi uang kembali",
    },
    {
      icon: Clock,
      title: "Proses Cepat",
      description: "Pengiriman dalam 5-15 menit setelah pembayaran",
    },
    {
      icon: Headphones,
      title: "Support 24/7",
      description: "Tim support siap membantu kapan saja",
    },
    {
      icon: Users,
      title: "Komunitas Besar",
      description: "Bergabung dengan ribuan gamer di Indonesia",
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
          <span className="text-white">Tentang Kami</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tentang GameMarket
          </h1>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
            GameMarket adalah marketplace gaming terbesar dan terpercaya di Indonesia. 
            Kami menyediakan layanan top up game, voucher, gift card, dan item game 
            dengan harga terbaik dan proses yang cepat.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center hover:border-slate-700 transition-colors"
            >
              <p className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                {stat.value}
              </p>
              <p className="text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Mengapa Memilih Kami?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
              >
                <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Cerita Kami</h2>
          <div className="space-y-4 text-slate-400 leading-relaxed">
            <p>
              GameMarket didirikan dengan visi untuk menjadi platform terpercaya 
              bagi para gamer di Indonesia. Kami memahami kebutuhan gamer akan 
              layanan top up yang cepat, aman, dan terjangkau.
            </p>
            <p>
              Sejak berdiri, kami telah melayani puluhan ribu pelanggan dan 
              menyelesaikan ratusan ribu transaksi. Kepercayaan pelanggan adalah 
              prioritas utama kami, dan kami terus berinovasi untuk memberikan 
              pengalaman terbaik.
            </p>
            <p>
              Dengan dukungan tim yang berpengalaman dan sistem yang handal, 
              GameMarket siap menjadi partner terpercaya untuk semua kebutuhan 
              gaming Anda.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Siap Bergabung?
          </h3>
          <p className="text-slate-400 mb-6">
            Jadilah bagian dari komunitas gamer terbesar di Indonesia
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-colors"
          >
            Mulai Belanja
          </Link>
        </div>
      </div>
    </div>
  );
}

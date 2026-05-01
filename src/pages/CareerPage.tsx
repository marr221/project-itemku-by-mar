import { Link } from "react-router-dom";
import { ChevronRight, Home, MessageCircle } from "lucide-react";
import { WHATSAPP_CONFIG } from "@/data/config";

export function CareerPage() {
  const positions = [
    {
      title: "Customer Support",
      type: "Full-time",
      location: "Remote",
      description: "Bantu pelanggan menyelesaikan masalah dan menjawab pertanyaan.",
    },
    {
      title: "Content Writer",
      type: "Part-time",
      location: "Remote",
      description: "Buat konten menarik tentang game dan gaming.",
    },
    {
      title: "Social Media Admin",
      type: "Full-time",
      location: "Remote",
      description: "Kelola media sosial dan interaksi dengan komunitas.",
    },
  ];

  const benefits = [
    "Gaji kompetitif",
    "Bonus kinerja",
    "Jam kerja fleksibel",
    "Peluang karir",
    "Lingkungan kerja yang menyenangkan",
    "Diskon khusus karyawan",
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
          <span className="text-white">Karir</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Bergabung dengan Tim Kami
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Jadilah bagian dari tim GameMarket dan bantu kami membangun 
            marketplace gaming terbaik di Indonesia
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-white text-center mb-8">
            Keuntungan Bekerja di GameMarket
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-slate-800 rounded-lg p-4"
              >
                <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-blue-400 font-bold">✓</span>
                </div>
                <span className="text-white">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white text-center mb-8">
            Posisi yang Tersedia
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {positions.map((position, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {position.title}
                    </h3>
                    <p className="text-slate-400 mb-2">{position.description}</p>
                    <div className="flex gap-3">
                      <span className="text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full">
                        {position.type}
                      </span>
                      <span className="text-sm bg-green-600/20 text-green-400 px-3 py-1 rounded-full">
                        {position.location}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=Halo, saya tertarik dengan posisi ${position.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
                  >
                    Lamar Sekarang
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-slate-400 mb-4">
            Tidak menemukan posisi yang sesuai?
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=Halo, saya ingin mengirimkan lamaran spontan`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Kirim Lamaran Spontan
          </a>
        </div>
      </div>
    </div>
  );
}

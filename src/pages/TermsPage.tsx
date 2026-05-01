import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export function TermsPage() {
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
          <span className="text-white">Syarat & Ketentuan</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Syarat & Ketentuan
          </h1>
          <p className="text-slate-400">
            Terakhir diperbarui: 7 Maret 2026
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Ketentuan Umum</h2>
              <p className="text-slate-400 leading-relaxed">
                Dengan mengakses dan menggunakan layanan GameMarket, Anda menyetujui untuk 
                terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan 
                ketentuan ini, harap tidak menggunakan layanan kami.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Layanan</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                GameMarket menyediakan layanan:
              </p>
              <ul className="list-disc list-inside text-slate-400 space-y-2 ml-4">
                <li>Top up game online</li>
                <li>Penjualan voucher game</li>
                <li>Penjualan gift card</li>
                <li>Penjualan akun game</li>
                <li>Jasa joki game</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Pembelian dan Pembayaran</h2>
              <ul className="list-disc list-inside text-slate-400 space-y-2 ml-4">
                <li>Harga yang tertera dapat berubah sewaktu-waktu tanpa pemberitahuan</li>
                <li>Pembayaran harus dilakukan sesuai dengan metode yang tersedia</li>
                <li>Pesanan akan diproses setelah pembayaran dikonfirmasi</li>
                <li>Pastikan data game ID dan server yang dimasukkan benar</li>
                <li>Kesalahan input data bukan tanggung jawab GameMarket</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Pengiriman dan Proses</h2>
              <ul className="list-disc list-inside text-slate-400 space-y-2 ml-4">
                <li>Waktu pengiriman normal adalah 5-15 menit setelah pembayaran</li>
                <li>Di luar jam operasional, pesanan akan diproses keesokan harinya</li>
                <li>Anda akan menerima notifikasi saat pesanan selesai diproses</li>
                <li>Simpan nomor pesanan untuk keperluan tracking</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Pembatalan dan Refund</h2>
              <ul className="list-disc list-inside text-slate-400 space-y-2 ml-4">
                <li>Pesanan yang belum dibayar dapat dibatalkan kapan saja</li>
                <li>Pesanan yang sudah dibayar dan diproses tidak dapat dibatalkan</li>
                <li>Refund dapat diajukan jika terjadi kegagalan pengiriman</li>
                <li>Proses refund memerlukan waktu 3-7 hari kerja</li>
                <li>Keputusan refund berada di tangan pihak GameMarket</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Akun Pengguna</h2>
              <ul className="list-disc list-inside text-slate-400 space-y-2 ml-4">
                <li>Anda bertanggung jawab atas keamanan akun Anda</li>
                <li>Jangan membagikan informasi login kepada orang lain</li>
                <li>GameMarket tidak bertanggung jawab atas kehilangan akun akibat kelalaian pengguna</li>
                <li>Kami berhak menonaktifkan akun yang melanggar ketentuan</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Batasan Tanggung Jawab</h2>
              <p className="text-slate-400 leading-relaxed">
                GameMarket tidak bertanggung jawab atas kerugian yang disebabkan oleh:
                kesalahan input data pengguna, gangguan layanan pihak ketiga (game developer), 
                force majeure, atau penggunaan layanan yang melanggar hukum.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Perubahan Ketentuan</h2>
              <p className="text-slate-400 leading-relaxed">
                Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan 
                efektif segera setelah diposting di website. Penggunaan berkelanjutan atas 
                layanan kami berarti Anda menerima ketentuan yang diperbarui.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Hukum yang Berlaku</h2>
              <p className="text-slate-400 leading-relaxed">
                Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia. Setiap 
                perselisihan akan diselesaikan secara musyawarah atau melalui jalur 
                hukum yang berlaku.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Kontak</h2>
              <p className="text-slate-400 leading-relaxed">
                Untuk pertanyaan tentang syarat dan ketentuan ini, silakan hubungi 
                kami melalui WhatsApp atau email support@gamemarket.id
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export function PrivacyPage() {
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
          <span className="text-white">Kebijakan Privasi</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-slate-400">
            Terakhir diperbarui: 7 Maret 2026
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Informasi yang Kami Kumpulkan</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Kami mengumpulkan informasi yang Anda berikan secara langsung saat:
              </p>
              <ul className="list-disc list-inside text-slate-400 space-y-2 ml-4">
                <li>Mendaftar akun (nama, email, nomor telepon)</li>
                <li>Melakukan pembelian (data game ID, server)</li>
                <li>Menghubungi customer support</li>
                <li>Mengisi formulir atau survei</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Penggunaan Informasi</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Informasi yang kami kumpulkan digunakan untuk:
              </p>
              <ul className="list-disc list-inside text-slate-400 space-y-2 ml-4">
                <li>Memproses dan mengirim pesanan Anda</li>
                <li>Mengelola akun Anda</li>
                <li>Memberikan customer support</li>
                <li>Mengirim informasi penting tentang layanan</li>
                <li>Meningkatkan kualitas layanan kami</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Keamanan Data</h2>
              <p className="text-slate-400 leading-relaxed">
                Kami menggunakan teknologi enkripsi dan langkah-langkah keamanan yang sesuai 
                untuk melindungi informasi pribadi Anda. Data disimpan di localStorage browser 
                Anda dan tidak dibagikan ke pihak ketiga tanpa izin.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Cookie dan Teknologi Serupa</h2>
              <p className="text-slate-400 leading-relaxed">
                Kami menggunakan localStorage untuk menyimpan data akun, keranjang belanja, 
                dan riwayat pesanan Anda. Data ini hanya dapat diakses oleh browser Anda 
                dan tidak dibagikan ke server kami.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Hak Pengguna</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Anda memiliki hak untuk:
              </p>
              <ul className="list-disc list-inside text-slate-400 space-y-2 ml-4">
                <li>Mengakses data pribadi Anda</li>
                <li>Memperbarui informasi akun</li>
                <li>Menghapus akun dan data terkait</li>
                <li>Menolak penggunaan data untuk marketing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Perubahan Kebijakan</h2>
              <p className="text-slate-400 leading-relaxed">
                Kami dapat memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan akan 
                diumumkan di website kami. Penggunaan berkelanjutan atas layanan kami 
                setelah perubahan berarti Anda menerima kebijakan yang diperbarui.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Hubungi Kami</h2>
              <p className="text-slate-400 leading-relaxed">
                Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan 
                hubungi kami melalui WhatsApp atau email support@gamemarket.id
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home, ChevronDown, MessageCircle } from "lucide-react";
import { WHATSAPP_CONFIG } from "@/data/config";

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Bagaimana cara melakukan pembelian?",
      answer:
        "Pilih produk yang Anda inginkan, klik 'Beli' atau 'Tambah ke Keranjang', isi data ID game dan server (jika diperlukan), lalu klik checkout. Anda akan diarahkan ke WhatsApp admin untuk pembayaran.",
    },
    {
      question: "Berapa lama proses pengiriman?",
      answer:
        "Proses pengiriman biasanya memakan waktu 5-15 menit setelah pembayaran dikonfirmasi. Untuk pembelian di luar jam operasional, akan diproses pada hari berikutnya.",
    },
    {
      question: "Metode pembayaran apa saja yang tersedia?",
      answer:
        "Kami menerima pembayaran via DANA, GoPay, OVO, ShopeePay, LinkAja, Transfer Bank (BCA, BNI, BRI, Mandiri, BSI), dan QRIS.",
    },
    {
      question: "Apakah transaksi di GameMarket aman?",
      answer:
        "Ya, 100% aman. Kami telah melayani ribuan pelanggan dengan sistem yang terjamin keamanannya. Semua transaksi tercatat dan Anda akan mendapatkan nomor pesanan untuk tracking.",
    },
    {
      question: "Bagaimana cara melacak pesanan saya?",
      answer:
        "Anda dapat melacak pesanan dengan nomor pesanan (contoh: GM-000001) melalui menu 'Lacak Pesanan' di navbar atau halaman 'Pesanan Saya' jika Anda sudah login.",
    },
    {
      question: "Apa yang harus dilakukan jika pesanan belum diterima?",
      answer:
        "Jika pesanan belum diterima dalam waktu 30 menit setelah pembayaran, silakan hubungi admin kami via WhatsApp dengan menyertakan nomor pesanan Anda.",
    },
    {
      question: "Bisakah saya membatalkan pesanan?",
      answer:
        "Pesanan dapat dibatalkan jika belum dibayar. Jika sudah dibayar, pembatalan dapat dilakukan dengan menghubungi admin dan mengikuti kebijakan pengembalian dana.",
    },
    {
      question: "Apakah ada garansi untuk pembelian?",
      answer:
        "Ya, kami memberikan garansi untuk setiap pembelian. Jika terjadi masalah dengan pesanan Anda, kami akan membantu menyelesaikannya atau mengembalikan dana.",
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
          <span className="text-white">FAQ</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum tentang GameMarket
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-white mb-2">
              Masih punya pertanyaan?
            </h3>
            <p className="text-slate-400 mb-6">
              Jangan ragu untuk menghubungi kami langsung via WhatsApp
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

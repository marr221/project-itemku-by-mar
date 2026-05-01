import { Link } from "react-router-dom";
import { ChevronRight, Home, Wallet, Building2, QrCode } from "lucide-react";

export function PaymentMethodsPage() {
  const paymentMethods = [
    {
      id: "ewallet",
      title: "E-Wallet",
      icon: Wallet,
      methods: [
        { name: "DANA", description: "Pembayaran via aplikasi DANA" },
        { name: "GoPay", description: "Pembayaran via aplikasi Gojek" },
        { name: "OVO", description: "Pembayaran via aplikasi OVO" },
        { name: "ShopeePay", description: "Pembayaran via aplikasi Shopee" },
        { name: "LinkAja", description: "Pembayaran via aplikasi LinkAja" },
      ],
    },
    {
      id: "bank",
      title: "Transfer Bank",
      icon: Building2,
      methods: [
        { name: "BCA", description: "Transfer ke rekening BCA" },
        { name: "BNI", description: "Transfer ke rekening BNI" },
        { name: "BRI", description: "Transfer ke rekening BRI" },
        { name: "Mandiri", description: "Transfer ke rekening Mandiri" },
        { name: "BSI", description: "Transfer ke rekening BSI" },
      ],
    },
    {
      id: "qris",
      title: "QRIS",
      icon: QrCode,
      methods: [
        { name: "QRIS", description: "Scan QRIS dari semua aplikasi pembayaran" },
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
          <span className="text-white">Metode Pembayaran</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Metode Pembayaran
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Kami menyediakan berbagai metode pembayaran yang aman dan mudah
          </p>
        </div>

        {/* Payment Methods */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {paymentMethods.map((category) => (
            <div
              key={category.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>

              <div className="space-y-3">
                {category.methods.map((method, index) => (
                  <div
                    key={index}
                    className="bg-slate-800 rounded-lg p-4 hover:bg-slate-750 transition-colors"
                  >
                    <p className="font-medium text-white">{method.name}</p>
                    <p className="text-sm text-slate-400">{method.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-blue-400 mb-2">
              Catatan Penting
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>• Semua pembayaran akan diproses setelah konfirmasi via WhatsApp</li>
              <li>• Simpan bukti pembayaran untuk verifikasi</li>
              <li>• Proses pengiriman dilakukan setelah pembayaran diterima</li>
              <li>• Hubungi admin jika ada kendala pembayaran</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

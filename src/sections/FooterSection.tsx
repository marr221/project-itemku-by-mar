import { Link } from "react-router-dom";
import { SITE_CONFIG, WHATSAPP_CONFIG } from "@/data/config";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  MessageCircle,
  Shield,
  Clock,
  Headphones
} from "lucide-react";

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    layanan: [
      { label: "Top Up Game", href: "/topup" },
      { label: "Voucher Game", href: "/voucher" },
      { label: "Gift Card", href: "/giftcard" },
      { label: "Akun Game", href: "/akun" },
      { label: "Joki Game", href: "/joki" },
    ],
    bantuan: [
      { label: "Cara Pembelian", href: "/cara-pembelian" },
      { label: "Metode Pembayaran", href: "/pembayaran" },
      { label: "Lacak Pesanan", href: "#lacak" },
      { label: "Hubungi Kami", href: "/kontak" },
      { label: "FAQ", href: "/faq" },
    ],
    tentang: [
      { label: "Tentang Kami", href: "/tentang" },
      { label: "Kebijakan Privasi", href: "/privasi" },
      { label: "Syarat & Ketentuan", href: "/syarat" },
      { label: "Karir", href: "/karir" },
      { label: "Blog", href: "/blog" },
    ],
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      {/* Features Bar */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="font-semibold text-white">100% Aman</p>
                <p className="text-sm text-slate-400">Transaksi terjamin</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-white">Proses Cepat</p>
                <p className="text-sm text-slate-400">Kurang dari 5 menit</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Headphones className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-white">Support 24/7</p>
                <p className="text-sm text-slate-400">Selalu siap membantu</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="font-semibold text-white">WhatsApp</p>
                <p className="text-sm text-slate-400">Order via WA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-white font-bold text-xl">{SITE_CONFIG.name}</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              {SITE_CONFIG.tagline}. Platform terpercaya untuk top up game, 
              voucher, dan item game dengan harga terbaik dan proses cepat.
            </p>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                +{WHATSAPP_CONFIG.phoneNumber}
              </a>
              <a
                href="mailto:support@gamemarket.id"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                support@gamemarket.id
              </a>
              <p className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-5 h-5" />
                Indonesia
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Layanan</h4>
            <ul className="space-y-2">
              {footerLinks.layanan.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Bantuan</h4>
            <ul className="space-y-2">
              {footerLinks.bantuan.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Tentang</h4>
            <ul className="space-y-2">
              {footerLinks.tentang.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Payment */}
        <div className="border-t border-slate-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-sm">Ikuti Kami:</span>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-sm">Metode Pembayaran:</span>
              <div className="flex gap-2">
                {["DANA", "GoPay", "OVO", "SPay", "QRIS"].map((method) => (
                  <span
                    key={method}
                    className="px-3 py-1 bg-slate-800 rounded text-xs text-slate-400"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

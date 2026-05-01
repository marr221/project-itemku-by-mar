import { Link } from "react-router-dom";
import { ChevronRight, Home, MessageCircle, Mail, Phone, Clock } from "lucide-react";
import { WHATSAPP_CONFIG } from "@/data/config";

export function ContactPage() {
  const contactInfo = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: `+${WHATSAPP_CONFIG.phoneNumber}`,
      link: `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}`,
      description: "Respon cepat 24/7",
      color: "green",
    },
    {
      icon: Mail,
      title: "Email",
      value: "support@gamemarket.id",
      link: "mailto:support@gamemarket.id",
      description: "Kirimkan pertanyaan Anda",
      color: "blue",
    },
    {
      icon: Phone,
      title: "Telepon",
      value: `+${WHATSAPP_CONFIG.phoneNumber}`,
      link: `tel:+${WHATSAPP_CONFIG.phoneNumber}`,
      description: "Hubungi kami kapan saja",
      color: "purple",
    },
  ];

  const operatingHours = [
    { day: "Senin - Jumat", hours: "08:00 - 22:00 WIB" },
    { day: "Sabtu", hours: "09:00 - 21:00 WIB" },
    { day: "Minggu", hours: "10:00 - 20:00 WIB" },
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
          <span className="text-white">Hubungi Kami</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hubungi Kami
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Kami siap membantu Anda. Hubungi kami melalui salah satu channel berikut
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {contactInfo.map((contact, index) => (
            <a
              key={index}
              href={contact.link}
              target={contact.link.startsWith("http") ? "_blank" : undefined}
              rel={contact.link.startsWith("http") ? "noopener noreferrer" : undefined}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all hover:scale-105"
            >
              <div className={`w-14 h-14 bg-${contact.color}-600/20 rounded-xl flex items-center justify-center mb-4`}>
                <contact.icon className={`w-7 h-7 text-${contact.color}-400`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{contact.title}</h3>
              <p className="text-blue-400 font-medium mb-2">{contact.value}</p>
              <p className="text-sm text-slate-400">{contact.description}</p>
            </a>
          ))}
        </div>

        {/* Operating Hours */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-yellow-600/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Jam Operasional</h3>
            </div>

            <div className="space-y-3">
              {operatingHours.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-slate-800 last:border-0"
                >
                  <span className="text-slate-400">{item.day}</span>
                  <span className="text-white font-medium">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">Butuh bantuan segera?</p>
          <a
            href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}`}
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

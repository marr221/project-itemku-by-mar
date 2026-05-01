import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { Navbar } from "@/components/Navbar";
import { FooterSection } from "@/sections/FooterSection";
import { TrackOrderModal } from "@/components/modals/TrackOrderModal";
import { Button } from "@/components/ui/button";
import { MessageCircle, Package, ChevronUp } from "lucide-react";
import { WHATSAPP_CONFIG } from "@/data/config";

// Pages
import { HomePage } from "@/pages/HomePage";
import { CategoryPage } from "@/pages/CategoryPage";
import { HowToBuyPage } from "@/pages/HowToBuyPage";
import { PaymentMethodsPage } from "@/pages/PaymentMethodsPage";
import { ContactPage } from "@/pages/ContactPage";
import { FAQPage } from "@/pages/FAQPage";
import { AboutPage } from "@/pages/AboutPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { TermsPage } from "@/pages/TermsPage";
import { CareerPage } from "@/pages/CareerPage";
import { BlogPage } from "@/pages/BlogPage";
import { TopUpPage } from "@/pages/TopUpPage";
import { VoucherPage } from "@/pages/VoucherPage";
import { GiftCardPage } from "@/pages/GiftCardPage";
import { GameAccountPage } from "@/pages/GameAccountPage";
import { JokiPage } from "@/pages/JokiPage";
import { RobloxPage } from "@/pages/RobloxPage";
import { GameKeyPage } from "@/pages/GameKeyPage";
import { ItemPage } from "@/pages/ItemPage";
import { CurrencyPage } from "@/pages/CurrencyPage";

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function AppContent() {
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);


  // Show scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <ScrollToTop />
      
      {/* Navbar */}
      <Navbar onTrackOrderClick={() => setIsTrackOrderOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          
          {/* Layanan */}
          <Route path="/topup" element={<TopUpPage />} />
          <Route path="/voucher" element={<VoucherPage />} />
          <Route path="/giftcard" element={<GiftCardPage />} />
          <Route path="/akun" element={<GameAccountPage />} />
          <Route path="/joki" element={<JokiPage />} />
          <Route path="/roblox" element={<RobloxPage />} />
          <Route path="/gamekey" element={<GameKeyPage />} />
          <Route path="/item" element={<ItemPage />} />
          <Route path="/currency" element={<CurrencyPage />} />
          
          {/* Bantuan */}
          <Route path="/cara-pembelian" element={<HowToBuyPage />} />
          <Route path="/pembayaran" element={<PaymentMethodsPage />} />
          <Route path="/lacak" element={<div />} /> {/* Handled by modal */}
          <Route path="/kontak" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          
          {/* Tentang */}
          <Route path="/tentang" element={<AboutPage />} />
          <Route path="/privasi" element={<PrivacyPage />} />
          <Route path="/syarat" element={<TermsPage />} />
          <Route path="/karir" element={<CareerPage />} />
          <Route path="/blog" element={<BlogPage />} />
          
          {/* Game Routes */}
          <Route path="/mobile-legends" element={<CategoryPage />} />
          <Route path="/free-fire" element={<CategoryPage />} />
          <Route path="/pubg-mobile" element={<CategoryPage />} />
          <Route path="/genshin-impact" element={<CategoryPage />} />
          <Route path="/valorant" element={<CategoryPage />} />
          <Route path="/steam" element={<CategoryPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <FooterSection />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        {/* Track Order Button */}
        <Button
          onClick={() => setIsTrackOrderOpen(true)}
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full bg-slate-900 border-slate-700 text-white hover:bg-slate-800 shadow-lg"
        >
          <Package className="w-5 h-5" />
        </Button>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="icon"
            className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30"
          >
            <MessageCircle className="w-7 h-7" />
          </Button>
        </a>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          variant="outline"
          size="icon"
          className="fixed bottom-6 left-6 w-12 h-12 rounded-full bg-slate-900 border-slate-700 text-white hover:bg-slate-800 shadow-lg z-40"
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
      )}

      {/* Track Order Modal */}
      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ShoppingCart,
  User,
  LogOut,
  Package,
  ChevronDown,
  Menu,
  X,
  Search,
  Download,
  Headphones,
  Zap,
  Key,
  Gamepad2,
  Gift,
  User as UserIcon,
  Package as PackageIcon,
  Coins,
  Trophy,
} from "lucide-react";
import { AuthModal } from "./modals/AuthModal";
import { CartModal } from "./modals/CartModal";
import { CATEGORIES, SITE_CONFIG } from "@/data/config";

interface NavbarProps {
  onTrackOrderClick: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Key,
  Gamepad2,
  Gift,
  User: UserIcon,
  Package: PackageIcon,
  Coins,
  Trophy,
};

const gameLinks = [
  { name: "Mobile Legends", path: "/mobile-legends" },
  { name: "Free Fire", path: "/free-fire" },
  { name: "PUBG Mobile", path: "/pubg-mobile" },
  { name: "Genshin Impact", path: "/genshin-impact" },
  { name: "Roblox", path: "/roblox" },
  { name: "Valorant", path: "/valorant" },
  { name: "Steam", path: "/steam" },
];

export function Navbar({ onTrackOrderClick }: NavbarProps) {
  const { isLoggedIn, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openLogin = () => {
    setAuthTab("login");
    setIsAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthTab("register");
    setIsAuthModalOpen(true);
  };

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Search by game name
      const gameMatch = gameLinks.find(g => 
        g.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (gameMatch) {
        navigate(gameMatch.path);
        setSearchQuery("");
      }
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-400 text-sm py-2 border-b border-slate-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/kontak" className="hover:text-white flex items-center gap-1 transition-colors">
              <Headphones className="w-4 h-4" />
              Support
            </Link>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">ID - IDR</span>
          </div>
          <button className="hover:text-white flex items-center gap-1 transition-colors">
            <Download className="w-4 h-4" />
            Download App
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-slate-950 sticky top-0 z-50 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">
                {SITE_CONFIG.name}
              </span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Cari game, item, atau voucher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-4 pr-10 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="w-5 h-5 text-slate-500 hover:text-white transition-colors" />
                </button>
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Cart Button */}
              <button
                onClick={() => setIsCartModalOpen(true)}
                className="relative p-2 text-slate-400 hover:text-white transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>

              {/* Auth Buttons or User Profile */}
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 text-white hover:bg-slate-800 rounded-lg px-3 py-2 transition-colors">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-8 h-8 rounded-full bg-slate-700"
                      />
                      <span className="hidden sm:block max-w-[100px] truncate">
                        {user?.name}
                      </span>
                      <ChevronDown className="w-4 h-4 hidden sm:block" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-slate-900 border-slate-700 text-white"
                  >
                    <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem
                      onClick={onTrackOrderClick}
                      className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800"
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Pesanan Saya
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800">
                      <User className="mr-2 h-4 w-4" />
                      Profil
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer text-red-400 hover:bg-slate-800 focus:bg-slate-800 focus:text-red-400"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Keluar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={openLogin}
                    className="text-white hover:bg-slate-800 hidden sm:flex"
                  >
                    Masuk
                  </Button>
                  <Button
                    onClick={openRegister}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Daftar
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-400 hover:text-white"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Category Navigation - Desktop */}
        <div className="hidden lg:block border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1 py-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-slate-800 flex items-center gap-2"
                  >
                    <Menu className="w-4 h-4" />
                    Kategori
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-56 bg-slate-900 border-slate-700 text-white"
                >
                  {CATEGORIES.map((category) => (
                    <DropdownMenuItem key={category.id} asChild>
                      <Link 
                        to={`/category/${category.id}`}
                        className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800 flex items-center"
                      >
                        {getIcon(category.icon)}
                        <span className="ml-2">{category.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="w-px h-6 bg-slate-700 mx-2" />

              {/* Quick Links */}
              {gameLinks.map((game) => (
                <Link
                  key={game.name}
                  to={game.path}
                  className="px-3 py-2 text-slate-400 hover:text-white transition-colors text-sm"
                >
                  {game.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  placeholder="Cari game, item, atau voucher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 pl-4 pr-10 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="w-5 h-5 text-slate-500" />
                </button>
              </form>

              {/* Mobile Categories */}
              <div className="space-y-2">
                <p className="text-slate-500 text-sm font-medium mb-2">Kategori</p>
                {CATEGORIES.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    {getIcon(category.icon)}
                    {category.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Quick Links */}
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                <p className="text-slate-500 text-sm font-medium mb-2">Game Populer</p>
                {gameLinks.slice(0, 5).map((game) => (
                  <Link
                    key={game.name}
                    to={game.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    {game.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth */}
              {!isLoggedIn && (
                <div className="mt-4 pt-4 border-t border-slate-800 flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openLogin();
                    }}
                    className="flex-1 border-slate-600 text-white hover:bg-slate-800"
                  >
                    Masuk
                  </Button>
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openRegister();
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Daftar
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authTab}
      />
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        onLoginClick={openLogin}
      />
    </>
  );
}

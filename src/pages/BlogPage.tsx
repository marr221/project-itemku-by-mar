import { Link } from "react-router-dom";
import { ChevronRight, Home, Calendar, User } from "lucide-react";

export function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Tips Top Up Mobile Legends: Hemat Diamond dan Dapatkan Bonus",
      excerpt: "Pelajari cara hemat saat top up ML dan dapatkan bonus diamond maksimal...",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
      author: "GameMarket Team",
      date: "5 Maret 2026",
      category: "Tips & Trick",
    },
    {
      id: 2,
      title: "Event Terbaru Genshin Impact: Primogem Gratis Menanti",
      excerpt: "Jangan lewatkan event terbaru dengan hadiah primogem melimpah...",
      image: "https://images.unsplash.com/photo-1612287230217-969b698e6d73?w=400",
      author: "GameMarket Team",
      date: "3 Maret 2026",
      category: "Berita Game",
    },
    {
      id: 3,
      title: "Panduan Lengkap: Cara Mendapatkan Robux Gratis di Roblox",
      excerpt: "Temukan berbagai cara legal untuk mendapatkan Robux tanpa mengeluarkan uang...",
      image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400",
      author: "GameMarket Team",
      date: "1 Maret 2026",
      category: "Tutorial",
    },
    {
      id: 4,
      title: "Update Free Fire Maret 2026: Senjata dan Karakter Baru",
      excerpt: "Simak update terbaru FF dengan senjata OP dan karakter keren...",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400",
      author: "GameMarket Team",
      date: "28 Februari 2026",
      category: "Berita Game",
    },
    {
      id: 5,
      title: "5 Game Battle Royale Terbaik 2026 Versi GameMarket",
      excerpt: "Daftar game battle royale paling seru yang wajib kamu coba tahun ini...",
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400",
      author: "GameMarket Team",
      date: "25 Februari 2026",
      category: "Rekomendasi",
    },
    {
      id: 6,
      title: "Cara Aman Beli Voucher Steam: Hindari Penipuan",
      excerpt: "Tips penting untuk memastikan pembelian voucher Steam yang aman dan terpercaya...",
      image: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400",
      author: "GameMarket Team",
      date: "22 Februari 2026",
      category: "Tips & Trick",
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
          <span className="text-white">Blog</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Blog GameMarket
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Tips, berita, dan informasi terbaru seputar dunia gaming
          </p>
        </div>

        {/* Blog Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors group"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <span className="text-xs bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <h3 className="text-lg font-semibold text-white mt-3 mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Muat Lebih Banyak
          </button>
        </div>
      </div>
    </div>
  );
}

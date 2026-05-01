import { Link } from "react-router-dom";
import { CATEGORIES } from "@/data/config";
import {
  Zap,
  Key,
  Gamepad2,
  Gift,
  User,
  Package,
  Coins,
  Trophy,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Key,
  Gamepad2,
  Gift,
  User,
  Package,
  Coins,
  Trophy,
};

export function CategorySection() {
  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon className="w-6 h-6" /> : null;
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-white mb-6">Kategori Produk</h2>
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group flex flex-col items-center gap-2"
            >
              <div
                className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
              >
                {getIcon(category.icon)}
              </div>
              <span className="text-xs text-slate-400 text-center group-hover:text-white transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "@/data/config";

// Tipe data item di cart
export interface CartItem {
  product: Product;
  quantity: number;
  gameId?: string; // ID game untuk top up
  gameServer?: string; // Server game
  notes?: string; // Catatan tambahan
}

// Interface Context
interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateItemDetails: (productId: string, details: Partial<CartItem>) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Key untuk localStorage
const CART_KEY = "gamemarket_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart dari localStorage saat mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error("Error parsing cart data:", error);
        localStorage.removeItem(CART_KEY);
      }
    }
    setIsInitialized(true);
  }, []);

  // Simpan cart ke localStorage setiap kali berubah
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
  }, [items, isInitialized]);

  // Hitung jumlah item total
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Hitung total harga
  const totalPrice = items.reduce(
    (total, item) => total + item.product.discountedPrice * item.quantity,
    0
  );

  // Tambah item ke cart
  const addToCart = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === newItem.product.id
      );

      if (existingIndex !== -1) {
        // Update item yang sudah ada
        const updatedItems = [...prevItems];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + newItem.quantity,
          gameId: newItem.gameId || updatedItems[existingIndex].gameId,
          gameServer: newItem.gameServer || updatedItems[existingIndex].gameServer,
          notes: newItem.notes || updatedItems[existingIndex].notes,
        };
        return updatedItems;
      }

      // Tambah item baru
      return [...prevItems, newItem];
    });
  };

  // Hapus item dari cart
  const removeFromCart = (productId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  // Update quantity item
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Update detail item (gameId, server, notes)
  const updateItemDetails = (productId: string, details: Partial<CartItem>) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, ...details } : item
      )
    );
  };

  // Kosongkan cart
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(CART_KEY);
  };

  // Cek apakah produk sudah di cart
  const isInCart = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItemDetails,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook untuk menggunakan CartContext
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart harus digunakan di dalam CartProvider");
  }
  return context;
}

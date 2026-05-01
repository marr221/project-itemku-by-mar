import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// Tipe data User
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

// Tipe data untuk Register
export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

// Tipe data untuk Login
export interface LoginData {
  email: string;
  password: string;
}

// Interface Context
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<{ success: boolean; message: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Key untuk localStorage
const USER_KEY = "gamemarket_user";
const USERS_KEY = "gamemarket_users"; // Database sederhana untuk menyimpan semua user

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cek localStorage saat mount
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem(USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Fungsi Login
  const login = async (data: LoginData): Promise<{ success: boolean; message: string }> => {
    try {
      // Ambil semua users dari localStorage
      const usersJson = localStorage.getItem(USERS_KEY);
      const users: (User & { password: string })[] = usersJson ? JSON.parse(usersJson) : [];

      // Cari user dengan email yang cocok
      const foundUser = users.find((u) => u.email === data.email);

      if (!foundUser) {
        return { success: false, message: "Email tidak terdaftar" };
      }

      // Cek password (dalam produksi seharusnya di-hash)
      if (foundUser.password !== data.password) {
        return { success: false, message: "Password salah" };
      }

      // Buat object user tanpa password
      const { password, ...userWithoutPassword } = foundUser;

      // Simpan ke state dan localStorage
      setUser(userWithoutPassword);
      localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));

      return { success: true, message: "Login berhasil!" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Terjadi kesalahan saat login" };
    }
  };

  // Fungsi Register
  const register = async (data: RegisterData): Promise<{ success: boolean; message: string }> => {
    try {
      // Ambil semua users dari localStorage
      const usersJson = localStorage.getItem(USERS_KEY);
      const users: (User & { password: string })[] = usersJson ? JSON.parse(usersJson) : [];

      // Cek apakah email sudah terdaftar
      if (users.some((u) => u.email === data.email)) {
        return { success: false, message: "Email sudah terdaftar" };
      }

      // Buat user baru
      const newUser = {
        id: `user_${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
        createdAt: new Date().toISOString(),
        password: data.password, // Dalam produksi seharusnya di-hash
      };

      // Tambahkan ke database users
      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      // Auto login setelah register
      const { password, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));

      return { success: true, message: "Pendaftaran berhasil! Selamat datang di GameMarket." };
    } catch (error) {
      console.error("Register error:", error);
      return { success: false, message: "Terjadi kesalahan saat pendaftaran" };
    }
  };

  // Fungsi Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  // Fungsi Update Profile
  const updateProfile = async (data: Partial<User>): Promise<{ success: boolean; message: string }> => {
    try {
      if (!user) {
        return { success: false, message: "Anda belum login" };
      }

      // Update user saat ini
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

      // Update juga di database users
      const usersJson = localStorage.getItem(USERS_KEY);
      if (usersJson) {
        const users: (User & { password: string })[] = JSON.parse(usersJson);
        const userIndex = users.findIndex((u) => u.id === user.id);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...data };
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }
      }

      return { success: true, message: "Profil berhasil diperbarui" };
    } catch (error) {
      console.error("Update profile error:", error);
      return { success: false, message: "Terjadi kesalahan saat memperbarui profil" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook untuk menggunakan AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
}

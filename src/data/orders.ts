import type { CartItem } from "@/contexts/CartContext";

// Tipe data Order
export interface Order {
  id: string; // Nomor pesanan (GM-XXXXXX)
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  items: CartItem[];
  totalPrice: number;
  status: "pending_payment" | "processing" | "completed" | "cancelled";
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
  whatsappLink?: string; // Link WhatsApp yang sudah dibuat
  notes?: string;
}

// Key untuk localStorage
const ORDERS_KEY = "gamemarket_orders";
const ORDER_COUNTER_KEY = "gamemarket_order_counter";

// Generate nomor pesanan unik (GM-XXXXXX)
export function generateOrderNumber(): string {
  const counter = getOrderCounter();
  const paddedNumber = counter.toString().padStart(6, "0");
  return `GM-${paddedNumber}`;
}

// Get dan increment counter
function getOrderCounter(): number {
  const stored = localStorage.getItem(ORDER_COUNTER_KEY);
  const counter = stored ? parseInt(stored, 10) : 1;
  localStorage.setItem(ORDER_COUNTER_KEY, (counter + 1).toString());
  return counter;
}

// Create new order
export function createOrder(
  userId: string,
  userName: string,
  userEmail: string,
  userPhone: string,
  items: CartItem[],
  totalPrice: number
): Order {
  const order: Order = {
    id: generateOrderNumber(),
    userId,
    userName,
    userEmail,
    userPhone,
    items,
    totalPrice,
    status: "pending_payment",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Simpan ke database
  saveOrder(order);

  return order;
}

// Save order to localStorage
export function saveOrder(order: Order): void {
  const orders = getAllOrders();
  const existingIndex = orders.findIndex((o) => o.id === order.id);

  if (existingIndex !== -1) {
    orders[existingIndex] = { ...order, updatedAt: new Date().toISOString() };
  } else {
    orders.push(order);
  }

  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

// Get all orders
export function getAllOrders(): Order[] {
  const stored = localStorage.getItem(ORDERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Get orders by user ID
export function getOrdersByUser(userId: string): Order[] {
  const orders = getAllOrders();
  return orders.filter((order) => order.userId === userId);
}

// Get order by ID
export function getOrderById(orderId: string): Order | null {
  const orders = getAllOrders();
  return orders.find((order) => order.id === orderId) || null;
}

// Update order status
export function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Order | null {
  const orders = getAllOrders();
  const orderIndex = orders.findIndex((o) => o.id === orderId);

  if (orderIndex === -1) return null;

  orders[orderIndex].status = status;
  orders[orderIndex].updatedAt = new Date().toISOString();

  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return orders[orderIndex];
}

// Update order WhatsApp link
export function updateOrderWhatsAppLink(
  orderId: string,
  whatsappLink: string
): Order | null {
  const orders = getAllOrders();
  const orderIndex = orders.findIndex((o) => o.id === orderId);

  if (orderIndex === -1) return null;

  orders[orderIndex].whatsappLink = whatsappLink;
  orders[orderIndex].updatedAt = new Date().toISOString();

  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return orders[orderIndex];
}

// Delete order (admin only)
export function deleteOrder(orderId: string): boolean {
  const orders = getAllOrders();
  const filteredOrders = orders.filter((o) => o.id !== orderId);

  if (filteredOrders.length === orders.length) return false;

  localStorage.setItem(ORDERS_KEY, JSON.stringify(filteredOrders));
  return true;
}

// Get status label
export function getStatusLabel(status: Order["status"]): string {
  const labels = {
    pending_payment: "Menunggu Pembayaran",
    processing: "Sedang Diproses",
    completed: "Selesai",
    cancelled: "Dibatalkan",
  };
  return labels[status];
}

// Get status color
export function getStatusColor(status: Order["status"]): string {
  const colors = {
    pending_payment: "yellow",
    processing: "blue",
    completed: "green",
    cancelled: "red",
  };
  return colors[status];
}

// Format order untuk WhatsApp message
export function formatOrderForWhatsApp(order: Order): string {
  let message = `*PESANAN BARU - ${order.id}*\n\n`;
  message += `*Data Pembeli:*\n`;
  message += `Nama: ${order.userName}\n`;
  message += `Email: ${order.userEmail}\n`;
  message += `No. HP: ${order.userPhone}\n\n`;

  message += `*Detail Pesanan:*\n`;
  order.items.forEach((item, index) => {
    message += `${index + 1}. ${item.product.name}\n`;
    message += `   Game: ${item.product.game}\n`;
    if (item.gameId) message += `   ID Game: ${item.gameId}\n`;
    if (item.gameServer) message += `   Server: ${item.gameServer}\n`;
    message += `   Jumlah: ${item.quantity}x\n`;
    message += `   Harga: Rp ${item.product.discountedPrice.toLocaleString("id-ID")}\n`;
    if (item.notes) message += `   Catatan: ${item.notes}\n`;
    message += `\n`;
  });

  message += `*Total: Rp ${order.totalPrice.toLocaleString("id-ID")}*\n\n`;
  message += `Status: ${getStatusLabel(order.status)}\n`;
  message += `Waktu: ${new Date(order.createdAt).toLocaleString("id-ID")}\n\n`;
  message += `Mohon konfirmasi pesanan ini. Terima kasih!`;

  return message;
}

// Generate WhatsApp link
export function generateWhatsAppLink(phoneNumber: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

import { create } from "zustand";

const CART_KEY = "abby_cart";

const loadCart = () => {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const useCartStore = create((set, get) => ({
  cart: loadCart(),

  addToCart: (product) => {
    const newCart = [...get().cart, product];
    set({ cart: newCart });
    localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  },

  removeFromCart: (index) => {
    const newCart = get().cart.filter((_, i) => i !== index);
    set({ cart: newCart });
    localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  },

  clearCart: () => {
    set({ cart: [] });
    localStorage.setItem(CART_KEY, JSON.stringify([]));
  },
}));

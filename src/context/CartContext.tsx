"use client";

import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { MenuItem } from "@/data/menuData";

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface ToastState {
  id: number;
  message: string;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  toasts: ToastState[];
  removeToast: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const addToCart = useCallback((item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.item.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { item, quantity: 1 }];
    });

    // Add toast notification
    const toastId = Date.now();
    setToasts((prev) => [...prev, { id: toastId, message: `Added ${item.name} to order!` }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 3000);
  }, []);

  const removeFromCart = useCallback((itemId: number) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.item.id === itemId ? { ...cartItem, quantity } : cartItem
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const cartCount = useMemo(() => {
    return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, cartItem) => {
      const priceNum = parseFloat(cartItem.item.price.replace(/[^0-9.]/g, ""));
      return total + priceNum * cartItem.quantity;
    }, 0);
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      cartTotal,
      isCartOpen,
      setCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toasts,
      removeToast,
    }),
    [
      cart,
      cartCount,
      cartTotal,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toasts,
      removeToast,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

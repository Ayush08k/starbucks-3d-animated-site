"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    cartTotal,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<"cart" | "processing" | "success">("cart");
  const [orderNumber, setOrderNumber] = useState("");

  const handleCheckout = () => {
    setCheckoutStep("processing");
    // Generate a mock order number
    const mockOrderNum = "SBC-" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(mockOrderNum);

    // Simulate brewing / processing
    setTimeout(() => {
      setCheckoutStep("success");
    }, 2500);
  };

  const closeCart = () => {
    setCartOpen(false);
    // Reset checkout step after drawer closes
    setTimeout(() => {
      setCheckoutStep("cart");
    }, 500);
  };

  const handleSuccessClose = () => {
    clearCart();
    closeCart();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={checkoutStep === "processing" ? undefined : closeCart}
            className="fixed inset-0 bg-[#0E0E0E]/80 backdrop-blur-sm z-[70] cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full sm:w-[480px] bg-[#141414]/95 border-l border-white/5 z-[80] shadow-2xl flex flex-col backdrop-blur-xl"
          >
            {checkoutStep === "cart" && (
              <>
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <h2
                      className="text-xl text-white font-semibold uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Your Order
                    </h2>
                    <p className="text-white/40 text-[0.65rem] uppercase tracking-widest mt-1" style={{ fontFamily: "var(--font-mono)" }}>
                      Starbucks Experience
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all duration-300 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                      <div className="text-[#C49A6C] text-4xl">☕</div>
                      <p className="text-white/40 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                        Your cart is empty.<br />Add some crafted coffee to start.
                      </p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <motion.div
                        key={item.item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 relative group"
                      >
                        {/* Item Thumbnail */}
                        <div
                          className="w-16 h-16 bg-[#1A1A1A] shrink-0"
                          style={{
                            backgroundImage: `url(${item.item.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-sm font-medium truncate" style={{ fontFamily: "var(--font-inter)" }}>
                            {item.item.name}
                          </h4>
                          <p className="text-[#C49A6C] text-[0.65rem] uppercase tracking-widest mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
                            {item.item.price}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 mt-3">
                            <button
                              onClick={() => updateQuantity(item.item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#C49A6C] transition-colors cursor-pointer text-xs"
                            >
                              -
                            </button>
                            <span className="text-white text-xs font-medium min-w-[12px] text-center" style={{ fontFamily: "var(--font-mono)" }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#C49A6C] transition-colors cursor-pointer text-xs"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => removeFromCart(item.item.id)}
                          className="text-white/20 hover:text-red-400 absolute top-4 right-4 transition-colors cursor-pointer"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Footer / Total */}
                {cart.length > 0 && (
                  <div className="p-6 md:p-8 border-t border-white/5 bg-white/[0.01]">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-white/40 text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
                        Subtotal
                      </span>
                      <span className="text-white text-2xl font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full btn-cta text-center justify-center font-bold text-xs tracking-widest py-4 cursor-pointer"
                    >
                      PLACE ORDER
                    </button>
                  </div>
                )}
              </>
            )}

            {checkoutStep === "processing" && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  {/* Spinning Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 border-2 border-transparent border-t-[#C49A6C] rounded-full"
                  />
                  <span className="text-3xl">☕</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold tracking-wider" style={{ fontFamily: "var(--font-playfair)" }}>
                    Brewing Your Order...
                  </h3>
                  <p className="text-white/40 text-xs mt-2 max-w-xs leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    Our master baristas are preparing your custom blend with precision.
                  </p>
                </div>
              </div>
            )}

            {checkoutStep === "success" && (
              <div className="flex-1 flex flex-col p-6 md:p-8 justify-between overflow-y-auto">
                <div className="my-auto space-y-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 bg-[#C49A6C]/10 border border-[#C49A6C] rounded-full flex items-center justify-center mx-auto"
                  >
                    <span className="text-[#C49A6C] text-3xl">✓</span>
                  </motion.div>

                  <div>
                    <h3 className="text-white text-2xl font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-playfair)" }}>
                      Brew Complete
                    </h3>
                    <p className="text-white/40 text-xs mt-2" style={{ fontFamily: "var(--font-mono)" }}>
                      Order ID: {orderNumber}
                    </p>
                  </div>

                  {/* Receipt Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[#1C1C1C] border border-white/5 p-6 text-left space-y-4 max-w-sm mx-auto"
                  >
                    <div className="border-b border-white/5 pb-3">
                      <p className="text-[#C49A6C] text-[0.6rem] uppercase tracking-widest font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                        RECEIPT SUMMARY
                      </p>
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {cart.map((c) => (
                        <div key={c.item.id} className="flex justify-between text-xs">
                          <span className="text-white/60 truncate max-w-[200px]" style={{ fontFamily: "var(--font-inter)" }}>
                            {c.item.name} <span className="text-white/30 text-[10px]">x{c.quantity}</span>
                          </span>
                          <span className="text-white/80" style={{ fontFamily: "var(--font-mono)" }}>
                            ${(parseFloat(c.item.price.replace("$", "")) * c.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/5 pt-3 flex justify-between font-medium">
                      <span className="text-white text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>Total Paid</span>
                      <span className="text-[#C49A6C] text-sm" style={{ fontFamily: "var(--font-mono)" }}>${cartTotal.toFixed(2)}</span>
                    </div>
                  </motion.div>

                  <p className="text-white/30 text-xs max-w-xs mx-auto leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    Show this receipt to the barista at our Soho flagship, or await delivery to your table.
                  </p>
                </div>

                <button
                  onClick={handleSuccessClose}
                  className="w-full btn-cta text-center justify-center font-bold text-xs tracking-widest py-4 cursor-pointer mt-6"
                >
                  DONE
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

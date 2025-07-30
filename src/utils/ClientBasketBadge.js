"use client";
import React, { useEffect, useState } from "react";

function ClientBasketBadge({ children }) {
  const [basket, setBasket] = useState(0);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    try {
      const basketPars = JSON.parse(cartData);
      setBasket(basketPars?.length || 0); // ✅ تعداد آیتم‌ها
    } catch (error) {
      console.error("خطا در پارس کردن سبد خرید", error);
    }
  }, []);

  return children(basket);
}

export default ClientBasketBadge;

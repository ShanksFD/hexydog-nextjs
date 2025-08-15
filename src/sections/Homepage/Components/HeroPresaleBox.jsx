"use client";

import { useState } from "react";
import PresalePaymentBox from "@/components/PresalePaymentBox/PresalePaymentBox";

export default function HeroPresaleBox({ dict }) {
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePurchaseSuccess = () => {
    setShowSuccess(true);
  };

  return (
    <>
      <PresalePaymentBox
        dict={dict}
        onPurchaseSuccess={handlePurchaseSuccess}
      />
      {showSuccess && (
        <div style={{ display: "none" }}>
          {dict.HOME_PAGE.HERO.PRESALE.PURCHASE_SUCCESS}
        </div>
      )}
    </>
  );
}

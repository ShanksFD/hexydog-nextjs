"use client";

import { useState } from "react";
import { Alert, alpha, lighten, Snackbar } from "@mui/material";
import { BiCheck } from "react-icons/bi";
import { theme } from "@/lib/theme";

export default function HeroNotifications() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccess(false);
  };

  return (
    <Snackbar
      open={showSuccess}
      autoHideDuration={6000}
      onClose={handleCloseSuccess}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{
        position: "fixed",
        zIndex: 9999,
      }}
    >
      <Alert
        onClose={handleCloseSuccess}
        severity="success"
        icon={<BiCheck />}
        sx={{
          backgroundColor: alpha(theme.palette.success.main, 0.9),
          borderRadius: theme.shape.defaultBorderRadius,
          border: "none",
          fontWeight: "400",
          "& .MuiAlert-icon": {
            color: lighten(theme.palette.success.main, 0.9),
          },
          "& .MuiAlert-message": {
            color: lighten(theme.palette.success.main, 0.9),
          },
        }}
      >
        Purchase successful!
      </Alert>
    </Snackbar>
  );
}

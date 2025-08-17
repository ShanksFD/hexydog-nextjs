"use client";

import { Button } from "@mui/material";

export default function ScrollToPresaleButton({ dict, sx = {} }) {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ alignSelf: "start", mt: 2, ...sx }}
      onClick={() => {
        const element = document.getElementById("presale-payment-box");
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 120;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }}
    >
      {dict.HOME_PAGE.ABOUT.BUTTON_TEXT}
    </Button>
  );
}

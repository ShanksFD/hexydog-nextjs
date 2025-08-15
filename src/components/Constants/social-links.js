"use client";

import { X, Telegram, Mail } from "@mui/icons-material";
import { theme } from "@/lib/theme";

export const footerSocials = [
  {
    url: "https://x.com/hexydog",
    logo: <X style={{ fontSize: "24px" }} />,
  },
  {
    url: "mailto:info@hexydog.com",
    logo: <Mail style={{ fontSize: "24px" }} />,
  },
  {
    url: "https://t.me/hexydog",
    logo: <Telegram style={{ fontSize: "24px" }} />,
  },
];

export const headerSocials = [
  {
    url: "https://x.com/hexydog",
    logo: (
      <X
        style={{
          fontSize: "20px",
          color: theme.palette.common.white,
          display: "flex",
        }}
      />
    ),
  },
  {
    url: "https://t.me/hexydog",
    logo: (
      <Telegram
        style={{
          fontSize: "22px",
          color: theme.palette.common.white,
          display: "flex",
        }}
      />
    ),
  },
];

"use client";

import { ThemeProvider } from "@mui/material/styles";
import { Provider as ReduxProvider } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  bsc,
  bscTestnet,
  mainnet,
  sepolia,
  solana,
} from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { WagmiProvider } from "wagmi";
import { useState, useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import { isDev } from "../constants/wagmiConstants.js";
import { theme } from "@/lib/theme.js";
import { initI18n } from "@/lib/i18n";
import { store } from "@/redux/store.js";

const projectId =
  process.env.NEXT_PUBLIC_REOWN_PROJECT_ID ||
  "e63f8e4f9145802b9ae29ca7a95552a4";

const metadata = {
  name: "HEXYDOG",
  description:
    "HEXYDOG is a decentralized community-driven token with a unique reward system.",
  url: "https://hexydog.com",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

const networks = isDev
  ? [mainnet, sepolia, bsc, solana, bscTestnet]
  : [mainnet, bsc, solana];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: false,
  },
});

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const [i18nInstance, setI18nInstance] = useState(null);

  useEffect(() => {
    let mounted = true;
    initI18n().then((i18n) => {
      if (mounted) setI18nInstance(i18n);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ReduxProvider store={store}>
      <I18nextProvider i18n={i18nInstance || {}}>
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {!i18nInstance ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.palette.background.default,
                    height: "100vh",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                children
              )}
            </ThemeProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </I18nextProvider>
    </ReduxProvider>
  );
}

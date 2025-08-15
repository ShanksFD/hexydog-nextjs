"use client";

import { ThemeProvider } from "@mui/material/styles";
import { Provider as ReduxProvider } from "react-redux";
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
import { useState } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";

import { isDev } from "../constants/wagmiConstants.js";
import { theme } from "@/lib/theme.js";
import { store } from "@/redux/store.js";

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;

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
    email: false,
    socials: [],
    history: false,
  },
  enableCoinbase: false,
});

export default function Providers({ children }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "mui" });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted = [];

    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({ name: serialized.name, global: !args[0] });
      }
      return prevInsert(...args);
    };

    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;

    const nonGlobalNames = [];
    const globalStyles = [];
    let styles = "";

    for (const { name, global } of names) {
      if (global) {
        globalStyles.push({ name, css: cache.inserted[name] });
      } else {
        nonGlobalNames.push(name);
        styles += cache.inserted[name];
      }
    }

    return [
      ...globalStyles.map((style) => (
        <style
          key={style.name}
          data-emotion={`${cache.key}-global`}
          dangerouslySetInnerHTML={{
            __html: style.css,
          }}
        />
      )),
      <style
        key="mui"
        data-emotion={`${cache.key} ${nonGlobalNames.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />,
    ];
  });

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

  return (
    <CacheProvider value={cache}>
      <ReduxProvider store={store}>
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ReduxProvider>
    </CacheProvider>
  );
}

"use client";

import { useEffect } from "react";
import { useReadContract } from "wagmi";
import { formatUnits } from "viem";

import {
  ETH_PRESALE_ABI,
  ETH_PRESALE_ADDRESS,
  BSC_PRESALE_ABI,
  BSC_PRESALE_ADDRESS,
  ethContractChainId,
  bscContractChainId,
} from "../../../constants/wagmiConstants";

const TokenCalculator = ({ amount, method, setTokensToBuy }) => {
  const isEthNetwork = method === "eth" || method === "sepolia";
  const isBscNetwork = method === "bsc" || method === "bscTestnet";

  const contractConfig = isBscNetwork
    ? {
        address: BSC_PRESALE_ADDRESS,
        abi: BSC_PRESALE_ABI,
        chainId: bscContractChainId,
      }
    : {
        address: ETH_PRESALE_ADDRESS,
        abi: ETH_PRESALE_ABI,
        chainId: ethContractChainId,
      };

  const { data: tokenPrice } = useReadContract({
    ...contractConfig,
    functionName: "getTokenUsdPrice",
  });

  const { data: usdtDivider } = useReadContract({
    ...contractConfig,
    functionName: "getUsdtDivider",
  });

  const { data: nativeDivider } = useReadContract({
    ...contractConfig,
    functionName: isEthNetwork ? "getDivider" : "getDivider",
  });

  const { data: nativePriceData } = useReadContract({
    ...contractConfig,
    functionName: isBscNetwork ? "getBNBPriceInUSD" : "getETHPriceInUSD",
  });

  const { data: usdtRate } = useReadContract({
    ...contractConfig,
    functionName: "getUsdtRate",
  });

  useEffect(() => {
    const calculateTokenAmount = () => {
      if (!amount || !tokenPrice || !usdtDivider || !usdtRate) return;

      try {
        let tokenAmount = BigInt(0);

        switch (method) {
          case "eth":
          case "sepolia": {
            if (nativePriceData && nativeDivider && tokenPrice) {
              const ethPriceInUsd = Number(formatUnits(nativePriceData, 8));
              const divider = Number(formatUnits(nativeDivider, 0));
              const tokenPriceInUsd = Number(formatUnits(tokenPrice, 8));

              console.log("tokenPriceInUsd", tokenPriceInUsd);

              tokenAmount =
                (Number(amount) * ethPriceInUsd * divider) / tokenPriceInUsd;
            }
            break;
          }

          case "bsc":
          case "bscTestnet": {
            if (nativePriceData && nativeDivider && tokenPrice) {
              const bnbPriceInUsd = Number(formatUnits(nativePriceData, 8));
              const divider = Number(nativeDivider);
              const tokenPriceInUsd = Number(formatUnits(tokenPrice, 8));

              const calculatedTokens =
                (Number(amount) * bnbPriceInUsd * divider) / tokenPriceInUsd;
              tokenAmount = calculatedTokens.toString();
            }
            break;
          }

          case "usdt":
          case "usdc": {
            if (usdtRate && usdtDivider) {
              tokenAmount = amount / Number(formatUnits(tokenPrice || 0n, 4));
            }
            break;
          }

          default:
            tokenAmount = 0n;
        }

        setTokensToBuy(Number(tokenAmount).toFixed(2));
      } catch (error) {
        console.error("Error calculating token amount:", error);
        setTokensToBuy("0");
      }
    };

    calculateTokenAmount();
  }, [
    amount,
    method,
    tokenPrice,
    nativePriceData,
    usdtDivider,
    nativeDivider,
    usdtRate,
    setTokensToBuy,
  ]);

  return null;
};

export default TokenCalculator;

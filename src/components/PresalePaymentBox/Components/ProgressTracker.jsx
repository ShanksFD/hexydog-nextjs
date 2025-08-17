"use client";

import { useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";

import {
  ETH_PRESALE_ABI,
  ETH_PRESALE_ADDRESS,
  BSC_PRESALE_ABI,
  BSC_PRESALE_ADDRESS,
  ethContractChainId,
  bscContractChainId,
} from "../../../constants/wagmiConstants";

export const formatAmount = (amount) => {
  if (!amount) return "0";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount);
};

const ProgressTracker = ({
  setRaisedAmount,
  setTokensBought,
  purchaseCompleted,
}) => {
  const { address: userAddress } = useAccount();

  const {
    data: ethUserPurchases,
    refetch: refetchEthUserPurchases,
    error: errorEth,
  } = useReadContract({
    address: ETH_PRESALE_ADDRESS,
    abi: ETH_PRESALE_ABI,
    chainId: ethContractChainId,
    functionName: "Customer",
    args: [userAddress],
    watch: true,
  });

  const {
    data: bscUserPurchases,
    refetch: refetchBscUserPurchases,
    error: errorBsc,
  } = useReadContract({
    address: BSC_PRESALE_ADDRESS,
    abi: BSC_PRESALE_ABI,
    chainId: bscContractChainId,
    functionName: "Customer",
    args: [userAddress],
    watch: true,
  });

  const { data: ethProgress, refetch: refetchETHProgress } = useReadContract({
    address: ETH_PRESALE_ADDRESS,
    abi: ETH_PRESALE_ABI,
    chainId: ethContractChainId,
    functionName: "progressETH",
    watch: true,
  });

  const { data: ethUSDCProgress, refetch: refetchETHUSDC } = useReadContract({
    address: ETH_PRESALE_ADDRESS,
    abi: ETH_PRESALE_ABI,
    chainId: ethContractChainId,
    functionName: "progressUSDC",
    watch: true,
  });

  const { data: ethUSDTProgress, refetch: refetchETHUSDT } = useReadContract({
    address: ETH_PRESALE_ADDRESS,
    abi: ETH_PRESALE_ABI,
    chainId: ethContractChainId,
    functionName: "progressUSDT",
    watch: true,
  });

  const { data: ethPrice, refetch: refetchETHPrice } = useReadContract({
    address: ETH_PRESALE_ADDRESS,
    abi: ETH_PRESALE_ABI,
    chainId: ethContractChainId,
    functionName: "getETHPriceInUSD",
    watch: true,
  });

  const { data: bnbProgress, refetch: refetchBNBProgress } = useReadContract({
    address: BSC_PRESALE_ADDRESS,
    abi: BSC_PRESALE_ABI,
    chainId: bscContractChainId,
    functionName: "progressBNB",
    watch: true,
  });

  const { data: bscUSDTProgress, refetch: refetchBSCUSDT } = useReadContract({
    address: BSC_PRESALE_ADDRESS,
    abi: BSC_PRESALE_ABI,
    chainId: bscContractChainId,
    functionName: "progressUSDT",
    watch: true,
  });

  const { data: bnbPrice, refetch: refetchBNBPrice } = useReadContract({
    address: BSC_PRESALE_ADDRESS,
    abi: BSC_PRESALE_ABI,
    chainId: bscContractChainId,
    functionName: "getBNBPriceInUSD",
    watch: true,
  });

  useEffect(() => {
    if (purchaseCompleted) {
      const refetchAll = async () => {
        setTimeout(async () => {
          await Promise.all([
            refetchETHProgress(),
            refetchETHUSDC(),
            refetchETHUSDT(),
            refetchETHPrice(),
            refetchBNBProgress(),
            refetchBSCUSDT(),
            refetchBNBPrice(),
            refetchEthUserPurchases(),
            refetchBscUserPurchases(),
          ]);
        }, 1000);
      };
      refetchAll();
    }
  }, [
    purchaseCompleted,
    refetchETHProgress,
    refetchETHUSDC,
    refetchETHUSDT,
    refetchETHPrice,
    refetchBNBProgress,
    refetchBSCUSDT,
    refetchBNBPrice,
    refetchEthUserPurchases,
    refetchBscUserPurchases,
  ]);

  useEffect(() => {
    const calculateTotalRaised = () => {
      try {
        let totalRaised = 0;

        if (ethProgress && ethPrice) {
          const ethAmount = Number(formatUnits(ethProgress, 18));
          const ethUsdPrice = Number(ethPrice);

          // console.log("ETH Amount:", ethAmount);
          // console.log("ETH USD Price:", ethUsdPrice);
          // console.log("ETH Total:", ethAmount * ethUsdPrice);

          if (!isNaN(ethAmount) && !isNaN(ethUsdPrice)) {
            totalRaised += ethAmount * ethUsdPrice;
          } else {
            console.error("Invalid ETH amount or price");
          }
        }

        if (ethUSDCProgress) {
          const usdcAmount = Number(formatUnits(ethUSDCProgress, 6));

          // console.log("USDC Amount:", usdcAmount);
          if (!isNaN(usdcAmount)) {
            totalRaised += usdcAmount;
          } else {
            console.error("Invalid USDC progress");
          }
        }

        if (ethUSDTProgress) {
          const usdtAmount = Number(formatUnits(ethUSDTProgress, 6));

          // console.log("USDT Amount:", usdtAmount);
          if (!isNaN(usdtAmount)) {
            totalRaised += usdtAmount;
          } else {
            console.error("Invalid USDT progress");
          }
        }

        if (bnbProgress && bnbPrice) {
          const bnbAmount = Number(formatUnits(bnbProgress, 18));
          const bnbUsdPrice = Number(bnbPrice);

          // console.log("BNB Amount:", bnbAmount);
          // console.log("BNB USD Price:", bnbUsdPrice);
          // console.log("BNB Total:", bnbAmount * bnbUsdPrice);

          if (!isNaN(bnbAmount) && !isNaN(bnbUsdPrice)) {
            totalRaised += bnbAmount * bnbUsdPrice;
          }
        }

        if (bscUSDTProgress) {
          const usdtAmount = Number(formatUnits(bscUSDTProgress, 18));

          // console.log("BSC USDT Amount:", usdtAmount);

          if (!isNaN(usdtAmount)) {
            totalRaised += usdtAmount;
          } else {
            console.error("Invalid BSC USDT progress");
          }
        }

        setRaisedAmount(
          totalRaised +
            272932 +
            13000 +
            37985.27 +
            10000 +
            15000 +
            45000 +
            5000 +
            7000 +
            5000 +
            5000 +
            26000 +
            10000 +
            5000 +
            12000 +
            12000 +
            11000
        );
      } catch (error) {
        console.error("Error calculating totals:", error);
      }
    };

    calculateTotalRaised();
  }, [
    ethProgress,
    ethUSDCProgress,
    ethUSDTProgress,
    ethPrice,
    setRaisedAmount,
    bnbProgress,
    bnbPrice,
    bscUSDTProgress,
  ]);

  useEffect(() => {
    const calculateUserTokens = () => {
      try {
        let userTokens = 0;

        if (!errorEth) {
          if (ethUserPurchases && ethUserPurchases > 0n) {
            userTokens += Number(formatUnits(ethUserPurchases, 18));
          }
        }

        if (!errorBsc) {
          if (bscUserPurchases && bscUserPurchases > BigInt(0)) {
            userTokens += Number(formatUnits(bscUserPurchases, 18));
          }
        }

        setTokensBought(userTokens > 0 ? userTokens.toFixed(2) : "0");
      } catch (error) {
        console.error("Error calculating user tokens:", error);
        setTokensBought("0");
      }
    };

    calculateUserTokens();
  }, [ethUserPurchases, bscUserPurchases, errorEth, errorBsc, setTokensBought]);

  return null;
};

export default ProgressTracker;

"use client";

import {
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
  useBalance,
} from "wagmi";
import { parseUnits, parseEther } from "viem";
import { useState, useEffect, useCallback } from "react";

import {
  BSC_PRESALE_ABI,
  BSC_PRESALE_ADDRESS,
  ETH_PRESALE_ABI,
  ETH_PRESALE_ADDRESS,
  TOKEN_ABI,
  ethContractChainId,
  bscContractChainId,
} from "../../../constants/wagmiConstants";

const TokenPurchaseHandler = ({
  amount,
  paymentMethod,
  setError,
  address,
  network,
}) => {
  const { writeContractAsync: writeApprove } = useWriteContract();
  const { writeContractAsync: writePurchase } = useWriteContract();

  const currentPresaleAddress =
    network === "eth" || network === "sepolia"
      ? ETH_PRESALE_ADDRESS
      : network === "bsc" || network === "bscTestnet"
      ? BSC_PRESALE_ADDRESS
      : null;

  const currentPresaleABI =
    network === "eth" || network === "sepolia"
      ? ETH_PRESALE_ABI
      : network === "bsc" || network === "bscTestnet"
      ? BSC_PRESALE_ABI
      : null;

  const currentChaindId =
    network === "eth" || network === "sepolia"
      ? ethContractChainId
      : bscContractChainId;

  const [approveTransactionHash, setApproveTransactionHash] = useState(null);
  const [purchaseTransactionHash, setPurchaseTransactionHash] = useState(null);
  const [isApproving, setIsApproving] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [hasAttemptedPurchase, setHasAttemptedPurchase] = useState(false);

  const { isLoading: isApprovalLoading, isSuccess: isApproveConfirmed } =
    useWaitForTransactionReceipt({
      hash: approveTransactionHash,
      enabled: !!approveTransactionHash,
    });

  const { isLoading: isPurchaseLoading, isSuccess: isPurchaseConfirmed } =
    useWaitForTransactionReceipt({
      hash: purchaseTransactionHash,
      enabled: !!purchaseTransactionHash,
    });

  const { data: usdtAddress } = useReadContract({
    address: currentPresaleAddress,
    abi: currentPresaleABI,
    functionName: "usdt",
    enabled: !!currentPresaleAddress && !!currentPresaleABI,
  });

  const { data: usdcAddress } = useReadContract({
    address: currentPresaleAddress,
    abi: currentPresaleABI,
    functionName: "usdc",
    enabled: !!currentPresaleAddress && !!currentPresaleABI,
  });

  const { data: usdtAllowance } = useReadContract({
    address: usdtAddress,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: [address, currentPresaleAddress],
    enabled: !!usdtAddress && !!address,
    watch: true,
  });

  const { data: usdcAllowance } = useReadContract({
    address: usdcAddress,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: [address, currentPresaleAddress],
    enabled: !!usdcAddress && !!address,
    watch: true,
  });

  const { data: usdtBalance } = useReadContract({
    address: usdtAddress,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [address],
    enabled: !!usdtAddress && !!address,
    watch: true,
  });

  const { data: usdcBalance } = useReadContract({
    address: usdcAddress,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [address],
    enabled: !!usdcAddress && !!address,
    watch: true,
  });

  const { data: nativeBalance } = useBalance({
    address,
    watch: true,
  });

  const handlePurchase = useCallback(async () => {
    if (!amount) return;

    try {
      setIsPurchasing(true);
      let txHash;

      switch (paymentMethod) {
        case "eth":
        case "sepolia": {
          const ethValue = parseEther(amount);

          txHash = await writePurchase({
            address: ETH_PRESALE_ADDRESS,
            abi: ETH_PRESALE_ABI,
            functionName: "buyTokens",
            value: ethValue,
          });
          break;
        }

        case "usdt":
          txHash = await writePurchase({
            address: currentPresaleAddress,
            abi: currentPresaleABI,
            functionName: "buyTokensWithUSDT",
            args: [parseUnits(amount, network === "eth" ? 6 : 18)],
            chainId: currentChaindId,
          });
          break;

        case "usdc":
          txHash = await writePurchase({
            address: currentPresaleAddress,
            abi: currentPresaleABI,
            functionName: "buyTokensWithUSDC",
            args: [parseUnits(amount, 6)],
          });
          break;

        case "bsc":
        case "bscTestnet": {
          const bnbValue = parseEther(amount);

          txHash = await writePurchase({
            address: BSC_PRESALE_ADDRESS,
            abi: BSC_PRESALE_ABI,
            functionName: "buyTokens",
            value: bnbValue,
          });
          break;
        }
      }

      if (txHash) {
        setPurchaseTransactionHash(txHash);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsPurchasing(false);
    }
  }, [
    amount,
    paymentMethod,
    writePurchase,
    currentPresaleAddress,
    currentPresaleABI,
    currentChaindId,
    network,
    setError,
  ]);

  useEffect(() => {
    if (isApproveConfirmed && approveTransactionHash) {
      handlePurchase();
    }
  }, [isApproveConfirmed, approveTransactionHash, handlePurchase]);

  const checkIsCompleted = useCallback(() => {
    if (!hasAttemptedPurchase) return false;

    switch (paymentMethod) {
      case "eth":
      case "sepolia":
        return purchaseTransactionHash ? isPurchaseConfirmed : false;

      case "usdt":
      case "usdc":
        const needsApproval = approveTransactionHash !== null;
        if (needsApproval) {
          return isApproveConfirmed && isPurchaseConfirmed;
        } else {
          return purchaseTransactionHash ? isPurchaseConfirmed : false;
        }

      default:
        return false;
    }
  }, [
    hasAttemptedPurchase,
    paymentMethod,
    purchaseTransactionHash,
    isPurchaseConfirmed,
    approveTransactionHash,
    isApproveConfirmed,
  ]);

  const validateBalance = useCallback(() => {
    switch (paymentMethod) {
      case "eth":
      case "sepolia":
      case "bsc":
      case "bscTestnet": {
        const nativeAmount = parseEther(amount);
        if (!nativeBalance || nativeBalance.value < nativeAmount) {
          throw new Error(
            `Insufficient ${
              network === "eth" || network === "sepolia" ? "ETH" : "BNB"
            } balance`
          );
        }
        break;
      }

      case "usdt": {
        const usdtAmount = parseUnits(amount, network === "eth" ? 6 : 18);
        if (!usdtBalance || usdtBalance < usdtAmount) {
          throw new Error("Insufficient USDT balance");
        }
        break;
      }

      case "usdc": {
        const usdcAmount = parseUnits(amount, 6);
        if (!usdcBalance || usdcBalance < usdcAmount) {
          throw new Error("Insufficient USDC balance");
        }
        break;
      }
    }
  }, [paymentMethod, amount, nativeBalance, network, usdtBalance, usdcBalance]);

  const handleBuyTokens = useCallback(async () => {
    if (!amount || !paymentMethod) return;

    try {
      validateBalance();
      setApproveTransactionHash(null);
      setPurchaseTransactionHash(null);
      setHasAttemptedPurchase(true);

      switch (paymentMethod) {
        case "eth":
        case "sepolia":
        case "bsc":
        case "bscTestnet":
          await handlePurchase();
          break;

        case "usdt": {
          const usdtAmount = parseUnits(amount, network === "eth" ? 6 : 18);
          if (!usdtAllowance || usdtAllowance < usdtAmount) {
            setIsApproving(true);
            const config = {
              address: usdtAddress,
              abi: TOKEN_ABI,
              functionName: "approve",
              args: [currentPresaleAddress, usdtAmount],
            };

            const txHash = await writeApprove(config);
            if (!txHash) {
              throw new Error("No transaction hash received");
            }

            setApproveTransactionHash(txHash);
          } else {
            await handlePurchase();
          }
          break;
        }

        case "usdc": {
          const usdcAmount = parseUnits(amount, 6);
          if (!usdcAllowance || usdcAllowance < usdcAmount) {
            setIsApproving(true);
            const config = {
              address: usdcAddress,
              abi: TOKEN_ABI,
              functionName: "approve",
              args: [currentPresaleAddress, usdcAmount],
            };

            const txHash = await writeApprove(config);
            if (!txHash) {
              throw new Error("No transaction hash received");
            }

            setApproveTransactionHash(txHash);
          } else {
            await handlePurchase();
          }
          break;
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsApproving(false);
    }
  }, [
    amount,
    paymentMethod,
    validateBalance,
    handlePurchase,
    network,
    usdtAllowance,
    usdcAllowance,
    writeApprove,
    usdtAddress,
    usdcAddress,
    currentPresaleAddress,
    setError,
  ]);

  return {
    handleBuyTokens,
    isApproving: isApproving || isApprovalLoading,
    isPurchasing: isPurchasing || isPurchaseLoading,
    isProcessing:
      isApproving || isApprovalLoading || isPurchasing || isPurchaseLoading,
    isCompleted: checkIsCompleted(),
  };
};

export default TokenPurchaseHandler;

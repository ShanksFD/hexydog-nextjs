"use client";

import { useEffect, useState, memo } from "react";
import {
  Alert,
  alpha,
  Box,
  darken,
  Divider,
  lighten,
  LinearProgress,
  linearProgressClasses,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { BiSad, BiSolidCopy } from "react-icons/bi";
import { Formik } from "formik";
import Link from "next/link";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
} from "@reown/appkit/react";
import {
  bsc,
  mainnet,
  sepolia,
  solana,
  bscTestnet,
} from "@reown/appkit/networks";

import { CustomInput } from "../../components/CustomInputs/CustomInput";

import { memo as reactMemo } from "react";
import ProgressTracker, { formatAmount } from "./Components/ProgressTracker";
import TokenCalculator from "./Components/TokenCalculator";
import TokenPurchaseHandler from "./Components/TokenPurchaseHandler";
import {
  ETH_PRESALE_ABI,
  ETH_PRESALE_ADDRESS,
  ethContractChainId,
  isDev,
  TEST_CA,
  TEST_CONTRACT_ABI,
} from "../../constants/wagmiConstants";
import { useReadContract } from "wagmi";
import { detectWalletType, logWalletError } from "../../utils/errorLogger";
import { formatUnits } from "viem";
import { theme } from "@/lib/theme";
import { formatNumber, StyledButton } from "../Ui";

const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiSelect-select": {
    padding: "8px 14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "2px solid",
    borderColor: theme.palette.primary.neutral800,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.neutral700,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "& .MuiSelect-icon": {
    color: theme.palette.primary.neutral800,
  },
}));

const NetworkOption = reactMemo(({ icon, name }) => (
  <Stack direction="row" alignItems="center" gap={1}>
    <img
      src={icon.src || icon}
      alt={`${name} blockchain network icon`}
      style={{ width: 24, height: 24 }}
      title={name}
      loading="eager"
      width={24}
      height={24}
    />
    <span aria-hidden="true">{name}</span>
  </Stack>
));

const SolanaAddressComponent = () => {
  const [copied, setCopied] = useState(false);
  const solanaAddress = "FdSNWvfhLpqnnX72nDEXuPJ2dNB236ZkGRn1NXNjDzaB";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(solanaAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          bgcolor: alpha(theme.palette.primary.neutral800, 0.5),
          borderRadius: "8px",
          p: 1,
          border: "1px solid",
          borderColor: theme.palette.primary.neutral700,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "14px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flex: 1,
          }}
        >
          {solanaAddress}
        </Typography>
        <Box
          onClick={copyToClipboard}
          sx={{
            cursor: "pointer",
            p: 1,
            borderRadius: "4px",
            color: copied
              ? theme.palette.success.main
              : theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
        >
          <BiSolidCopy size={16} />
        </Box>
      </Stack>
      <Typography
        variant="body1"
        sx={{
          color: alpha(theme.palette.common.white, 0.7),
          fontSize: "12px",
        }}
      >
        {dict.HOME_PAGE.HERO.PRESALE.SOLANA_MANUAL_SEND}
      </Typography>
    </Stack>
  );
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: "50px",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.primary.neutral800,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: "50px",
    backgroundColor: theme.palette.primary.main,
  },
}));

const NETWORK_CONFIG = {
  eth: {
    chainId: 1,
    caipNetworkId: "eip155:1",
    name: "Ethereum",
    icon: "/images/eth.webp",
    network: mainnet,
  },
  bsc: {
    chainId: 56,
    caipNetworkId: "eip155:56",
    name: "BNB Chain",
    icon: "/images/bsc.webp",
    network: bsc,
  },
  sol: {
    chainId: "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    caipNetworkId: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    name: "Solana",
    icon: "/images/solana.webp",
    network: solana,
  },
  sepolia: {
    chainId: 11155111,
    caipNetworkId: "eip155:11155111",
    name: "Sepolia",
    icon: "/images/eth.webp",
    network: sepolia,
  },
  bscTestnet: {
    chainId: 97,
    caipNetworkId: "eip155:97",
    name: "BNB Chain Testnet",
    icon: "/images/bsc.webp",
    network: bscTestnet,
  },
};

const PresalePaymentBox = ({ dict, onPurchaseSuccess }) => {
  const { data: isPaused = false } = useReadContract({
    address: TEST_CA,
    abi: TEST_CONTRACT_ABI,
    chainId: 56,
    functionName: "paused",
    watch: true,
  });

  const { data: tokenPriceUSD } = useReadContract({
    address: ETH_PRESALE_ADDRESS,
    abi: ETH_PRESALE_ABI,
    chainId: ethContractChainId,
    functionName: "tokenPriceUSD",
    watch: true,
  });

  const { address, isConnected } = useAppKitAccount();
  const { caipNetworkId, switchNetwork } = useAppKitNetwork();
  const { open } = useAppKit();

  const [paymentMethod, setPaymentMethod] = useState("eth");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const [tokensToBuy, setTokensToBuy] = useState("0");
  const [lastSwitchTime, setLastSwitchTime] = useState(0);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  const getCurrentNetwork = () => {
    if (caipNetworkId) {
      const network = Object.entries(NETWORK_CONFIG).find(
        ([_, config]) => config.caipNetworkId === caipNetworkId
      );
      return network ? network[0] : "eth";
    }
    return "eth";
  };

  const handleConnectWallet = async () => {
    try {
      await open();
    } catch (error) {
      logWalletError({
        message: "Failed to connect wallet",
        walletType: detectWalletType(),
        error: error,
        metadata: {
          networkId: selectedNetwork,
          paymentMethod,
        },
      });
      setError(`Connection error: ${error.message || "Unknown error"}`);
    }
  };

  const [selectedNetwork, setSelectedNetwork] = useState(getCurrentNetwork());

  useEffect(() => {
    if (caipNetworkId) {
      const networkKey =
        Object.entries(NETWORK_CONFIG).find(
          ([_, config]) => config.caipNetworkId === caipNetworkId
        )?.[0] || "eth";

      setSelectedNetwork(networkKey);

      const paymentMethod =
        networkKey === "bscTestnet" || networkKey === "bsc"
          ? "bsc"
          : networkKey === "sepolia" || networkKey === "eth"
          ? "eth"
          : networkKey;
      setPaymentMethod(paymentMethod);
      // switchNetwork(NETWORK_CONFIG[networkKey].network);
    }
  }, [caipNetworkId, switchNetwork]);

  useEffect(() => {
    if (!isConnected) {
      setSelectedNetwork("eth");
      setPaymentMethod("eth");
    }
  }, [isConnected]);

  useEffect(() => {
    if (caipNetworkId) {
      const networkKey =
        Object.entries(NETWORK_CONFIG).find(
          ([_, config]) => config.caipNetworkId === caipNetworkId
        )?.[0] || "eth";

      setSelectedNetwork(networkKey);

      const paymentMethod =
        networkKey === "bscTestnet" || networkKey === "bsc"
          ? "bsc"
          : networkKey === "sepolia" || networkKey === "eth"
          ? "eth"
          : networkKey;
      setPaymentMethod(paymentMethod);
    }
  }, []);

  const handleNetworkChange = async (newNetworkKey) => {
    const now = Date.now();
    if (now - lastSwitchTime < 1000) return;

    setLastSwitchTime(now);
    setSelectedNetwork(newNetworkKey);

    if (newNetworkKey !== "sol") {
      try {
        await switchNetwork(NETWORK_CONFIG[newNetworkKey].network);
      } catch (error) {
        console.warn("Network switch failed:", error);
      }
    }
  };

  const {
    handleBuyTokens,
    isApproving,
    isPurchasing,
    isProcessing,
    isCompleted,
  } = TokenPurchaseHandler({
    amount,
    paymentMethod,
    setError,
    address,
    network: selectedNetwork,
  });

  const goalAmount = 2100000;
  const currentPrice = Number(formatUnits(tokenPriceUSD || 0n, 4));
  const [raisedAmount, setRaisedAmount] = useState(0);
  const [tokensBought, setTokensBought] = useState(0);
  const progressPercents =
    raisedAmount && goalAmount
      ? (parseFloat(raisedAmount) / parseFloat(goalAmount)) * 100
      : 0;

  useEffect(() => {
    if (isCompleted) {
      setAmount(0);
      setTokensToBuy("0");
      setError(null);
      setPurchaseCompleted(true);
      onPurchaseSuccess?.();

      const timer = setTimeout(() => {
        setPurchaseCompleted(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isCompleted, onPurchaseSuccess]);

  return (
    <Stack
      gap={1}
      sx={{
        px: "12px",
        mt: { xs: 2, sm: 10 },
        width: "100%",
        alignItems: { xs: "center", lg: "flex-end" },
      }}
    >
      <Stack
        gap={1}
        sx={{
          backgroundColor: alpha(theme.palette.primary.neutral900, 0.9),
          backdropFilter: "blur(8px)",
          borderRadius: "20px",
          p: { xs: "16px", sm: "24px" },
          width: { xs: "100%", sm: "70%", md: "50%", lg: "80%" },
          zIndex: 1,
          mr: { xs: 0, lg: 2 },
          border: "2px solid",
          borderColor: alpha(theme.palette.primary.main, 0.8),
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          gap={1}
          justifyContent={"center"}
        >
          <Typography
            variant="h2"
            sx={{
              color: "common.white",
              fontSize: "24px",
              fontWeight: "600",
              lineHeight: "36px",
            }}
          >
            {dict.HOME_PAGE.HERO.PRESALE.TITLE}
          </Typography>

          <Stack
            direction={"row"}
            gap={0.5}
            alignItems={"center"}
            sx={{
              color: "common.white",
              fontSize: "14px",
              backgroundColor: alpha(theme.palette.success.main, 0.2),
              border: "1px solid",
              borderColor: theme.palette.success.main,
              borderRadius: "8px",
              p: "2px 6px",
            }}
          >
            <Box
              sx={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: theme.palette.success.main,
                zIndex: 1,
              }}
            ></Box>
            {dict.HOME_PAGE.HERO.PRESALE.STATUS}
          </Stack>
        </Stack>

        <Stack
          direction={"row"}
          gap={2}
          justifyContent={"space-between"}
          sx={{ mt: 2 }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "common.white",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {true ? (
              <Trans
                i18nKey="HOME_PAGE.HERO.PRESALE.RAISED"
                values={{ amount: formatAmount(raisedAmount) }}
              />
            ) : (
              <Skeleton variant="text" width={100} />
            )}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "common.white",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            <Trans
              i18nKey="HOME_PAGE.HERO.PRESALE.GOAL"
              values={{ amount: formatNumber(goalAmount) }}
            />
          </Typography>
        </Stack>

        <BorderLinearProgress
          variant="determinate"
          value={progressPercents}
          role="progressbar"
          aria-label={"Presale Progress: " + progressPercents.toFixed(0) + "%"}
          sx={{
            mb: 1,
            position: "relative",
            "&::after": {
              content: `'${progressPercents.toFixed(0)}%'`,
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontWeight: "700",
              fontSize: "12px",
              zIndex: 1,
            },
          }}
        />

        <Stack alignItems={"center"} sx={{ mt: 2 }}>
          <Typography
            variant="body1"
            sx={{
              color: "common.white",
              fontSize: "16px",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {dict.HOME_PAGE.HERO.PRESALE.YOUR_PURCHASED_TOKENS}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "primary.main",
              fontSize: "40px",
              fontWeight: "600",
            }}
          >
            {tokensBought}
          </Typography>
        </Stack>

        <Divider
          sx={{
            my: 1,
            "&::before": {
              border: "none",
              backgroundImage: `linear-gradient(to left, ${theme.palette.primary.neutral800}, transparent)`,
              height: "2px",
            },

            "&::after": {
              border: "none",
              backgroundImage: `linear-gradient(to right, ${theme.palette.primary.neutral800}, transparent)`,
              height: "2px",
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "common.white",
              fontSize: "16px",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            1 HEXY = 0.0044 USD
          </Typography>
        </Divider>

        <Stack alignItems={"flex-start"} gap={1}>
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ width: "100%" }}
          >
            <Typography
              variant="body1"
              id="network-select-label"
              sx={{
                color: "common.white",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {dict.HOME_PAGE.HERO.PRESALE.NETWORK}
            </Typography>

            <StyledSelect
              labelId="network-select-label"
              id="network-select"
              aria-labelledby="network-select-label"
              value={selectedNetwork}
              onChange={(e) => handleNetworkChange(e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    width: "180px",
                    bgcolor: theme.palette.primary.neutral900,
                    boxShadow: "none",
                    border: `2px solid ${theme.palette.primary.neutral800}`,
                    mt: 1,
                    "& .MuiMenuItem-root": {
                      py: 1.5,
                      color: "white",
                      "&:hover": {
                        bgcolor: theme.palette.primary.neutral800,
                      },
                    },
                    "& .Mui-selected": {
                      bgcolor: `${theme.palette.primary.neutral800} !important`,
                    },
                  },
                },
              }}
              sx={{
                width: "180px",
                backgroundColor: theme.palette.primary.neutral900,
                borderRadius: "8px",
              }}
            >
              <MenuItem value="eth">
                <NetworkOption icon={"/images/eth.webp"} name="Ethereum" />
              </MenuItem>
              <MenuItem value="bsc">
                <NetworkOption icon={"/images/bsc.webp"} name="BNB Chain" />
              </MenuItem>
              <MenuItem value="sol">
                <NetworkOption icon={"/images/solana.webp"} name="Solana" />
              </MenuItem>
              {isDev && (
                <>
                  <MenuItem value="sepolia">
                    <NetworkOption icon={"/images/eth.webp"} name="Sepolia" />
                  </MenuItem>
                  <MenuItem value="bscTestnet">
                    <NetworkOption
                      icon={"/images/bsc.webp"}
                      name="BSCTestnet"
                    />
                  </MenuItem>
                </>
              )}
            </StyledSelect>
          </Stack>
        </Stack>

        <Stack alignItems={"flex-start"} gap={1} sx={{ mt: 2 }}>
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ width: "100%" }}
          >
            {selectedNetwork !== "sol" && (
              <Typography
                variant="body1"
                sx={{
                  color: "common.white",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                {dict.HOME_PAGE.HERO.PRESALE.PAYMENT_METHOD}
              </Typography>
            )}

            {selectedNetwork === "sol" ? (
              <SolanaAddressComponent t={t} />
            ) : (
              <Stack
                direction={"row"}
                gap={1}
                justifyContent={"center"}
                sx={{
                  flexWrap: "wrap",
                }}
                role="radiogroup"
                aria-labelledby="payment-method-label"
              >
                {selectedNetwork === "eth" || selectedNetwork === "sepolia" ? (
                  <div
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      width: "auto",
                      height: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid",
                      padding: 2,
                      borderColor:
                        paymentMethod === "eth" || paymentMethod === "sepolia"
                          ? theme.palette.primary.main
                          : theme.palette.primary.neutral800,
                    }}
                    onClick={() => setPaymentMethod("eth")}
                  >
                    <img
                      title="Ethereum"
                      src={"/images/eth.webp"}
                      alt="Eth"
                      width={32}
                      height={32}
                      loading="eager"
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      width: "auto",
                      height: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid",
                      padding: 2,
                      borderColor:
                        paymentMethod === "bsc"
                          ? theme.palette.primary.main
                          : theme.palette.primary.neutral800,
                    }}
                    onClick={() => setPaymentMethod("bsc")}
                  >
                    <img
                      src={"/images/bsc.webp"}
                      alt="Bsc"
                      width={32}
                      height={32}
                      title="BSC"
                      loading="eager"
                    />
                  </div>
                )}

                {selectedNetwork === "eth" && (
                  <div
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      width: "auto",
                      height: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid",
                      padding: 2,
                      borderColor:
                        paymentMethod === "usdt"
                          ? theme.palette.primary.main
                          : theme.palette.primary.neutral800,
                    }}
                    onClick={() => setPaymentMethod("usdt")}
                  >
                    <img
                      src={"/images/usdt.webp"}
                      alt="Usdt"
                      width={32}
                      height={32}
                      title="USDT"
                      loading="eager"
                    />
                  </div>
                )}

                {selectedNetwork === "eth" && (
                  <div
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      width: "auto",
                      height: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid",
                      padding: 2,
                      borderColor:
                        paymentMethod === "usdc"
                          ? theme.palette.primary.main
                          : theme.palette.primary.neutral800,
                    }}
                    onClick={() => setPaymentMethod("usdc")}
                  >
                    <img
                      src={"/images/usdc.webp"}
                      alt="Usdc"
                      width={32}
                      height={32}
                      title="USDC"
                      loading="eager"
                    />
                  </div>
                )}

                <div
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    width: "auto",
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid",
                    padding: 2,
                    borderColor:
                      paymentMethod === "card"
                        ? theme.palette.primary.main
                        : theme.palette.primary.neutral800,
                  }}
                  onClick={() => setPaymentMethod("card")}
                >
                  <img
                    src={"/images/card.webp"}
                    alt="Card"
                    width={32}
                    height={32}
                    title="Card"
                    loading="eager"
                  />
                </div>
              </Stack>
            )}
          </Stack>
        </Stack>

        {paymentMethod === "card" || selectedNetwork === "sol" ? (
          <Stack sx={{ mt: 2, mb: 1 }}>
            <Typography variant="body1" sx={{ color: "common.white" }}>
              {dict.HOME_PAGE.HERO.PRESALE.CARD_TITLE}
            </Typography>
            <Stack
              direction={"row"}
              gap={4}
              justifyContent={"center"}
              alignItems={"center"}
              mt={2}
            >
              <Link
                href="https://changenow.io/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={"/images/changenow.webp"}
                  alt="ChangeNow"
                  width={80}
                  height={45}
                  style={{ objectFit: "contain" }}
                  title="ChangeNow"
                  loading="lazy"
                />
              </Link>

              <Link
                href="https://www.moonpay.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={"/images/moonpay.webp"}
                  alt="MoonPay"
                  width={150}
                  height={35}
                  style={{ objectFit: "contain" }}
                  title="MoonPay"
                  loading="lazy"
                />
              </Link>
            </Stack>
          </Stack>
        ) : (
          <Box>
            <Formik initialValues={{ amount: 0, receivedAmount: "0.0" }}>
              {() => {
                return (
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    gap={2}
                    justifyContent={"center"}
                    sx={{ mt: 2 }}
                  >
                    <CustomInput
                      label={dict.HOME_PAGE.HERO.PRESALE.AMOUNT.replace(
                        "{{currency}}",
                        paymentMethod.toUpperCase()
                      )}
                      name="amount"
                      id="amount"
                      type="number"
                      value={amount === 0 ? "" : amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.0"
                      manualMarginBottom={"8px"}
                      disabled={paymentMethod === "sol"}
                      InputProps={{
                        endAdornment: (
                          <Stack direction="row" gap={1} alignItems="center">
                            <img
                              src={
                                paymentMethod === "eth" ||
                                paymentMethod === "sepolia"
                                  ? "/images/eth.webp"
                                  : paymentMethod === "usdt"
                                  ? "/images/usdt.webp"
                                  : paymentMethod === "usdc"
                                  ? "/images/usdc.webp"
                                  : paymentMethod === "bsc" ||
                                    paymentMethod === "bscTestnet"
                                  ? "/images/bsc.webp"
                                  : "/images/card.webp"
                              }
                              alt={paymentMethod}
                              width={24}
                              height={24}
                              title="Token"
                              loading="eager"
                            />
                          </Stack>
                        ),
                      }}
                    />

                    <CustomInput
                      label={dict.HOME_PAGE.HERO.PRESALE.RECEIVED_AMOUNT}
                      name="receivedAmount"
                      id="receivedAmount"
                      type="text"
                      value={tokensToBuy}
                      placeholder="0.0"
                      manualMarginBottom="8px"
                      disabled
                      InputProps={{
                        endAdornment: (
                          <Stack direction="row" gap={1} alignItems="center">
                            <img
                              src={"/images/token.webp"}
                              alt="token"
                              width={24}
                              height={24}
                              title="HEXY Token"
                              loading="eager"
                            />
                          </Stack>
                        ),
                      }}
                    />
                  </Stack>
                );
              }}
            </Formik>
          </Box>
        )}

        {!isConnected ? (
          <Stack direction="row" flexWrap={"wrap"} gap={2}>
            <StyledButton
              sx={{
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                width: "100%",
                color: theme.palette.primary.neutral1000,
                "&:hover": {
                  color: theme.palette.primary.neutral900,
                },
              }}
              onClick={handleConnectWallet}
            >
              {dict.HOME_PAGE.HERO.PRESALE.CONNECT_WALLET}
            </StyledButton>
          </Stack>
        ) : selectedNetwork === "sol" ? (
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.primary.secondary,
              textAlign: "center",
              py: 1,
            }}
          >
            {dict.HOME_PAGE.HERO.PRESALE.SOLANA_NOTE}
          </Typography>
        ) : (
          <StyledButton
            disabled={!amount || amount <= 0 || isPaused}
            fullWidth
            variant="contained"
            onClick={handleBuyTokens}
          >
            {isApproving
              ? dict.HOME_PAGE.HERO.PRESALE.APPROVING
              : isPurchasing
              ? dict.HOME_PAGE.HERO.PRESALE.PURCHASING
              : isProcessing
              ? dict.HOME_PAGE.HERO.PRESALE.PROCESSING
              : dict.HOME_PAGE.HERO.PRESALE.BUY({ amount: tokensToBuy })}
          </StyledButton>
        )}

        {error && (
          <Alert
            severity="error"
            icon={<BiSad />}
            onClose={() => setError(null)}
            sx={{
              mt: 1,
              maxWidth: "100%",
              backgroundColor: alpha(theme.palette.error.main, 0.4),
              borderRadius: theme.shape.defaultBorderRadius,
              border: "2px solid",
              borderColor: darken(theme.palette.error.main, 0.3),
              fontWeight: "400",
              "& .MuiAlert-icon": {
                color: lighten(theme.palette.error.main, 0.5),
              },
              "& .MuiAlert-message": {
                width: "100%",
                wordBreak: "break-word",
                color: lighten(theme.palette.error.main, 0.5),
              },
            }}
          >
            {error.length > 190 ? `${error.slice(0, 100)}...` : error}
          </Alert>
        )}

        <ProgressTracker
          setRaisedAmount={setRaisedAmount}
          setTokensBought={setTokensBought}
          purchaseCompleted={purchaseCompleted}
          network={selectedNetwork}
        />
        <TokenCalculator
          amount={amount}
          method={paymentMethod}
          setTokensToBuy={setTokensToBuy}
        />
      </Stack>
    </Stack>
  );
};

export default memo(PresalePaymentBox);

"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Alert,
  alpha,
  Box,
  Container,
  lighten,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { BiCheck } from "react-icons/bi";
import Image from "next/image";

import { getTransitionStyle, StyledButton } from "@/components/Utils/UIUtils";

import PresalePaymentBox from "@/components/PresalePaymentBox/PresalePaymentBox";
import { theme } from "@/lib/theme";

const Countdown = ({ presaleTime, t }) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const cycleDuration = 5 * 24 * 60 * 60 * 1000;
    const elapsedTime = (now - presaleTime) % cycleDuration;
    const remainingTime = cycleDuration - elapsedTime;

    return {
      days: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((remainingTime % (1000 * 60)) / 1000),
    };
  };

  const timeLeft = useMemo(calculateTimeLeft, [presaleTime]);
  const [currentTimeLeft, setCurrentTimeLeft] = useState(timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [presaleTime]);

  const timeUnits = [
    { count: currentTimeLeft.days, label: t("HOME_PAGE.HERO.PRESALE.TIME.D") },
    { count: currentTimeLeft.hours, label: t("HOME_PAGE.HERO.PRESALE.TIME.H") },
    {
      count: currentTimeLeft.minutes,
      label: t("HOME_PAGE.HERO.PRESALE.TIME.M"),
    },
    {
      count: currentTimeLeft.seconds,
      label: t("HOME_PAGE.HERO.PRESALE.TIME.S"),
    },
  ];

  return (
    <Stack gap={1} sx={{ width: { xs: "100%", sm: "60%" }, mt: 1 }}>
      <Typography
        variant="body1"
        sx={{
          color: "white",
          textTransform: "uppercase",
          alignSelf: "center",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        {t("HOME_PAGE.HERO.PRESALE.NEXT_PRICE")}
      </Typography>
      <Stack
        direction={"row"}
        sx={{
          gap: 2,
          backgroundColor: alpha(theme.palette.primary.neutral1000, 0.5),
          borderRadius: theme.shape.roundedButtonBorderRadius,
          borderTop: "2px solid",
          borderBottom: "2px solid",
          borderColor: theme.palette.primary.main,
          height: "100px",
          backdropFilter: "blur(8px)",
        }}
        alignItems={"center"}
      >
        {timeUnits.map((unit, index) => (
          <Stack
            key={index}
            sx={{
              alignItems: "center",
              padding: "8px",
              flex: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "20px", md: "28px" },
                fontWeight: "700",
                color: "white",
              }}
            >
              {Math.abs(unit.count).toString().padStart(2, "0")}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: "600",
                color: "white",
              }}
            >
              {unit.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default function Hero() {
  const { t } = useTranslation();
  const presaleTime = new Date("2025-03-05T17:00:00").getTime();
  const transformTransitionStyle = getTransitionStyle(theme, ["transform"]);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccess(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "100%",
        pb: { xs: 4, lg: 8 },
        pt: { xs: 12, lg: 8 },
        position: "relative",
        overflow: "hidden",
      }}
      id="hero"
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Image
          src="/images/hero-overlay.webp"
          alt="Hero Background"
          fill
          style={{ objectFit: "cover", opacity: 0.8 }}
          priority
          sizes="100vw"
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(90deg, ${alpha(
            theme.palette.primary.neutral1000,
            0.25
          )} 0%, rgba(255,255,255,0) 50%, ${alpha(
            theme.palette.primary.neutral1000,
            0.25
          )} 100%)`,
          zIndex: 1,
        }}
      />

      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: { xs: 4, lg: 0 },
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 2,
          mt: { xs: 2, sm: 4, lg: 0 },
        }}
        maxWidth="xl"
      >
        <Stack
          gap={3}
          sx={{
            flexBasis: "50%",
            px: "12px",
            ml: { xs: 0, lg: 2 },
          }}
        >
          <Stack gap={3} component={"header"}>
            <Typography
              variant="h1"
              sx={{
                color: "text.white",
                fontSize: { xs: "24px", md: "32px" },
                fontWeight: "800",
                userSelect: "text",
              }}
            >
              {t("HOME_PAGE.HERO.TITLE")}
            </Typography>

            <Countdown presaleTime={presaleTime} t={t} />

            <Typography
              variant="body1"
              sx={{
                color: "primary.neutral200",
                fontWeight: "300",
                userSelect: "text",
                maxWidth: { xs: "100%", sm: "500px" },
              }}
            >
              {t("HOME_PAGE.HERO.DESCRIPTION")}
            </Typography>
          </Stack>

          <StyledButton
            target="_blank"
            href="https://app.solidproof.io/projects/hexydog"
            rel="noreferrer"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              p: "12px 24px",
              fontSize: "16px",
              borderRadius: "32px",
              alignSelf: "flex-start",
              color: theme.palette.primary.neutral1000,
              ...transformTransitionStyle,
              "&:hover": {
                transform: "translateY(-2px)",
                color: theme.palette.primary.neutral900,
              },
            }}
          >
            {t("HOME_PAGE.HERO.BUTTON_AUDIT")}
            <Image
              src="/images/solidproof.webp"
              alt="SolidProof"
              width={96}
              height={24}
              style={{
                marginLeft: "8px",
                filter: "invert(1)",
              }}
            />
          </StyledButton>
        </Stack>

        <Box sx={{ width: "100%", flexBasis: "45%" }}>
          <PresalePaymentBox onPurchaseSuccess={() => setShowSuccess(true)} />
        </Box>
      </Container>

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
          {t("HOME_PAGE.HERO.PRESALE.PURCHASE_SUCCESS")}
        </Alert>
      </Snackbar>
    </Box>
  );
}

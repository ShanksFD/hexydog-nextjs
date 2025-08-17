import { alpha, Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

import { theme } from "@/lib/theme";
import HeroNotifications from "./Components/HeroNotifications";
import HeroCountdown from "./Components/HeroCountdown";
import { StyledButton } from "@/components/Ui";
import PresalePaymentBox from "@/components/PresalePaymentBox/PresalePaymentBox";

export default function Hero({ dict }) {
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
              {dict.HOME_PAGE.HERO.TITLE}
            </Typography>

            <HeroCountdown
              translations={{
                nextPrice: dict.HOME_PAGE.HERO.PRESALE.NEXT_PRICE,
                timeLabels: {
                  days: dict.HOME_PAGE.HERO.PRESALE.TIME.D,
                  hours: dict.HOME_PAGE.HERO.PRESALE.TIME.H,
                  minutes: dict.HOME_PAGE.HERO.PRESALE.TIME.M,
                  seconds: dict.HOME_PAGE.HERO.PRESALE.TIME.S,
                },
              }}
            />

            <Typography
              variant="body1"
              sx={{
                color: "primary.neutral200",
                fontWeight: "300",
                userSelect: "text",
                maxWidth: { xs: "100%", sm: "500px" },
              }}
            >
              {dict.HOME_PAGE.HERO.DESCRIPTION}
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
              "&:hover": {
                transform: "translateY(-2px)",
                color: theme.palette.primary.neutral1000,
                backgroundColor: theme.palette.primary.main,
              },
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {dict.HOME_PAGE.HERO.BUTTON_AUDIT}
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
          <PresalePaymentBox dict={dict} />
        </Box>
      </Container>

      <HeroNotifications />
    </Box>
  );
}

import { alpha, Box, Container, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import Image from "next/image";

const Feature = ({ icon, title, description, theme, i }) => {
  return (
    <Stack
      sx={{
        justifyContent: "flex-start",
        p: 3,
        borderRadius: theme.shape.roundedButtonBorderRadius,
        backgroundColor: alpha(theme.palette.primary.neutral900, 0.7),
        width: "100%",
        position: "relative",
        overflow: "hidden",
        zIndex: 1,
        backdropFilter: "blur(10px)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `radial-gradient(
            circle at top left,
            ${alpha(theme.palette.primary.main, 0.1)},
            transparent 70%
          )`,
          zIndex: 0,
          pointerEvents: "none",
        },
        "& > *": {
          position: "relative",
          zIndex: 1,
        },
      }}
    >
      <Box sx={{ minHeight: "45px", mb: 1 }}>{icon}</Box>
      <Typography
        variant="h4"
        sx={{
          fontSize: "24px",
          fontWeight: "600",
          color: "common.white",
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "primary.neutral300", fontSize: "16px", width: "80%" }}
      >
        {description}
      </Typography>
    </Stack>
  );
};

export default function HowToBuy() {
  const { t } = useTranslation();
  const theme = useTheme();

  const features = [
    {
      icon: (
        <Image
          src="/images/wallet-icon.webp"
          alt="Wallet icon"
          width={48}
          height={48}
        />
      ),
      title: t("HOME_PAGE.HOW_TO_BUY.FEATURES.0.TITLE"),
      description: t("HOME_PAGE.HOW_TO_BUY.FEATURES.0.DESCRIPTION"),
    },
    {
      icon: (
        <Image
          src="/images/global-icon.webp"
          alt="Global icon"
          width={48}
          height={48}
        />
      ),
      title: t("HOME_PAGE.HOW_TO_BUY.FEATURES.1.TITLE"),
      description: t("HOME_PAGE.HOW_TO_BUY.FEATURES.1.DESCRIPTION"),
    },
    {
      icon: (
        <Image
          src="/images/buy-icon.webp"
          alt="Buy icon"
          width={48}
          height={48}
        />
      ),
      title: t("HOME_PAGE.HOW_TO_BUY.FEATURES.2.TITLE"),
      description: t("HOME_PAGE.HOW_TO_BUY.FEATURES.2.DESCRIPTION"),
    },
    {
      icon: (
        <Image
          src="/images/claim-icon.webp"
          alt="Claim icon"
          width={48}
          height={48}
        />
      ),
      title: t("HOME_PAGE.HOW_TO_BUY.FEATURES.3.TITLE"),
      description: t("HOME_PAGE.HOW_TO_BUY.FEATURES.3.DESCRIPTION"),
    },
  ];

  return (
    <Box
      sx={{
        backgroundImage: `url(/images/image-how-to-buy.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
        zIndex: 4,
      }}
    >
      <Container
        component="section"
        sx={{ my: 6 }}
        maxWidth="lg"
        id="how-to-buy"
      >
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            p: { xs: 2, md: 4 },
            py: { xs: 4, md: 7 },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `linear-gradient(90deg, ${alpha(
                theme.palette.primary.neutral1000,
                0.6
              )} 0%, rgba(255,255,255,0) 50%, ${alpha(
                theme.palette.primary.neutral1000,
                0.6
              )} 100%)`,
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `linear-gradient(0deg, ${alpha(
                theme.palette.primary.neutral900,
                0.6
              )} 0%, ${alpha(
                theme.palette.primary.neutral1000,
                0.3
              )} 50%,  ${alpha(theme.palette.primary.neutral1000, 0.6)} 100%)`,
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <Stack component={"header"} gap={2}>
            <Stack gap={1}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  color: "#ffca00",
                  textAlign: "center",
                  zIndex: 2,
                }}
              >
                {t("HOME_PAGE.HOW_TO_BUY.TITLE")}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "24px", sm: "32px", md: "40px" },
                  fontWeight: "600",
                  color: "common.white",
                  textAlign: "center",
                  zIndex: 2,
                }}
              >
                {t("HOME_PAGE.HOW_TO_BUY.SUBTITLE")}
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              sx={{
                color: "primary.neutral200",
                fontSize: "18px",
                fontWeight: "300",
                textAlign: "center",
                width: { xs: "100%", sm: "70%" },
                mx: "auto",
                zIndex: 2,
              }}
            >
              {t("HOME_PAGE.HOW_TO_BUY.PARAGRAPH")}
            </Typography>
          </Stack>
          <Stack gap={2} sx={{ width: { xs: "100%", sm: "90%", md: "70%" } }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              gap={2}
              sx={{ mt: "32px" }}
            >
              {features.slice(0, 2).map((feature, i) => (
                <Feature
                  key={i}
                  i={i}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  theme={theme}
                />
              ))}
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
              {features.slice(2, 4).map((feature, i) => (
                <Feature
                  key={i}
                  i={i}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  theme={theme}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

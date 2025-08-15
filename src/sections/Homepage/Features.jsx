import { theme } from "@/lib/theme";
import { alpha, Box, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

const Feature = ({ icon, title, description, theme, i }) => {
  return (
    <Stack
      gap={2}
      sx={{
        height: "100%",
        minHeight: "200px",
        justifyContent: "flex-start",
        p: 3,
        borderRadius: theme.shape.roundedButtonBorderRadius,
        backgroundColor: alpha(theme.palette.primary.neutral900, 0.7),
        backdropFilter: "blur(10px)",
        position: "relative",
        overflow: "hidden",
        zIndex: 1,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `radial-gradient(
            circle at top left,
            ${alpha(theme.palette.primary.main, 0.05)},
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
      <Box sx={{ minHeight: "45px" }}>{icon}</Box>
      <Typography
        variant="h4"
        sx={{ fontSize: "28px", fontWeight: "600", color: "common.white" }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", fontSize: "16px" }}
      >
        {description}
      </Typography>
    </Stack>
  );
};

export default function Features({ dict }) {
  const features = [
    {
      icon: (
        <Image
          src="/images/hexy-multi-chain.webp"
          alt="MultiChain icon"
          width={64}
          height={60}
          style={{ objectFit: "contain" }}
        />
      ),
      title: dict.HOME_PAGE.FEATURES.FEATURES[0].TITLE,
      description: dict.HOME_PAGE.FEATURES.FEATURES[0].DESCRIPTION,
    },
    {
      icon: (
        <Image
          src="/images/hexy-meme-power.webp"
          alt="Meme Power icon"
          width={64}
          height={60}
          style={{ objectFit: "contain" }}
        />
      ),
      title: dict.HOME_PAGE.FEATURES.FEATURES[1].TITLE,
      description: dict.HOME_PAGE.FEATURES.FEATURES[1].DESCRIPTION,
    },
    {
      icon: (
        <Image
          src="/images/hexy-innovative-staking-system.webp"
          alt="Staking icon"
          width={64}
          height={60}
          style={{ objectFit: "contain" }}
        />
      ),
      title: dict.HOME_PAGE.FEATURES.FEATURES[2].TITLE,
      description: dict.HOME_PAGE.FEATURES.FEATURES[2].DESCRIPTION,
    },
    {
      icon: (
        <Image
          src="/images/hexy-rescue-fund.webp"
          alt="Rescue Fund icon"
          width={64}
          height={60}
          style={{ objectFit: "contain" }}
        />
      ),
      title: dict.HOME_PAGE.FEATURES.FEATURES[3].TITLE,
      description: dict.HOME_PAGE.FEATURES.FEATURES[3].DESCRIPTION,
    },
    {
      icon: (
        <Image
          src="/images/hexy-global-ambassador.webp"
          alt="Global Ambassador icon"
          width={64}
          height={60}
          style={{ objectFit: "contain" }}
        />
      ),
      title: dict.HOME_PAGE.FEATURES.FEATURES[4].TITLE,
      description: dict.HOME_PAGE.FEATURES.FEATURES[4].DESCRIPTION,
    },
    {
      icon: (
        <Image
          src="/images/hexy-transparent-operations.webp"
          alt="Operations icon"
          width={64}
          height={60}
          style={{ objectFit: "contain" }}
        />
      ),
      title: dict.HOME_PAGE.FEATURES.FEATURES[5].TITLE,
      description: dict.HOME_PAGE.FEATURES.FEATURES[5].DESCRIPTION,
    },
  ];

  return (
    <Box
      sx={{
        backgroundImage: `url(/images/image-features.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        py: 8,
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
            0.3
          )} 0%, ${alpha(theme.palette.primary.neutral1000, 0.1)} 50%,  ${alpha(
            theme.palette.primary.neutral1000,
            0.3
          )} 100%)`,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <Container
        component="section"
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 2 }}
      >
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            py: { xs: 4, md: 7 },
          }}
        >
          <Stack component={"header"} gap={1}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "uppercase",
                color: "#ffca00",
                textAlign: "center",
              }}
            >
              {dict.HOME_PAGE.FEATURES.TITLE}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "24px", sm: "32px", md: "40px" },
                fontWeight: "600",
                color: "common.white",
                textAlign: "center",
              }}
            >
              {dict.HOME_PAGE.FEATURES.SUBTITLE}
            </Typography>
          </Stack>
          <Grid container spacing={2} sx={{ mt: "32px" }}>
            {features.map((feature, i) => (
              <Grid size={{ xs: 12, sm: 4 }} key={i}>
                <Feature
                  i={i}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  theme={theme}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

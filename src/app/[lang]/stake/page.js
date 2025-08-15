import { getDictionary } from "../dictionaries";
import { theme } from "@/lib/theme";
import { Box, Container, Typography } from "@mui/material";

export default async function StakePage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.neutral1000,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          py: "10em",
          gap: 2,
          height: "100vh",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: "800",
            fontSize: { xs: "32px", md: "40px" },
            maxWidth: { xs: "100%", md: "700px" },
            textTransform: "uppercase",
            color: "common.white",
          }}
        >
          {dict.STAKE.COMING_SOON}
        </Typography>
      </Container>
    </Box>
  );
}

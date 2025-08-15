import { Box, Container, Stack, Typography } from "@mui/material";

import FaqSummary from "@/components/Faq/FaqSummary";

export default function Faq({ dict }) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column" },
        justifyContent: "center",
        alignItems: "center",
        py: { xs: 8, md: 10 },
        backgroundColor: "primary.neutral1000",
      }}
      maxWidth="lg"
      id="faq"
    >
      <Stack gap={4} sx={{ width: "100%" }}>
        <Stack component={"header"}>
          <Typography
            variant="h3"
            sx={{
              fontSize: "40px",
              fontWeight: "700",
              textAlign: "center",
              color: "primary.neutral100",
            }}
          >
            {dict.HOME_PAGE.FAQ.TITLE}
          </Typography>
        </Stack>

        <Box sx={{ width: { xs: "100%", md: "70%" }, mx: "auto" }}>
          <FaqSummary dict={dict} />
        </Box>
      </Stack>
    </Container>
  );
}

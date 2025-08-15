import { Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

import LiveChains from "./LiveChains";

export default function About({ dict }) {
  return (
    <Container
      component="section"
      sx={{
        py: 8,
        overflow: "hidden",
      }}
      maxWidth="lg"
      id="about"
    >
      <LiveChains dict={dict} />

      <Stack
        direction={{ xs: "column", md: "row" }}
        gap={{ xs: 3, md: "48px" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ mt: 4 }}
      >
        <Stack
          gap={2}
          sx={{
            flexBasis: { xs: "100%", md: "50%" },
            width: "100%",
          }}
        >
          <Stack component={"header"} gap={2}>
            <Stack gap={1}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  color: "primary.main",
                }}
              >
                {dict.HOME_PAGE.ABOUT.TITLE}
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "24px", sm: "32px", md: "40px" },
                  fontWeight: "600",
                  color: "common.white",
                }}
              >
                {dict.HOME_PAGE.ABOUT.SUBTITLE}
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: "18px",
                fontWeight: "300",
              }}
            >
              {dict.HOME_PAGE.ABOUT.PARAGRAPH}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            flexBasis: { xs: "100%", md: "50%" },
            mt: { xs: 4, md: 0 },
          }}
        >
          <Image
            src="/images/image-about.webp"
            alt="Section Image"
            width={400}
            height={400}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
            title="Section Image"
          />
        </Stack>
      </Stack>
    </Container>
  );
}

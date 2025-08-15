"use client";
import Typography from "@mui/material/Typography";
import {
  Box,
  Container,
  Link,
  Stack,
  alpha,
  lighten,
  Grid,
} from "@mui/material";

import { theme } from "@/lib/theme";
import { footerSocials } from "../Ui";

export default function MainFooter({ dict }) {
  return (
    <Box
      sx={{
        backgroundColor: lighten(theme.palette.primary.neutral1000, 0.03),
        py: 3,
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: "500",
                mb: 1,
                fontSize: { xs: "16px", md: "18px" },
                color: "primary.neutral100",
              }}
            >
              {dict.MAIN_FOOTER.DISCLAIMER_TITLE}
            </Typography>
            <Typography
              sx={{
                color: alpha(theme.palette.primary.neutral400, 0.75),
                fontSize: { xs: "12px", md: "14px" },
                fontWeight: "300",
                lineHeight: 1.5,
              }}
            >
              {dict.MAIN_FOOTER.DISCLAIMER}
            </Typography>
            <Typography
              sx={{
                color: theme.palette.primary.neutral400,
                fontSize: "16px",
                fontWeight: "300",
                lineHeight: 1.5,
                mt: 2,
              }}
            >
              &copy; 2025 HexyDog. All rights reserved.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3} alignItems={"center"}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: "24px", md: "24px" },
                  color: "primary.neutral100",
                }}
              >
                {dict.MAIN_FOOTER.SOCIAL_LINKS}
              </Typography>

              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                {footerSocials.map((link, k) => (
                  <Link
                    key={k}
                    href={link.url}
                    target="_blank"
                    rel="noopener"
                    aria-label={link.url}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 45,
                      height: 45,
                      borderRadius: "50%",
                      border: `1px solid ${alpha(
                        theme.palette.primary.neutral400,
                        0.2
                      )}`,
                      color: alpha(theme.palette.primary.neutral400, 0.75),
                      "&:hover": {
                        color: "primary.neutral400",
                        borderColor: alpha(
                          theme.palette.primary.neutral400,
                          0.5
                        ),
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {link.logo}
                  </Link>
                ))}
              </Stack>

              <Link
                href="mailto:info@hexydog.com"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: alpha(theme.palette.primary.neutral400, 0.75),
                  textDecoration: "none",
                  mt: 1,
                  "&:hover": {
                    color: "primary.neutral400",
                    textDecoration: "underline",
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{ mr: 1, display: "flex", alignItems: "center" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </Box>
                info@hexydog.com
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

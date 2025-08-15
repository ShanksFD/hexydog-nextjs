import { Box, Container, Stack, Typography, alpha } from "@mui/material";
import Image from "next/image";

const tokenomicsData = [
  { title: "PRESALE", value: 15, tokens: 3000000000, color: "#6BE6E8" },
  { title: "STAKING", value: 25, tokens: 5000000000, color: "#00C2FF" },
  { title: "MARKETING", value: 20, tokens: 4000000000, color: "#4E57FF" },
  { title: "LIQUIDITY", value: 15, tokens: 3000000000, color: "#9D61FE" },
  { title: "TEAM", value: 10, tokens: 2000000000, color: "#E155B2" },
  { title: "COMMUNITY", value: 10, tokens: 2000000000, color: "#FE709B" },
  { title: "CHARITY", value: 5, tokens: 1000000000, color: "#FE948F" },
];

export default function Tokenomics({ dict }) {
  return (
    <Box
      sx={{
        bgcolor: "primary.neutral1000",
        py: { xs: 6, sm: 8, md: 18 },
        overflow: "hidden",
      }}
      id="tokenomics"
    >
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 3, sm: 4 }}>
          <Stack component="header" spacing={1} sx={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "uppercase",
                color: "primary.main",
              }}
            >
              {dict.HOME_PAGE.TOKENOMICS.TITLE}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "24px", sm: "32px", md: "40px" },
                fontWeight: "600",
                color: "common.white",
              }}
            >
              {dict.HOME_PAGE.TOKENOMICS.SUBTITLE}
            </Typography>

            <Stack spacing={0.5}>
              <Typography
                variant="body1"
                sx={{
                  mt: { xs: 1, sm: 2 },
                  fontSize: { xs: "16px", md: "18px" },
                  color: "primary.neutral200",
                }}
              >
                {dict.HOME_PAGE.TOKENOMICS.TOTAL_SUPPLY}: 20,000,000,000 HEXY
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row-reverse" }}
            spacing={{ xs: 2, sm: 3, md: 4 }}
            alignItems="center"
          >
            <Box sx={{ width: "100%" }}>
              <Image
                src="/images/token-card.webp"
                alt="Token Card"
                width={600}
                height={400}
                style={{ width: "100%", objectFit: "contain" }}
                title="Token Card"
              />
            </Box>

            <Box sx={{ width: { xs: "100%", md: "70%" } }}>
              <Stack>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "8px 8px 0 0",
                    bgcolor: "primary.neutral900",
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 2fr",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="600"
                    color="white"
                    sx={{ fontSize: "16px" }}
                  >
                    {dict.HOME_PAGE.TOKENOMICS.TABLE.FUND}
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight="600"
                    color="white"
                    sx={{ textAlign: "center", fontSize: "16px" }}
                  >
                    {dict.HOME_PAGE.TOKENOMICS.TABLE.ALLOCATION}
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight="600"
                    color="white"
                    sx={{ textAlign: "right", fontSize: "16px" }}
                  >
                    {dict.HOME_PAGE.TOKENOMICS.TABLE.TOKEN}
                  </Typography>
                </Box>

                {tokenomicsData.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      bgcolor: alpha(item.color, 0.15),
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 2fr",
                      alignItems: "center",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        bgcolor: alpha(item.color, 0.25),
                      },
                      borderRadius:
                        index === tokenomicsData.length - 1 ? "0 0 8px 8px" : 0,
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: item.color,
                        }}
                      />
                      <Typography
                        variant="body2"
                        color="common.white"
                        fontWeight="500"
                      >
                        {dict.HOME_PAGE.TOKENOMICS[item.title]}
                      </Typography>
                    </Stack>

                    <Typography
                      variant="body1"
                      fontWeight="600"
                      color="common.white"
                      sx={{ textAlign: "center" }}
                    >
                      {item.value}%
                    </Typography>

                    <Typography
                      variant="body1"
                      fontWeight="500"
                      color="common.white"
                      sx={{ textAlign: "right" }}
                    >
                      {item.tokens.toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

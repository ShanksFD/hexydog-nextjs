import { alpha, Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { theme } from "@/lib/theme";

const LiveChains = ({ dict }) => {
  const chains = [
    { icon: "/images/eth.webp", name: "Ethereum", live: true },
    { icon: "/images/bsc.webp", name: "Binance", live: true },
    { icon: "/images/polygon.webp", name: "Polygon", live: false },
    { icon: "/images/tron.webp", name: "Tron", live: false },
    { icon: "/images/base.webp", name: "Base", live: false },
    { icon: "/images/solana.webp", name: "Solana", live: true },
  ];

  const parseStyledText = (text, components) => {
    return text.split(/(<\w+>.*?<\/\w+>)/g).map((part, index) => {
      const match = part.match(/<(\w+)>(.*?)<\/\1>/);
      if (match) {
        const [, componentName, content] = match;
        const Component = components[componentName];
        return Component ? (
          <Component key={index}>{content}</Component>
        ) : (
          content
        );
      }
      return part;
    });
  };

  return (
    <Stack
      gap={1}
      sx={{
        position: "relative",
        py: 3,
        borderRadius: "12px",
        backgroundColor: theme.palette.primary.neutral900,
      }}
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
          src="/images/image-live-chains.webp"
          alt="Live Chains Background"
          fill
          style={{ objectFit: "cover", borderRadius: "12px" }}
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
            0.6
          )} 0%, rgba(255,255,255,0) 50%, ${alpha(
            theme.palette.primary.neutral1000,
            0.6
          )} 100%)`,
          zIndex: 1,
          borderRadius: "12px",
        }}
      />

      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontSize: "40px",
          fontWeight: "600",
          zIndex: 2,
          color: "white",
          position: "relative",
        }}
      >
        {dict.HOME_PAGE.LIVE_CHAINS.TITLE}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "400",
          zIndex: 2,
          color: "white",
          position: "relative",
          mb: 2,
        }}
      >
        {parseStyledText(dict.HOME_PAGE.LIVE_CHAINS.DESCRIPTION, {
          hexy: ({ children }) => (
            <Typography
              component="span"
              sx={{ color: "primary.secondary", fontWeight: "600" }}
            >
              {children}
            </Typography>
          ),
        })}
      </Typography>

      <Stack
        direction="row"
        gap={2}
        flexWrap={"wrap"}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          position: "relative",
        }}
      >
        {chains.map((chain, i) => (
          <Stack key={i} gap={1} alignItems="center">
            <Image
              src={chain.icon}
              alt={chain.name}
              width={64}
              height={64}
              title={`${chain.name} Logo`}
            />
            <Stack
              direction={"row"}
              gap={0.5}
              alignItems={"center"}
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                p: "1px 6px",
              }}
            >
              <Box
                sx={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: chain.live
                    ? theme.palette.success.main
                    : theme.palette.error.main,
                }}
              />
              <Typography sx={{ fontSize: "12px", color: "black" }}>
                {dict.HOME_PAGE.HERO.PRESALE.STATUS}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default LiveChains;

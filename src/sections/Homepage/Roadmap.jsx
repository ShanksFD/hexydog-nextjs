import { Box, Stack, Typography } from "@mui/material";
import { theme } from "@/lib/theme";
import RoadmapSlider from "./Components/RoadmapSlider";

export default async function Roadmap({ dict }) {
  const roadmapList = [
    {
      title: dict.HOME_PAGE.ROADMAP.PHASES[0].TITLE,
      subtitle: dict.HOME_PAGE.ROADMAP.PHASES[0].SUBTITLE,
      list: dict.HOME_PAGE.ROADMAP.PHASES[0].LIST || [],
    },
    {
      title: dict.HOME_PAGE.ROADMAP.PHASES[1].TITLE,
      subtitle: dict.HOME_PAGE.ROADMAP.PHASES[1].SUBTITLE,
      list: dict.HOME_PAGE.ROADMAP.PHASES[1].LIST || [],
    },
    {
      title: dict.HOME_PAGE.ROADMAP.PHASES[2].TITLE,
      subtitle: dict.HOME_PAGE.ROADMAP.PHASES[2].SUBTITLE,
      list: dict.HOME_PAGE.ROADMAP.PHASES[2].LIST || [],
    },
    {
      title: dict.HOME_PAGE.ROADMAP.PHASES[3].TITLE,
      subtitle: dict.HOME_PAGE.ROADMAP.PHASES[3].SUBTITLE,
      list: dict.HOME_PAGE.ROADMAP.PHASES[3].LIST || [],
    },
  ];

  return (
    <Box
      id="roadmap"
      sx={{
        position: "relative",
        my: { xs: 4, sm: 5, md: 16 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "25%",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(to bottom, ${theme.palette.primary.neutral1000} 0%, transparent 50%, transparent 100%)`,
            zIndex: 1,
            pointerEvents: "none",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(to top, ${theme.palette.primary.neutral1000} 0%, transparent 50%, transparent 100%)`,
            zIndex: 1,
            pointerEvents: "none",
          },
        }}
      >
        <img
          src="/images/digital-tech-bg.png"
          alt="roadmap"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.7,
          }}
        />
      </Box>

      <Stack gap={2} sx={{ width: "100%", position: "relative", zIndex: 2 }}>
        <Stack
          component="header"
          gap={2}
          alignItems="center"
          sx={{ mb: { xs: 1, sm: 1.5, md: 2 } }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "32px", sm: "40px", md: "48px" },
              fontWeight: "700",
              textAlign: "center",
              color: "primary.neutral100",
            }}
          >
            {dict.HOME_PAGE.ROADMAP.TITLE}
          </Typography>

          <Typography
            variant="h4"
            sx={{
              color: "primary.neutral200",
              fontSize: { xs: "16px", sm: "17px", md: "18px" },
              fontWeight: "300",
              maxWidth: { xs: "95%", sm: "85%", md: "70%" },
              textAlign: "center",
              mx: "auto",
            }}
          >
            {dict.HOME_PAGE.ROADMAP.TEXT}
          </Typography>
        </Stack>

        <Box sx={{ mt: 2 }}>
          <RoadmapSlider roadmapList={roadmapList} />
        </Box>
      </Stack>
    </Box>
  );
}

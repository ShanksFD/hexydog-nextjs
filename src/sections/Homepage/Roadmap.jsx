"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { darken, lighten } from "@mui/material/styles";
import Slider from "react-slick";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { theme } from "@/lib/theme";

export default function Roadmap() {
  const { t } = useTranslation();

  const roadmapList = [
    {
      title: t("HOME_PAGE.ROADMAP.PHASES.0.TITLE"),
      subtitle: t("HOME_PAGE.ROADMAP.PHASES.0.SUBTITLE"),
      list: t("HOME_PAGE.ROADMAP.PHASES.0.LIST", { returnObjects: true }) || [],
    },
    {
      title: t("HOME_PAGE.ROADMAP.PHASES.1.TITLE"),
      subtitle: t("HOME_PAGE.ROADMAP.PHASES.1.SUBTITLE"),
      list: t("HOME_PAGE.ROADMAP.PHASES.1.LIST", { returnObjects: true }) || [],
    },
    {
      title: t("HOME_PAGE.ROADMAP.PHASES.2.TITLE"),
      subtitle: t("HOME_PAGE.ROADMAP.PHASES.2.SUBTITLE"),
      list: t("HOME_PAGE.ROADMAP.PHASES.2.LIST", { returnObjects: true }) || [],
    },
    {
      title: t("HOME_PAGE.ROADMAP.PHASES.3.TITLE"),
      subtitle: t("HOME_PAGE.ROADMAP.PHASES.3.SUBTITLE"),
      list: t("HOME_PAGE.ROADMAP.PHASES.3.LIST", { returnObjects: true }) || [],
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    dotsClass: "slick-dots1 slick-thumb1",
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
            {t("HOME_PAGE.ROADMAP.TITLE")}
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
            {t("HOME_PAGE.ROADMAP.TEXT")}
          </Typography>
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Slider {...settings}>
            {roadmapList.map((phase, index) => (
              <Box key={index}>
                <div>
                  <Stack
                    sx={{
                      border: "1px solid",
                      borderColor: "primary.neutral900",
                      p: "75px 40px 65px",
                      borderRadius: "15px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "stretch",
                      cursor: "grab",
                      backgroundColor: darken(
                        theme.palette.primary.neutral900,
                        0.25
                      ),
                      mx: 1.5,
                      mt: 12,
                      height: "100%",
                      minHeight: "340px",
                    }}
                  >
                    <Stack direction={"column"} gap={2}>
                      <Stack direction={"row"} gap={2} alignItems={"center"}>
                        <Box
                          sx={{
                            width: "32px",
                            height: "32px",
                            minWidth: "32px",
                            minHeight: "32px",
                            flexShrink: 0,
                            borderRadius: "50%",
                            backgroundColor: theme.palette.primary.neutral900,
                            position: "relative",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              height: "16px",
                              width: "16px",
                              left: "50%",
                              top: "50%",
                              transform: "translate(-50%, -50%)",
                              backgroundImage: `linear-gradient(180deg, ${
                                theme.palette.primary.main
                              }, ${darken(
                                theme.palette.primary.neutral800,
                                0.25
                              )})`,
                              borderRadius: "50%",
                            },
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              position: "absolute",
                              bottom: "140px",
                              left: "100%",
                              transform: "translate(-50%, -50%)",
                              whiteSpace: "nowrap",
                              textTransform: "uppercase",
                              color: lighten(
                                theme.palette.primary.neutral900,
                                0.5
                              ),
                              fontWeight: "600",
                            }}
                          >
                            {phase.title}
                          </Typography>
                        </Box>
                        <Typography
                          variant="h3"
                          sx={{
                            color: "text.white",
                            fontSize: { xs: "18px", md: "24px" },
                            fontWeight: "500",
                          }}
                        >
                          {phase.subtitle}
                        </Typography>
                      </Stack>
                      <Stack>
                        {phase.list.map((item, itemIndex) => (
                          <div key={itemIndex}>
                            <Typography
                              variant="body1"
                              sx={{
                                color: "text.secondary",
                                fontSize: { xs: "14px", md: "16px" },
                                fontWeight: "400",
                              }}
                            >
                              {item}
                            </Typography>
                          </div>
                        ))}
                      </Stack>
                    </Stack>
                  </Stack>
                </div>
              </Box>
            ))}
          </Slider>
        </Box>
      </Stack>
    </Box>
  );
}

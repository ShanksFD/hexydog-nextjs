"use client";

import { Box, Stack, Typography } from "@mui/material";
import { darken, lighten } from "@mui/material/styles";
import Slider from "react-slick";
import { theme } from "@/lib/theme";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RoadmapSlider({ roadmapList }) {
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
                backgroundColor: darken(theme.palette.primary.neutral900, 0.25),
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
                        }, ${darken(theme.palette.primary.neutral800, 0.25)})`,
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
                        color: lighten(theme.palette.primary.neutral900, 0.5),
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
  );
}

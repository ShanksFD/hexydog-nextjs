"use client";

import { useEffect, useState, useMemo } from "react";
import { alpha, Stack, Typography } from "@mui/material";
import { theme } from "@/lib/theme";

export default function HeroCountdown({ translations }) {
  const [presaleTime, setPresaleTime] = useState(null);

  useEffect(() => {
    setPresaleTime(new Date("2025-03-05T17:00:00").getTime());
  }, []);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const cycleDuration = 5 * 24 * 60 * 60 * 1000;
    const elapsedTime = (now - presaleTime) % cycleDuration;
    const remainingTime = cycleDuration - elapsedTime;

    return {
      days: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((remainingTime % (1000 * 60)) / 1000),
    };
  };

  const timeLeft = useMemo(calculateTimeLeft, [presaleTime]);
  const [currentTimeLeft, setCurrentTimeLeft] = useState(timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [presaleTime]);

  const timeUnits = [
    { count: currentTimeLeft.days, label: translations.timeLabels.days },
    { count: currentTimeLeft.hours, label: translations.timeLabels.hours },
    { count: currentTimeLeft.minutes, label: translations.timeLabels.minutes },
    { count: currentTimeLeft.seconds, label: translations.timeLabels.seconds },
  ];

  return (
    <Stack gap={1} sx={{ width: { xs: "100%", sm: "60%" }, mt: 1 }}>
      <Typography
        variant="body1"
        sx={{
          color: "white",
          textTransform: "uppercase",
          alignSelf: "center",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        {translations.nextPrice}
      </Typography>
      <Stack
        direction={"row"}
        sx={{
          gap: 2,
          backgroundColor: alpha(theme.palette.primary.neutral1000, 0.5),
          borderRadius: theme.shape.roundedButtonBorderRadius,
          borderTop: "2px solid",
          borderBottom: "2px solid",
          borderColor: theme.palette.primary.main,
          height: "100px",
          backdropFilter: "blur(8px)",
        }}
        alignItems={"center"}
      >
        {timeUnits.map((unit, index) => (
          <Stack
            key={index}
            sx={{
              alignItems: "center",
              padding: "8px",
              flex: 1,
            }}
          >
            <Typography
              variant="body1"
              suppressHydrationWarning
              sx={{
                fontSize: { xs: "20px", md: "28px" },
                fontWeight: "700",
                color: "white",
              }}
            >
              {Math.abs(unit.count).toString().padStart(2, "0")}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: "600",
                color: "white",
              }}
            >
              {unit.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

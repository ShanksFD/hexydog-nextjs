"use client";

import { Box, CircularProgress, circularProgressClasses } from "@mui/material";
import { theme } from "@/lib/theme";

export const WebsiteLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: theme.palette.primary.main,
          animationDuration: "500ms",
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={40}
        thickness={4}
      />
    </Box>
  );
};

export const GlobalLoader = ({ size = 20, thickness = 4, color }) => {
  return (
    <CircularProgress
      variant="indeterminate"
      disableShrink
      sx={{
        color: color || theme.palette.primary.main,
        animationDuration: "500ms",
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: "round",
        },
      }}
      size={size}
      thickness={thickness}
    />
  );
};

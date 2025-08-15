"use client";

import {
  Button,
  styled,
  TextField,
  Link,
  lighten,
  darken,
} from "@mui/material";

const getTransitionStyle = (theme, properties) => {
  const transitionProperties = properties.map((property) => {
    return `${property} ${theme.transitions.duration.standard} ${theme.transitions.easing.easeInOut}`;
  });

  return {
    transition: transitionProperties.join(", "),
  };
};

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.main,
  fontWeight: "400",
  textDecoration: "none",
  fontSize: "15px",
  whiteSpace: "nowrap",
  "&:hover": {
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
  ...getTransitionStyle(theme, ["color"]),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  padding: "16px 30px",
  height: "45px",
  fontSize: "15px",
  fontWeight: "500",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "8px",
  borderColor: theme.palette.primary.main,
  color: "white",
  "&:hover": {
    backgroundColor: lighten(theme.palette.primary.main, 0.1),
    borderColor: lighten(theme.palette.primary.main, 0.1),
    color: "white",
  },
  "&:focus": {
    outline: "none",
  },
  "&:disabled": {
    backgroundColor: darken(theme.palette.primary.main, 0.4),
    color: theme.palette.primary.neutral500,
  },
  "&.MuiButton-outlinedPrimary": {
    border: "2px solid",
    borderColor: theme.palette.primary.main,
  },
  "&.MuiButton-colorError": {
    border: "2px solid",
    borderColor: theme.palette.error.main,
    backgroundColor: theme.palette.error.main,
    color: "white",
    "&:hover": {
      backgroundColor: lighten(theme.palette.error.main, 0.1),
      borderColor: lighten(theme.palette.error.main, 0.1),
      color: "white",
    },
  },
  ...getTransitionStyle(theme, ["background-color", "border-color", "color"]),
}));

export const CustomTextField = styled(TextField)(
  ({ theme, sx, multiline }) => ({
    ...sx,
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.shape.defaultBorderRadius,
      position: "relative",
      backgroundColor: theme.palette.primary.neutral900,
      fontSize: 16,
      width: "100%",
      height: multiline ? "auto" : "48px",
      color: theme.palette.common.white,
      "& fieldset": {
        ...getTransitionStyle(theme, ["border-color"]),
        border: "2px solid",
        borderColor: theme.palette.primary.neutral800,
      },
      "&:hover fieldset": {
        border: "2px solid",
        borderColor: theme.palette.primary.neutral700,
      },
      "&.Mui-focused fieldset": {
        border: "2px solid",
        borderColor: theme.palette.primary.neutral600,
      },
      "&.Mui-disabled fieldset": {
        border: "2px solid",
        borderColor: theme.palette.primary.neutral800,
      },
      "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "white",
      },
    },
    "& .MuiInputBase-input": {
      minHeight: "24px",
      padding: multiline ? "0px" : "10px 12px",
    },
  })
);

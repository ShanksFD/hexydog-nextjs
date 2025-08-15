import { alpha, createTheme, darken } from "@mui/material/styles";

const palette = {
  mode: "dark",
  background: {
    default: "#192327",
    paper: "#2E3B41",
  },
  primary: {
    main: "#51A9FD",
    secondary: "#FDA551",
    dark: "#2D6BA8",
    primary100: "#E3F1FE",
    primary200: "#C6E2FD",
    primary300: "#A3D1FC",
    primary400: "#7EC0FB",
    primary500: "#5AAFFD",
    primary600: "#3F9DFB",
    primary700: "#258BFA",
    primary750: "#1F7DDB",
    primary800: "#196FBC",
    primary900: "#10538B",
    neutral100: "#EEF5F8",
    neutral200: "#D9E6EC",
    neutral300: "#BFCDD3",
    neutral400: "#A3B3BA",
    neutral500: "#86989F",
    neutral600: "#708289",
    neutral700: "#5A6B72",
    neutral800: "#44535A",
    neutral900: "#2E3B41",
    neutral1000: "#192327",
  },
  text: {
    primary: "#E0E0E0",
    secondary: "#B0B0B0",
    disabled: "#8C8C8C",
    white: "#FFFFFF",
    dark: "#121212",
  },
  success: {
    main: "#25B86A",
    dark: "#0e995d",
  },
};

const shape = {
  defaultBorderRadius: "8px",
  secondaryBorderRadius: "6px",
  roundedButtonBorderRadius: "12px",
  checkboxBorderRadius: "2px",
  chipBorderRadius: "4px",
};

export const theme = createTheme({
  palette: {
    ...palette,
  },
  shape,
  typography: {
    fontFamily: `"Outfit", "Arial", sans-serif`,
    button: {
      textTransform: "none",
      fontSize: "16px",
      borderRadius: shape.defaultBorderRadius,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: shape.defaultBorderRadius,
          "&:hover": {
            backgroundColor: palette.primary.primary750,
            borderColor: palette.primary.primary750,
          },
          "&.Mui-disabled": {
            backgroundColor: palette.neutral100,
            color: palette.neutral400,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: shape.chipBorderRadius,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          marginTop: 8,
          borderRadius: shape.defaultBorderRadius,
          boxShadow: `0px 0px 32px ${palette.primary.neutral100},0 0px 10px ${palette.primary.neutral300}`,
          border: "1px solid",
          borderColor: palette.primary.neutral200,
          "& .MuiButtonBase-root.MuiMenuItem-root.Mui-selected": {
            backgroundColor: palette.primary.neutral100,
          },
          "& .Mui-selected:hover": {
            backgroundColor: palette.primary.neutral100,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: "1px solid",
          borderColor: palette.primary.neutral200,
          borderRadius: shape.defaultBorderRadius,
          boxShadow: `0px 0px 32px rgba(0, 0, 0, 0.15),0 0px 10px rgba(0, 0, 0, 0.1)`,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          ">:not(style)~:not(style)": {
            marginLeft: 0,
          },
          padding: "12px",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: palette.primary.neutral900,
          border: `2px solid ${palette.primary.neutral800}`,
          color: palette.text.primary,
          borderRadius: shape.defaultBorderRadius,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: darken(palette.primary.neutral900, 0.1),
          color: palette.text.primary,
          borderRadius: shape.defaultBorderRadius,

          "&.MuiDialog-paper": {
            border: "none",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid",
          borderColor: palette.primary.neutral800,
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "& .MuiTableRow-root:last-child .MuiTableCell-root": {
            borderBottom: "none",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: "4px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
  transitions: {
    duration: {
      standard: "0.3s",
    },
  },
});

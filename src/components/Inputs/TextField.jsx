import { theme } from "@/lib/theme";
import { alpha, InputBase, styled } from "@mui/material";

export const TextField = styled(InputBase)(() => ({
  "& .MuiInputBase-input": {
    borderRadius: 8,
    backgroundColor: theme.palette.primary.neutral900,
    fontSize: 16,
    border: "2px solid",
    borderColor: theme.palette.primary.neutral800,
    width: "100%",
    padding: "8px 10px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

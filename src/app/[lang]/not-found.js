import { Stack, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Stack
      justifyContent="center"
      alignContent="center"
      gap={2}
      style={{
        minHeight: "100vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "32px", fontWeight: "500" }}>
        404 - Page Not Found
      </Typography>
      <Typography>The page you are looking for does not exist.</Typography>
      <Typography
        component="a"
        href="/"
        style={{ color: "primary.main", textDecoration: "none" }}
      >
        Return Home
      </Typography>
    </Stack>
  );
}

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

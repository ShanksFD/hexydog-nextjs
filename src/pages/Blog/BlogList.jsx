import React from "react";
import Link from "next/link";
import { Box, Container, Typography, Stack, Breadcrumbs } from "@mui/material";

import { theme } from "@/lib/theme";
import LoadMoreButton from "./LoadMoreButton";

const BlogList = ({ initialBlogs = [], translations = {} }) => {
  return (
    <Box sx={{ minHeight: "100vh", py: 12 }}>
      <Stack
        direction="column"
        sx={{
          bgcolor: theme.palette.primary.neutral1000,
          color: "white",
          py: 8,
          mb: 2,
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/" style={{ color: "white" }}>
              {translations.home || "Home"}
            </Link>
            <Typography>{translations.blog || "Blog"}</Typography>
          </Breadcrumbs>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "1.5rem", md: "2.5rem" },
              fontWeight: 800,
              mb: 2,
              color: "white",
              maxWidth: 700,
            }}
          >
            {translations.blogTitle || "Latest News and Updates"}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1rem",
              color: "primary.neutral300",
              fontWeight: 400,
              maxWidth: 700,
            }}
          >
            {translations.blogDescription ||
              "Stay updated with the latest news, insights, and developments from the HEXYDOG ecosystem."}
          </Typography>
        </Container>
      </Stack>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        {initialBlogs.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography
              variant="h5"
              sx={{ fontSize: "1rem", color: "primary.neutral500" }}
              gutterBottom
            >
              {translations.noPosts || "No blog posts available"}
            </Typography>
          </Box>
        ) : (
          <LoadMoreButton
            initialBlogs={initialBlogs}
            translations={translations}
          />
        )}
      </Container>
    </Box>
  );
};

export default BlogList;

import React from "react";
import Link from "next/link";
import { Box, Container, Typography, Stack, Breadcrumbs } from "@mui/material";

import { theme } from "@/lib/theme";
import LoadMoreButton from "@/components/Blog/LoadMoreButton";

const BlogList = ({ initialBlogs = [], dict, lang }) => {
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
              {dict.NAVIGATION.HOME}
            </Link>
            <Typography>{dict.NAVIGATION.BLOG}</Typography>
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
            {dict.BLOG.TITLE}
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
            {dict.BLOG.DESCRIPTION}
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
              {dict.BLOG.NO_POSTS || "No blog posts available"}
            </Typography>
          </Box>
        ) : (
          <LoadMoreButton initialBlogs={initialBlogs} dict={dict} lang={lang} />
        )}
      </Container>
    </Box>
  );
};

export default BlogList;

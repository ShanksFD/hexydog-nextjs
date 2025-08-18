import React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Divider,
  Chip,
  Button,
  Alert,
  Stack,
  alpha,
  Breadcrumbs,
  Grid,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  CalendarToday as CalendarTodayIcon,
} from "@mui/icons-material";

import { theme } from "@/lib/theme";
import SocialShareButtons, { SocialShareFooter } from "./SocialShareButtons";

const BlogPost = ({ blog, relatedPosts = [], translations = {} }) => {
  const formatDate = (date) => {
    if (!date) return "";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(dateObj);
  };

  if (!blog) {
    return (
      <Container maxWidth="md" sx={{ py: 8, pt: "120px" }}>
        <Alert
          severity="info"
          action={
            <Button color="inherit" size="small" component={Link} href="/blog">
              {translations.back || "Back"}
            </Button>
          }
          sx={{ mb: 4 }}
        >
          {translations.blogNotFound || "Blog post not found"}
        </Alert>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            component={Link}
            href="/blog"
          >
            {translations.backToBlogs || "Back to Blogs"}
          </Button>
        </Box>
      </Container>
    );
  }

  const canonicalUrl = `https://hexydog.com/blog/${blog.slug || blog.id}`;

  return (
    <Stack
      component="main"
      sx={{ minHeight: "100vh", pt: "120px" }}
      spacing={4}
      alignItems="center"
    >
      {/* Hero Section with Featured Image */}
      <Box
        component={"header"}
        sx={{
          position: "relative",
          height: blog.featuredImage ? "40vh" : "30vh",
          minHeight: blog.featuredImage ? "300px" : "200px",
          width: "100%",
          bgcolor: theme.palette.primary.neutral1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {blog.featuredImage && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.8,
            }}
          >
            <Box
              component="img"
              src={blog.featuredImage}
              alt={blog.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "right",
                filter: "brightness(0.7)",
              }}
              loading="eager"
              width="1200"
              height="630"
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: `linear-gradient(to right, ${
                  theme.palette.primary.neutral1000
                } 0%, ${theme.palette.primary.neutral1000} 70%, ${alpha(
                  theme.palette.primary.neutral1000,
                  0.5
                )} 90%,transparent 100%)`,
              }}
            />
          </Box>
        )}

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link href="/" style={{ color: "white" }}>
              {translations.home || "Home"}
            </Link>
            <Link href="/blog" style={{ color: "white" }}>
              {translations.blog || "Blog"}
            </Link>
            <Typography color="text.primary">
              {blog.title.length > 30
                ? blog.title.substring(0, 30) + "..."
                : blog.title}
            </Typography>
          </Breadcrumbs>

          <Typography
            variant="h1"
            sx={{
              color: "white",
              fontSize: { xs: "2rem", md: "3.2rem" },
              fontWeight: 800,
              mb: 2,
              textShadow: `0 2px 4px ${alpha(
                theme.palette.primary.neutral900,
                0.5
              )}`,
              maxWidth: "900px",
            }}
          >
            {blog.title}
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg">
        <Stack>
          <Box
            component="article"
            elevation={3}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: "12px",
              position: "relative",
              zIndex: 10,
              bgcolor: "transparent",
              boxShadow: "none",
            }}
          >
            {/* Post Metadata */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              sx={{ mb: 3 }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarTodayIcon
                    sx={{
                      mr: 1,
                      fontSize: "0.875rem",
                      color: "text.secondary",
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    <time dateTime={new Date(blog.createdAt).toISOString()}>
                      {formatDate(blog.createdAt)}
                    </time>
                  </Typography>
                </Box>
              </Stack>

              <SocialShareButtons
                canonicalUrl={canonicalUrl}
                title={blog.title}
                translations={{
                  share: translations.share || "Share",
                }}
              />
            </Stack>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {blog.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </Box>
            )}

            {/* Excerpt/Summary */}
            {blog.excerpt && (
              <Box
                sx={{
                  mb: 4,
                  p: 2,
                  bgcolor: "rgba(81, 169, 253, 0.05)",
                  borderLeft: "4px solid",
                  borderColor: "primary.main",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="p"
                  sx={{
                    fontStyle: "italic",
                    color: "text.secondary",
                    fontSize: "1.1rem",
                    lineHeight: 1.6,
                  }}
                >
                  {blog.excerpt}
                </Typography>
              </Box>
            )}

            <Divider sx={{ mb: 4 }} />

            {/* Blog Content */}
            <Box
              className="blog-content"
              sx={{
                "& img": {
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  margin: "24px auto",
                  borderRadius: 1,
                },
                "& h1, & h2, & h3, & h4, & h5, & h6": {
                  mt: 4,
                  mb: 2,
                  fontWeight: 600,
                  color: "text.primary",
                },
                "& p": {
                  mb: 2,
                  lineHeight: 1.8,
                  fontSize: "1.05rem",
                },
                "& a": {
                  color: "primary.main",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                },
                "& blockquote": {
                  borderLeft: "4px solid",
                  borderColor: "primary.main",
                  pl: 2,
                  ml: 0,
                  fontStyle: "italic",
                  color: "text.secondary",
                },
                "& ul, & ol": {
                  pl: 3,
                  mb: 2,
                },
                "& li": {
                  mb: 1,
                },
                "& table": {
                  width: "100%",
                  borderCollapse: "collapse",
                  mb: 3,
                },
                "& th, & td": {
                  border: "1px solid",
                  borderColor: "divider",
                  p: 1.5,
                },
                "& th": {
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <Divider sx={{ my: 4 }} />

            {/* Social Share (Footer) */}
            <SocialShareFooter
              canonicalUrl={canonicalUrl}
              title={blog.title}
              translations={{
                shareThisArticle:
                  translations.shareThisArticle || "Share this article",
                shareOnFacebook:
                  translations.shareOnFacebook || "Share on Facebook",
                shareOnTwitter:
                  translations.shareOnTwitter || "Share on Twitter",
              }}
            />
          </Box>

          <Box>
            {relatedPosts.length > 0 && (
              <Box
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: "12px",
                }}
              >
                <Typography variant="h2" sx={{ mb: 3, fontWeight: 600 }}>
                  {translations.relatedPosts || "Related Posts"}
                </Typography>

                <Grid container spacing={2}>
                  {relatedPosts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          boxShadow: "none",
                          border: "1px solid",
                          borderColor: "divider",
                          transition:
                            "transform 0.2s ease, box-shadow 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: 3,
                          },
                        }}
                      >
                        <CardActionArea
                          component={Link}
                          href={`/blog/${post.slug || post.id}`}
                        >
                          {post.featuredImage && (
                            <CardMedia
                              component="img"
                              height="160"
                              image={post.featuredImage}
                              alt={post.title}
                              sx={{ objectFit: "cover" }}
                            />
                          )}
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              variant="subtitle1"
                              component="h3"
                              sx={{
                                fontWeight: 600,
                                mb: 1,
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                lineHeight: 1.3,
                              }}
                            >
                              {post.title}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {formatDate(post.createdAt)}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
};

export default BlogPost;

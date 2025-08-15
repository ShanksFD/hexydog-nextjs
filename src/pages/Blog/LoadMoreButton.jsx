"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CardActionArea,
  Stack,
  Typography,
} from "@mui/material";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  where,
  limit,
  startAfter,
} from "firebase/firestore";

import { app } from "../../firebase";
import { StyledButton } from "../../components/Utils/UIUtils";
import { theme } from "@/lib/theme";

const db = getFirestore(app);

const LoadMoreButton = ({ initialBlogs, translations }) => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialBlogs.length >= 6);
  const [lastVisible, setLastVisible] = useState(null);
  const pageSize = 6;

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

  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const fetchMoreBlogs = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const lastBlog = blogs[blogs.length - 1];

      const lastCreatedAt =
        lastBlog.createdAt instanceof Date
          ? lastBlog.createdAt
          : new Date(lastBlog.createdAt);

      const blogQuery = query(
        collection(db, "blogs"),
        where("published", "==", true),
        orderBy("createdAt", "desc"),
        startAfter(lastCreatedAt),
        limit(pageSize)
      );

      const blogSnapshot = await getDocs(blogQuery);

      if (blogSnapshot.empty) {
        setHasMore(false);
      } else {
        const newBlogs = blogSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        }));

        setBlogs((prev) => [...prev, ...newBlogs]);
        setHasMore(blogSnapshot.docs.length === pageSize);

        const lastDoc = blogSnapshot.docs[blogSnapshot.docs.length - 1];
        setLastVisible(lastDoc);
      }
    } catch (error) {
      console.error("Error fetching more blogs:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const renderBlogCards = () => {
    return (
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={blog.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardActionArea
                component={Link}
                href={`/blog/${blog.slug || blog.id}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    width: "100%",
                    height: 200,
                    backgroundSize: "cover",
                    backgroundColor: blog.featuredImage
                      ? "transparent"
                      : theme.palette.primary.neutral900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  image={blog.featuredImage || ""}
                >
                  {!blog.featuredImage && (
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ color: "white" }}
                    >
                      HEXYDOG
                    </Typography>
                  )}
                </CardMedia>

                <Stack
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ mb: 1.5 }}>
                      {blog.tags && blog.tags.length > 0 && (
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                            mb: 1.5,
                          }}
                        >
                          {blog.tags.slice(0, 3).map((tag) => (
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
                    </Box>

                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.25rem",
                        mb: 1.5,
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        lineHeight: 1.3,
                        height: "2.6em",
                      }}
                    >
                      {blog.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                        lineHeight: 1.6,
                        height: "4.8em",
                      }}
                    >
                      {truncateText(blog.excerpt || "")}
                    </Typography>
                  </CardContent>

                  <CardContent sx={{ pt: 0, mt: "auto" }}>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(blog.createdAt)}
                    </Typography>
                  </CardContent>
                </Stack>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
      {renderBlogCards()}

      {hasMore && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={fetchMoreBlogs}
            disabled={loading}
          >
            {loading && (
              <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
            )}
            {translations.loadMore || "Load More"}
          </StyledButton>
        </Box>
      )}
    </>
  );
};

export default LoadMoreButton;

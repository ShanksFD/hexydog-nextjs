"use client";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { app } from "../../firebase";
import { theme } from "../../theme";

const db = getFirestore(app);

const FeaturedBlogs = ({ maxItems = 3 }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      setLoading(true);
      try {
        // You can customize this query based on your needs
        // For example, you might have a "featured" field in your blog posts
        // or just display the most recent ones
        const blogsRef = collection(db, "blogs");
        const q = query(
          blogsRef,
          where("published", "==", true),
          orderBy("createdAt", "desc"),
          limit(maxItems)
        );

        const querySnapshot = await getDocs(q);
        const featuredBlogs = [];

        querySnapshot.forEach((doc) => {
          featuredBlogs.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.() || new Date(),
          });
        });

        setBlogs(featuredBlogs);
      } catch (error) {
        console.error("Error fetching featured blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBlogs();
  }, [maxItems]);

  const formatDate = (date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Function to truncate text
  const truncateText = (text, maxLength = 120) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <Box
      sx={{
        py: 8,
        bgcolor: theme.palette.primary.neutral100,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Latest from HEXYDOG Blog
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              maxWidth: 700,
              mx: "auto",
              fontSize: "1.1rem",
            }}
          >
            Stay up to date with the latest news, updates and insights from the
            HEXYDOG team
          </Typography>
          <Divider
            sx={{
              width: 80,
              mx: "auto",
              my: 3,
              borderWidth: 2,
              borderColor: theme.palette.primary.main,
            }}
          />
        </Box>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <CircularProgress size={50} />
          </Box>
        ) : blogs.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1">
              No blog posts available yet.
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={4}>
              {blogs.map((blog) => (
                <Grid item xs={12} md={4} key={blog.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      boxShadow: 3,
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardActionArea
                      component={Link}
                      to={`/blog/${blog.slug || blog.id}`}
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={blog.featuredImage || "/default-blog-image.jpg"}
                        alt={blog.title}
                        sx={{
                          bgcolor: blog.featuredImage
                            ? "transparent"
                            : theme.palette.primary.neutral900,
                        }}
                      />
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {formatDate(blog.createdAt)}
                        </Typography>
                        <Typography
                          variant="h5"
                          component="h3"
                          sx={{
                            fontWeight: 600,
                            mb: 2,
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
                            mb: "auto",
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3,
                            lineHeight: 1.6,
                          }}
                        >
                          {truncateText(blog.excerpt || "")}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            mt: 2,
                          }}
                        >
                          <Typography
                            color="primary"
                            variant="button"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "0.9rem",
                              fontWeight: 600,
                            }}
                          >
                            Read More{" "}
                            <ArrowForwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: "center", mt: 6 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                component={Link}
                to="/blog"
                sx={{ px: 4, py: 1.5 }}
              >
                View All Blog Posts
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default FeaturedBlogs;

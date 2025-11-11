"use client";

import { useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchBlogPost,
  selectCurrentBlog,
  selectBlogLoading,
  selectBlogError,
} from "../../../redux/slices/blogSlice";
import { StyledButton } from "@/components/Ui";

const BlogPreview = ({ dict, lang }) => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const dispatch = useAppDispatch();

  const blog = useAppSelector(selectCurrentBlog);
  const loading = useAppSelector(selectBlogLoading);
  const error = useAppSelector(selectBlogError);

  useEffect(() => {
    dispatch(fetchBlogPost(id));
  }, [dispatch, id]);

  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return "N/A";
    try {
      return format(timestamp.toDate(), "PPP");
    } catch (error) {
      return "Invalid date";
    }
  };

  const handleEdit = () => {
    router.push(`/blog-admin/blog/edit/${id}`);
  };

  const handleBack = () => {
    router.push("/blog-admin");
  };

  if (loading && !blog) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Box sx={{ mt: 2 }}>
          <StyledButton variant="contained" onClick={handleBack}>
            {dict.COMMON.BACK_TO_BLOGS}
          </StyledButton>
        </Box>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="info">{dict.DASHBOARD.BLOG.NOT_FOUND}</Alert>
        <Box sx={{ mt: 2 }}>
          <StyledButton variant="contained" onClick={handleBack}>
            {dict.COMMON.BACK_TO_BLOGS}
          </StyledButton>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <StyledButton variant="outlined" onClick={handleBack}>
          {dict.COMMON.BACK_TO_BLOGS}
        </StyledButton>
        <StyledButton variant="contained" color="primary" onClick={handleEdit}>
          {dict.COMMON.EDIT}
        </StyledButton>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        {blog.featuredImage && (
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <img
              src={blog.featuredImage}
              alt={blog.title}
              style={{
                maxWidth: "100%",
                height: "auto",
                maxHeight: "400px",
                borderRadius: "4px",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/800x400?text=Image+Error";
              }}
            />
          </Box>
        )}

        <Typography variant="overline" color="text.secondary">
          {blog.published
            ? dict.DASHBOARD.BLOG.PUBLISHED
            : dict.DASHBOARD.BLOG.DRAFT}{" "}
          • {formatDate(blog.createdAt)}
        </Typography>

        <Typography variant="h3" component="h1" gutterBottom>
          {blog.title}
        </Typography>

        {blog.tags && blog.tags.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3, mt: 2 }}>
            {blog.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        )}

        {blog.excerpt && (
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ fontStyle: "italic", color: "text.secondary" }}
            >
              {blog.excerpt}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        <Box
          className="blog-content"
          sx={{
            "& img": { maxWidth: "100%", height: "auto" },
            "& a": { color: "primary.main" },
          }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <Divider sx={{ my: 3 }} />

        {blog.seo && (
          <Box
            sx={{ mt: 3, p: 2, bgcolor: "background.default", borderRadius: 1 }}
          >
            <Typography variant="h6" gutterBottom>
              {dict.DASHBOARD.BLOG.SEO_PREVIEW}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "primary.main" }}>
              {blog.seo.title || blog.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "success.main" }}>
              {window.location.origin}/blog/{blog.slug}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {blog.seo.description || blog.excerpt}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default BlogPreview;

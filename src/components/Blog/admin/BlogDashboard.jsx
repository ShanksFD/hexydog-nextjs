"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
  CircularProgress,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  FileCopy,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchBlogPosts,
  deleteBlogPost,
  togglePublishStatus,
  selectAllBlogs,
  selectBlogLoading,
  cloneBlogPost,
} from "../../../redux/slices/blogSlice";
import { StyledButton } from "@/components/Ui";
import withClientOnly from "@/components/withClientOnly";

const BlogDashboard = ({ dict, lang }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const blogs = useAppSelector(selectAllBlogs);
  const loading = useAppSelector(selectBlogLoading);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  const handleCreateNew = () => {
    router.push("/blog-admin/blog/create");
  };

  const handleEdit = (id) => {
    router.push(`/blog-admin/blog/edit/${id}`);
  };

  const handleView = (id) => {
    window.open(`/blog-admin/blog/preview/${id}`, "_blank");
  };

  const handlePublishToggle = (id, published) => {
    dispatch(togglePublishStatus({ id, published: !published }));
  };

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (blogToDelete) {
      dispatch(deleteBlogPost(blogToDelete.id));
    }
    setDeleteDialogOpen(false);
    setBlogToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setBlogToDelete(null);
  };

  const handleCloneClick = (blog) => {
    const blogToClone = { ...blog };

    dispatch(cloneBlogPost(blogToClone))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.error("Error cloning blog:", error);
      });
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";

    try {
      let date;

      if (timestamp.toDate) {
        date = timestamp.toDate();
      } else if (typeof timestamp === "number") {
        date = new Date(timestamp);
      } else {
        return "Invalid date";
      }

      return format(date, "PPP HH:mm");
    } catch (error) {
      return "Invalid date";
    }
  };

  if (loading && blogs.length === 0) {
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

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontSize: "1.5rem" }}>
          {dict.DASHBOARD.BLOG.TITLE}
        </Typography>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleCreateNew}
        >
          {dict.DASHBOARD.BLOG.CREATE_NEW}
        </StyledButton>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{dict.DASHBOARD.BLOG.TABLE.TITLE}</TableCell>
              <TableCell>{dict.DASHBOARD.BLOG.TABLE.STATUS}</TableCell>
              <TableCell>{dict.DASHBOARD.BLOG.TABLE.CREATED_AT}</TableCell>
              <TableCell>{dict.DASHBOARD.BLOG.TABLE.UPDATED_AT}</TableCell>
              <TableCell>{dict.DASHBOARD.BLOG.TABLE.TAGS}</TableCell>
              <TableCell align="center">
                {dict.DASHBOARD.BLOG.TABLE.ACTIONS}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!blogs || blogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  {dict.DASHBOARD.BLOG.NO_POSTS}
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell sx={{ maxWidth: "250px" }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {truncateText(blog.title, 50)}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {truncateText(blog.excerpt || "", 70)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={!!blog.published}
                      onChange={() =>
                        handlePublishToggle(blog.id, blog.published)
                      }
                      color="primary"
                    />
                    <Typography variant="caption" sx={{ ml: 1 }}>
                      {blog.published
                        ? dict.DASHBOARD.BLOG.PUBLISHED
                        : dict.DASHBOARD.BLOG.DRAFT}
                    </Typography>
                  </TableCell>
                  <TableCell>{formatDate(blog.createdAt)}</TableCell>
                  <TableCell>{formatDate(blog.updatedAt)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {blog.tags &&
                        blog.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      {(!blog.tags || blog.tags.length === 0) && (
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          {dict.DASHBOARD.BLOG.NO_TAGS}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={dict.DASHBOARD.BLOG.EDIT}>
                      <IconButton
                        color="primary"
                        sx={{
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                        onClick={() => handleEdit(blog.id)}
                      >
                        <EditIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={dict.DASHBOARD.BLOG.VIEW}>
                      <IconButton
                        color="primary"
                        sx={{
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                        onClick={() => handleView(blog.id)}
                      >
                        <VisibilityIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={dict.DASHBOARD.BLOG.CLONE}>
                      <IconButton
                        color="primary"
                        sx={{
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                        onClick={() => handleCloneClick(blog)}
                      >
                        <FileCopy sx={{ fontSize: "20px" }} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={dict.DASHBOARD.BLOG.DELETE}>
                      <IconButton
                        color="error"
                        sx={{
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                        onClick={() => handleDeleteClick(blog)}
                      >
                        <DeleteIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>{dict.DASHBOARD.BLOG.DELETE_CONFIRM_TITLE}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dict.DASHBOARD.BLOG.DELETE_CONFIRM_MESSAGE.replace(
              "{{title}}",
              blogToDelete?.title || ""
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton
            variant="outlined"
            onClick={handleDeleteCancel}
            sx={{ mr: 1, height: "40px" }}
          >
            {dict.COMMON.CANCEL}
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={handleDeleteConfirm}
            color="error"
            autoFocus
            sx={{ height: "40px" }}
          >
            {dict.COMMON.DELETE}
          </StyledButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default withClientOnly(BlogDashboard);

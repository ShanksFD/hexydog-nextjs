"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  FormControlLabel,
  Switch,
  CircularProgress,
  Alert,
  Divider,
  Snackbar,
  IconButton,
  Stack,
  Button,
  LinearProgress,
} from "@mui/material";
import { KeyboardArrowLeft, Upload as UploadIcon } from "@mui/icons-material";

import { Editor } from "@tinymce/tinymce-react";

import { uploadImage, useImageUpload } from "../../../services/firebaseStorage";
import { useDispatch } from "react-redux";
import {
  createBlogPost,
  fetchBlogPost,
  updateBlogPost,
} from "@/redux/slices/blogSlice";
import { CustomTextField, StyledButton } from "@/components/Ui";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

const BlogEditor = ({ lang }) => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const isEditMode = !!id;

  const {
    handleFileUpload: handleFeaturedImageUpload,
    isUploading: featuredImageUploading,
    uploadProgress: featuredImageProgress,
    uploadError: featuredImageError,
  } = useImageUpload();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState([]);
  const [published, setPublished] = useState(false);
  const [featuredImage, setFeaturedImage] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [slug, setSlug] = useState("");
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isClient, setIsClient] = useState(false);

  const [uploadedImages, setUploadedImages] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const dispatch = useDispatch();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    return () => {
      if (!isEditMode && uploadedImages.length > 0) {
      }
    };
  }, [uploadedImages, isEditMode]);

  const handleTinyMCEImageUpload = (blobInfo, progress) => {
    return new Promise((resolve, reject) => {
      const file = blobInfo.blob();

      if (!validateFile(file)) {
        reject("Invalid file type or size");
        return;
      }

      uploadImage(file, "blog-content", progress)
        .then((url) => {
          setUploadedImages((prev) => [...prev, url]);
          resolve(url);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          reject("Upload failed");
        });
    });
  };

  const editorConfig = {
    height: 400,
    menubar: false,
    skin: "bootstrap",
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "help",
      "wordcount",
    ],
    toolbar:
      "undo redo | blocks | " +
      "bold italic forecolor | alignleft aligncenter " +
      "alignright alignjustify | bullist numlist outdent indent | " +
      "removeformat | image link | help",
    content_style:
      "body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px }",
    images_upload_handler: handleTinyMCEImageUpload,
    automatic_uploads: true,
    file_picker_types: "image",
    file_picker_callback: (callback, value, meta) => {
      if (meta.filetype === "image") {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.addEventListener("change", (e) => {
          const file = e.target.files[0];
          if (file && validateFile(file)) {
            uploadImage(file, "blog-content")
              .then((url) => {
                setUploadedImages((prev) => [...prev, url]);
                callback(url, { alt: file.name });
                showSnackbar("Image uploaded successfully!", "success");
              })
              .catch((error) => {
                console.error("Upload failed:", error);
                showSnackbar("Failed to upload image", "error");
              });
          }
        });
        input.click();
      }
    },
  };

  useEffect(() => {
    if (!isEditMode || !slug) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
      );
    }
  }, [title, isEditMode, slug]);

  useEffect(() => {
    if (isEditMode) {
      const loadBlogData = async () => {
        try {
          setLoading(true);
          const data = await dispatch(fetchBlogPost(id));

          const payload = data?.payload;
          if (payload) {
            setTitle(payload.title || "");
            setContent(payload.content || "");
            setExcerpt(payload.excerpt || "");
            setTags(payload.tags || []);
            setSlug(payload.slug || "");
            setFeaturedImage(payload.featuredImage || "");
            setSeoTitle(payload.seo?.title || "");
            setSeoDescription(payload.seo?.description || "");
            setSeoKeywords(payload.seo?.keywords || []);
            setPublished(payload.published || false);
          }
        } catch (error) {
          console.error("Failed to load blog post:", error);
          setError("Failed to load blog post");
        } finally {
          setLoading(false);
        }
      };

      loadBlogData();
    }
  }, [id, isEditMode, dispatch]);

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleFeaturedImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!validateFile(file)) {
      showSnackbar("Invalid file type or size", "error");
      return;
    }

    try {
      const imageUrl = await handleFeaturedImageUpload(
        file,
        "blog-featured-images"
      );
      if (imageUrl) {
        setFeaturedImage(imageUrl);
        setUploadedImages((prev) => [...prev, imageUrl]);
        showSnackbar("Featured image uploaded!", "success");
      }
    } catch (error) {
      console.error("Error uploading featured image:", error);
      showSnackbar("Failed to upload featured image", "error");
    }
  };

  const validateFile = (file) => {
    if (!file) return false;
    if (file.size > MAX_FILE_SIZE) return false;
    if (!ALLOWED_FILE_TYPES.includes(file.type)) return false;
    return true;
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSave = async (publishStatus = null) => {
    const finalPublishStatus =
      publishStatus !== null ? publishStatus : published;

    const blogData = {
      title,
      content,
      excerpt,
      tags,
      published: finalPublishStatus,
      featuredImage,
      slug,
      seo: {
        title: seoTitle,
        description: seoDescription,
        keywords: seoKeywords,
      },
    };

    try {
      setLoading(true);

      if (isEditMode) {
        await dispatch(updateBlogPost({ id, blogData })).unwrap();
        showSnackbar("Blog updated successfully!");
      } else {
        await dispatch(createBlogPost(blogData)).unwrap();
        showSnackbar("Blog created successfully!");
      }

      showSnackbar(isEditMode ? "Blog updated!" : "Blog created!", "success");

      if (!isEditMode) {
        setTimeout(() => {
          router.push("/blog-admin");
        }, 1500);
      }
    } catch (err) {
      showSnackbar(err.message || "An error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/blog-admin");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const isFormValid = title && content && slug;

  if (loading && isEditMode) {
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
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton onClick={handleCancel}>
            <KeyboardArrowLeft />
          </IconButton>
          <Typography variant="h1" sx={{ fontSize: "1.5rem" }}>
            {isEditMode ? "Edit Blog" : "Create Blog"}
          </Typography>
        </Stack>
        <Box>
          {isEditMode && (
            <StyledButton
              variant="contained"
              color={published ? "error" : "success"}
              onClick={() => handleSave(!published)}
              sx={{ mr: 1 }}
              disabled={!isFormValid || loading}
            >
              {published ? "Unpublish" : "Publish"}
            </StyledButton>
          )}
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => handleSave()}
            disabled={!isFormValid || loading}
          >
            Save
          </StyledButton>
        </Box>
      </Stack>

      {/* Error alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Main content */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            {/* Title */}
            <CustomTextField
              placeholder="Blog Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              sx={{ mb: 3 }}
            />

            {/* Slug */}
            <CustomTextField
              placeholder="URL Slug"
              fullWidth
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              sx={{ mb: 3 }}
              helperText="This will be used in the URL"
            />

            {/* Content editor */}
            <Typography variant="h2" gutterBottom sx={{ fontSize: "1.2rem" }}>
              Content
            </Typography>

            <Box sx={{ mb: 3 }}>
              {isClient ? (
                <Editor
                  apiKey="bxtkzu0y20gs2z9ieuyh1q9qeewidyuvpdpgsjknbcjkek83"
                  value={content}
                  onEditorChange={(newContent) => setContent(newContent)}
                  init={editorConfig}
                />
              ) : (
                <Box
                  sx={{
                    height: 400,
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#f5f5f5",
                  }}
                >
                  <CircularProgress size={24} />
                  <Typography sx={{ ml: 1 }}>Loading editor...</Typography>
                </Box>
              )}
            </Box>

            {/* Excerpt */}
            <CustomTextField
              placeholder="Excerpt (optional)"
              fullWidth
              multiline
              rows={4}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              helperText="Brief description of the blog post"
              sx={{ mb: 3 }}
            />
          </Paper>

          {/* SEO section */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h2" gutterBottom sx={{ fontSize: "1.2rem" }}>
              SEO Settings
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <CustomTextField
              placeholder="SEO Title"
              fullWidth
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              sx={{ mb: 3 }}
              helperText={`${seoTitle.length}/60 characters`}
            />

            <CustomTextField
              placeholder="SEO Description"
              fullWidth
              multiline
              rows={3}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              sx={{ mb: 3 }}
              helperText={`${seoDescription.length}/160 characters`}
            />

            <CustomTextField
              placeholder="SEO Keywords"
              fullWidth
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              helperText="Comma-separated keywords"
            />
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 3 }}>
          {/* Publish settings */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h2" gutterBottom sx={{ fontSize: "1.2rem" }}>
              Publish Settings
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <FormControlLabel
              control={
                <Switch
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  color="primary"
                />
              }
              label={published ? "Published" : "Draft"}
              sx={{ mb: 2, display: "block" }}
            />

            <StyledButton
              variant="contained"
              color={published ? "error" : "success"}
              fullWidth
              onClick={() => handleSave(!published)}
              disabled={!isFormValid || loading}
              sx={{ mb: 2 }}
            >
              {published ? "Unpublish" : "Publish"}
            </StyledButton>

            <StyledButton
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleSave()}
              disabled={!isFormValid || loading}
            >
              Save Draft
            </StyledButton>
          </Paper>

          {/* Featured image */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h2" gutterBottom sx={{ fontSize: "1.2rem" }}>
              Featured Image
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <input
              accept="image/*"
              style={{ display: "none" }}
              id="featured-image-upload"
              type="file"
              onChange={handleFeaturedImageChange}
            />
            <label htmlFor="featured-image-upload">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                startIcon={<UploadIcon />}
                sx={{ mb: 2 }}
                disabled={featuredImageUploading}
              >
                Upload Image
              </Button>
            </label>

            {featuredImageUploading && (
              <Box sx={{ mb: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={featuredImageProgress}
                />
                <Typography variant="caption">
                  {Math.round(featuredImageProgress)}%
                </Typography>
              </Box>
            )}

            <CustomTextField
              placeholder="Image URL"
              fullWidth
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              sx={{ mb: 2 }}
              disabled={featuredImageUploading}
            />

            {featuredImageError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {featuredImageError}
              </Alert>
            )}

            {featuredImage && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <img
                  src={featuredImage}
                  alt={title}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: "200px",
                    borderRadius: "4px",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Image+Error";
                  }}
                />
              </Box>
            )}
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h2" gutterBottom sx={{ fontSize: "1.2rem" }}>
              Uploaded Images ({uploadedImages.length})
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {uploadedImages.length > 0 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 1,
                }}
              >
                {uploadedImages.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt=""
                    style={{
                      width: "100%",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                ))}
              </Box>
            )}
          </Paper>

          {/* Tags */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h2" gutterBottom sx={{ fontSize: "1.2rem" }}>
              Tags
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", mb: 2 }}>
              <CustomTextField
                placeholder="Add tag"
                fullWidth
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <StyledButton
                variant="contained"
                onClick={handleAddTag}
                sx={{ ml: 1 }}
                disabled={!newTag}
              >
                Add
              </StyledButton>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  color="primary"
                />
              ))}
              {tags.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  No tags added
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BlogEditor;

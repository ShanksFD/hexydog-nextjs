"use client";

import React from "react";
import { IconButton, Button, Stack, Typography, Box } from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Share as ShareIcon,
} from "@mui/icons-material";

const SocialShareButtons = ({ canonicalUrl, title, translations = {} }) => {
  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${canonicalUrl}`,
      "_blank"
    );
  };

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${canonicalUrl}&text=${encodeURIComponent(
        title
      )}`,
      "_blank"
    );
  };

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${canonicalUrl}`,
      "_blank"
    );
  };

  return (
    <>
      {/* Inline Share Buttons */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
          <ShareIcon
            fontSize="small"
            sx={{
              verticalAlign: "middle",
              mr: 0.5,
              fontSize: "1rem",
            }}
          />
          {translations.share || "Share"}: &nbsp;
        </Typography>

        <Stack direction="row">
          <IconButton
            size="small"
            color="primary"
            onClick={handleFacebookShare}
          >
            <FacebookIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="primary" onClick={handleTwitterShare}>
            <TwitterIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="primary"
            onClick={handleLinkedInShare}
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
};

export const SocialShareFooter = ({
  canonicalUrl,
  title,
  translations = {},
}) => {
  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${canonicalUrl}`,
      "_blank"
    );
  };

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${canonicalUrl}&text=${encodeURIComponent(
        title
      )}`,
      "_blank"
    );
  };

  return (
    <Box sx={{ textAlign: "center", my: 4 }}>
      <Typography variant="p" gutterBottom>
        {translations.shareThisArticle || "Share this article"}
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        sx={{ mt: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<FacebookIcon />}
          onClick={handleFacebookShare}
        >
          {translations.shareOnFacebook || "Share on Facebook"}
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<TwitterIcon />}
          onClick={handleTwitterShare}
        >
          {translations.shareOnTwitter || "Share on Twitter"}
        </Button>
      </Stack>
    </Box>
  );
};

export default SocialShareButtons;

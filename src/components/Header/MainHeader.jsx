"use client";

import React, { useEffect, useState } from "react";
import {
  Icon,
  AppBar,
  Toolbar,
  Stack,
  Box,
  Link,
  useTheme,
  Container,
  useMediaQuery,
  Button,
  Popover,
  List,
  ListItem,
  IconButton,
  Typography,
  useScrollTrigger,
  alpha,
  Divider,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { IoMenu } from "react-icons/io5";
import { BiChevronDown } from "react-icons/bi";

import {
  StyledButton,
  StyledLink,
  getTransitionStyle,
  headerSocials,
} from "../Utils/UIUtils";
import { supportedLanguages } from "../../constants/langConstants";
import { detectWalletType, logWalletError } from "../../utils/errorLogger";
import { GB } from "country-flag-icons/react/3x2";

export default function MainHeader() {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const linkTransition = getTransitionStyle(theme, ["color"]);

  const [language, setLanguage] = useState(currentLanguage || "en-US");
  const [menuPopoverEnchorEl, setMenuPopoverEnchorEl] = useState(null);
  const [langPopoverEnchorEl, setLangPopoverEnchorEl] = useState(null);

  const handleLangPopoverOpen = (event) => {
    setLangPopoverEnchorEl(event.currentTarget);
  };

  const handleLangPopoverClose = () => {
    setLangPopoverEnchorEl(null);
  };

  const langPopoverOpen = Boolean(langPopoverEnchorEl);
  const langPopoverId = langPopoverOpen ? "language-popover" : undefined;

  const handleMenuPopoverOpen = (event) => {
    setMenuPopoverEnchorEl(event.currentTarget);
  };

  const handleMenuPopoverClose = () => {
    setMenuPopoverEnchorEl(null);
  };

  const handleConnectWallet = async () => {
    try {
      await open();
    } catch (error) {
      logWalletError({
        message: "Failed to connect wallet",
        walletType: detectWalletType(),
        error: error,
        metadata: {
          networkId: selectedNetwork,
          paymentMethod,
        },
      });
      setError(`Connection error: ${error.message || "Unknown error"}`);
    }
  };

  const menuPopoverOpen = !isMobileOrTablet
    ? false
    : Boolean(menuPopoverEnchorEl);

  const menuPopoverId = menuPopoverOpen ? "menu-popover" : undefined;

  const textTransitionStyle = getTransitionStyle(theme, ["color"]);
  const backgroundTransitionStyle = getTransitionStyle(theme, [
    "background-color",
  ]);

  const transformTransitionStyle = getTransitionStyle(theme, ["transform"]);

  useEffect(() => {
    if (!isMobileOrTablet && menuPopoverEnchorEl) {
      setMenuPopoverEnchorEl(null);
    }
  }, [isMobileOrTablet, menuPopoverEnchorEl]);

  const links = [
    { href: "#about", label: t("MAIN_HEADER.MENU.ABOUT"), isScroll: true },
    {
      href: "#how-to-buy",
      label: t("MAIN_HEADER.MENU.HOW_TO_BUY"),
      isScroll: true,
    },
    {
      href: "#tokenomics",
      label: t("MAIN_HEADER.MENU.TOKENOMICS"),
      isScroll: true,
    },
    {
      href: "/blog",
      label: t("MAIN_HEADER.MENU.BLOG"),
      isScroll: false,
    },
    {
      href: "/documents/HEXYWhitepaper.pdf",
      label: t("MAIN_HEADER.MENU.WHITEPAPER"),
      isScroll: false,
    },
    { href: "#roadmap", label: t("MAIN_HEADER.MENU.ROADMAP"), isScroll: true },
    { href: "#faq", label: t("MAIN_HEADER.MENU.FAQ"), isScroll: true },
  ];

  const handleLinkClick = (e, link) => {
    e.preventDefault();

    if (!link.isScroll) {
      if (link.href.startsWith("/")) {
        window.location.href = link.href;
      } else {
        window.open(link.href, "_blank");
      }

      if (menuPopoverEnchorEl) {
        handleMenuPopoverClose();
      }
      return;
    }

    const element = document.querySelector(link.href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      window.history.pushState(null, "", link.href);

      if (menuPopoverEnchorEl) {
        handleMenuPopoverClose();
      }
    }
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleLanguageChange = (language) => {
    setLangPopoverEnchorEl(null);
    setMenuPopoverEnchorEl(null);
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <AppBar
      elevation={0}
      sx={{
        py: 1.5,
        backgroundColor: {
          xs: trigger
            ? alpha(theme.palette.primary.neutral900, 0.6)
            : "transparent",
          md: "transparent",
        },
        transition: "background-color 0.3s ease",
        backdropFilter: {
          xs: trigger ? "blur(10px)" : "none",
          md: "none",
        },
        zIndex: 999,
        borderRadius: {
          xs: 0,
          lg: theme.shape.defaultBorderRadius,
        },
      }}
    >
      <Container maxWidth={"xl"}>
        <Toolbar
          component={"nav"}
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: {
              xs: "transparent",
              lg: alpha(theme.palette.primary.neutral900, 0.6),
            },
            p: { xs: 0, lg: 2 },
            backdropFilter: {
              xs: "none",
              lg: "blur(10px)",
            },
            borderRadius: theme.shape.defaultBorderRadius,
            overflow: "hidden",
          }}
        >
          <Link href="/">
            <img
              src={"/images/hexydog-logo-light.webp"}
              width={150}
              height={50}
              alt="HEXYDOG Logo"
              style={{ display: "block" }}
              title="HEXYDOG"
              loading="eager"
            />
          </Link>

          <Stack
            direction="row"
            gap={3}
            sx={{
              display: { xs: "none", lg: "flex" },
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <List
              sx={{ display: "flex", flexDirection: "row", gap: 4 }}
              disablePadding
            >
              {links.map((link, key) => (
                <ListItem key={key} disableGutters disablePadding>
                  <StyledLink
                    component="a"
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    sx={{
                      color: "text.white",
                      fontWeight: "400",
                      fontSize: "16px",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        color: "text.white",
                      },
                      ...transformTransitionStyle,
                    }}
                  >
                    {link.label}
                  </StyledLink>
                </ListItem>
              ))}
            </List>
          </Stack>

          {!isMobileOrTablet && (
            <Stack direction="row" gap={3} alignItems={"center"}>
              <Stack direction={"row"} gap={1}>
                {headerSocials.map((link, k) => (
                  <Link
                    key={k}
                    href={link.url}
                    target="_blank"
                    rel="noopener"
                    aria-label={link.url}
                    sx={{
                      color: alpha(theme.palette.primary.neutral400, 0.75),
                      "&:hover": {
                        transform: "translateY(-2px)",
                        color: "primary.neutral400",
                      },
                      ...linkTransition,
                      ...transformTransitionStyle,
                    }}
                  >
                    {link.logo}
                  </Link>
                ))}
              </Stack>

              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  height: "20px",
                  backgroundColor: "primary.neutral600",
                  alignSelf: "center",
                }}
              />

              <Button
                variant="text"
                aria-describedby={langPopoverId}
                sx={{
                  minWidth: "auto",
                  color: "text.white",
                  fontWeight: "400",
                  px: 0,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  ...textTransitionStyle,
                }}
                aria-haspopup="true"
                aria-owns={langPopoverId}
                onClick={
                  langPopoverOpen
                    ? handleLangPopoverClose
                    : handleLangPopoverOpen
                }
              >
                <Box
                  sx={{
                    width: "22px",
                    height: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {React.createElement(
                    supportedLanguages.find((lang) => lang.code === language)
                      ?.flag || GB
                  )}
                </Box>
                {supportedLanguages.find((lang) => lang.code === language)
                  ?.label || "English"}

                <BiChevronDown
                  size={"16px"}
                  color={theme.palette.primary.neutral100}
                />
              </Button>

              {isConnected ? (
                <Box
                  sx={{
                    backgroundColor: alpha(
                      theme.palette.primary.neutral900,
                      0.6
                    ),
                    overflow: "hidden",
                    borderRadius: "50px",
                    border: "1px solid",
                    borderColor: "primary.neutral800",
                  }}
                >
                  <appkit-button />
                </Box>
              ) : (
                <StyledButton
                  variant="contained"
                  LinkComponent={Link}
                  id="account"
                  onClick={handleConnectWallet}
                  sx={{
                    whiteSpace: "nowrap",
                    minWidth: "160px",
                    p: "12px 24px",
                    fontSize: "16px",
                    color: theme.palette.primary.neutral1000,
                    "&:hover": {
                      color: theme.palette.primary.neutral900,
                    },
                  }}
                >
                  {t("MAIN_HEADER.BUTTON")}
                </StyledButton>
              )}
            </Stack>
          )}

          {langPopoverEnchorEl && (
            <Popover
              id={langPopoverId}
              open={langPopoverOpen}
              anchorEl={langPopoverEnchorEl}
              onClose={handleLangPopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              disableRestoreFocus
              disableScrollLock
              elevation={0}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: theme.shape.roundedButtonBorderRadius,
                  border: "1px solid",
                  borderColor: "primary.neutral800",
                  bgcolor: "transparent",
                  boxShadow: "none",
                },
              }}
            >
              <Stack
                component={"div"}
                onMouseLeave={handleLangPopoverClose}
                sx={{
                  p: "10px",
                  pointerEvents: "auto",
                  width: "250px",
                  maxWidth: "250px",
                  minWidth: "120px",
                  backgroundColor: alpha(theme.palette.primary.neutral900, 0.8),
                  backdropFilter: "blur(10px)",
                }}
              >
                <List disablePadding>
                  {supportedLanguages.map((language, key) => (
                    <ListItem
                      key={key}
                      sx={{
                        p: "8px 12px",
                        borderRadius: theme.shape.defaultBorderRadius,
                        "&:hover": {
                          backdropFilter: "blur(10px)",
                          cursor: "pointer",
                        },
                        ...backgroundTransitionStyle,
                      }}
                      onClick={() => handleLanguageChange(language.code)}
                    >
                      <Typography
                        sx={{
                          fontWeight: "400",
                          fontSize: "15px",
                          color: "primary.neutral100",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Box sx={{ width: "20px", height: "15px" }}>
                          {React.createElement(language.flag)}
                        </Box>
                        {language.label}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Stack>
            </Popover>
          )}

          {isMobileOrTablet && (
            <Stack direction="row" gap={1.5} alignItems={"center"}>
              <Button
                variant="text"
                aria-describedby={langPopoverId}
                sx={{
                  minWidth: "auto",
                  color: "text.white",
                  fontWeight: "400",
                  padding: "4px 10px",
                  backgroundColor: {
                    xs: trigger
                      ? "transparent"
                      : alpha(theme.palette.primary.neutral900, 0.6),
                    lg: alpha(theme.palette.primary.neutral900, 0.6),
                  },
                  "&:hover": {
                    backgroundColor: alpha(
                      theme.palette.primary.neutral800,
                      0.6
                    ),
                  },
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  ...textTransitionStyle,
                }}
                aria-haspopup="true"
                aria-owns={langPopoverId}
                onClick={
                  langPopoverOpen
                    ? handleLangPopoverClose
                    : handleLangPopoverOpen
                }
              >
                <Box
                  sx={{
                    width: "22px",
                    height: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {React.createElement(
                    supportedLanguages.find((lang) => lang.code === language)
                      ?.flag || GB
                  )}
                </Box>
                {supportedLanguages.find((lang) => lang.code === language)
                  ?.label || "English"}
              </Button>

              <Box sx={{ maxWidth: "40px" }}>
                <Icon
                  sx={{
                    display: { xs: "flex", lg: "none" },
                    height: "100%",
                    width: "100%",
                    cursor: "pointer",
                  }}
                  onClick={handleMenuPopoverOpen}
                >
                  <IoMenu color={theme.palette.common.white} size={"30px"} />
                </Icon>
              </Box>

              {menuPopoverEnchorEl && (
                <Popover
                  id={menuPopoverId}
                  open={menuPopoverOpen}
                  anchorEl={menuPopoverEnchorEl}
                  onClose={handleMenuPopoverClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  disableScrollLock
                  disableRestoreFocus
                  elevation={0}
                  sx={{
                    "& .MuiPaper-root": {
                      borderRadius: "theme.shape.roundedButtonBorderRadius",
                      border: "1px solid",
                      borderColor: "primary.neutral900",
                      width: "90%",
                      zIndex: 1000,
                      maxWidth: "300px",
                      minWidth: "170px",
                      boxShadow: "none",
                      bgcolor: "primary.neutral1000",
                    },
                  }}
                >
                  <Stack component={"div"}>
                    <IconButton
                      onClick={handleMenuPopoverClose}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        zIndex: 1000,
                      }}
                    >
                      <Close
                        sx={{
                          color: "primary.neutral300",
                        }}
                      />
                    </IconButton>
                    <Stack sx={{ p: "10px" }}>
                      {links.map((link, key) => (
                        <ListItem
                          key={key}
                          sx={{
                            borderRadius: theme.shape.defaultBorderRadius,
                            fontWeight: "400",
                            p: 0,
                            "&:hover": {
                              bgcolor: "primary.neutral900",
                              cursor: "pointer",
                            },
                            ...backgroundTransitionStyle,
                          }}
                        >
                          <StyledLink
                            component="a"
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link)}
                            sx={{
                              width: "100%",
                              p: "10px 12px",
                              color: "primary.neutral100",
                              "&:hover": {
                                color: "primary.neutral100",
                              },
                            }}
                          >
                            {link.label}
                          </StyledLink>
                        </ListItem>
                      ))}

                      {isConnected ? (
                        <Box
                          sx={{
                            backgroundColor: alpha(
                              theme.palette.primary.neutral900,
                              0.6
                            ),
                            overflow: "hidden",
                            borderRadius: "50px",
                            border: "1px solid",
                            borderColor: "primary.neutral800",
                          }}
                          onClick={() => {
                            handleMenuPopoverClose();
                          }}
                        >
                          <appkit-button />
                        </Box>
                      ) : (
                        <StyledButton
                          variant="contained"
                          LinkComponent={Link}
                          id="account"
                          onClick={() => {
                            handleConnectWallet();
                            handleMenuPopoverClose();
                          }}
                          sx={{
                            whiteSpace: "nowrap",
                            minWidth: "160px",
                            p: "12px 24px",
                            fontSize: "16px",
                          }}
                        >
                          {t("MAIN_HEADER.BUTTON")}
                        </StyledButton>
                      )}
                    </Stack>
                  </Stack>
                </Popover>
              )}
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

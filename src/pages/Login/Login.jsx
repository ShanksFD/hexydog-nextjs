"use client";

import { Stack, Typography, FormControl, alpha, Alert } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect } from "react";

import { loginSchema } from "../../schemas";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectAuthLoading,
  selectAuthError,
  loginUser,
  selectIsAuthenticated,
} from "../../redux/slices/authSlice";
import { theme } from "@/lib/theme";
import { useRouter } from "next/navigation";
import { StyledButton } from "@/components/Ui";
import { TextField } from "@/components/Inputs/TextField";

const Login = ({ dict }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/blog-admin");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (values) => {
    await dispatch(
      loginUser({
        email: values.email,
        password: values.password,
      })
    );
  };

  return (
    <Stack
      style={{
        backgroundColor: theme.palette.primary.neutral1000,
        height: "100vh",
        padding: "24px",
      }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={loginSchema(dict)}
      >
        {({ handleChange, errors }) => (
          <Stack
            component={Form}
            id="login-form"
            name="login-form"
            sx={{
              width: { xs: "100%", sm: "350px" },
            }}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
          >
            <Stack gap={1} sx={{ textAlign: "center", marginBottom: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "32px",
                  color: theme.palette.text.primary,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {dict.LOGIN.TITLE}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "16px", color: theme.palette.text.secondary }}
              >
                {dict.LOGIN.PLEASE_LOGIN}
              </Typography>
            </Stack>

            {error && (
              <Alert severity="error" sx={{ marginBottom: 2, width: "100%" }}>
                {error}
              </Alert>
            )}

            <FormControl
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <Typography
                component={"label"}
                htmlFor="email"
                sx={{ fontSize: "16px", color: theme.palette.text.primary }}
              >
                {dict.LOGIN.EMAIL}
              </Typography>
              <TextField
                placeholder={dict.LOGIN.EMAIL_PLACEHOLDER}
                type="email"
                name="email"
                autoComplete="email"
                id="email"
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-input": {
                    borderColor: errors.email ? theme.palette.error.main : "",
                  },
                  "& .MuiInputBase-input:focus": {
                    borderColor: errors.email ? theme.palette.error.main : "",
                    boxShadow: errors.email
                      ? `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`
                      : "",
                  },
                }}
              />
              {errors.email && (
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.error.main }}
                >
                  {errors.email}
                </Typography>
              )}
            </FormControl>

            <FormControl
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <Typography
                component={"label"}
                htmlFor="password"
                sx={{ fontSize: "16px", color: theme.palette.text.primary }}
              >
                {dict.LOGIN.PASSWORD}
              </Typography>
              <TextField
                placeholder="********"
                type="password"
                name="password"
                autoComplete="current-password"
                id="password"
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-input": {
                    borderColor: errors.password
                      ? theme.palette.error.main
                      : "",
                  },
                  "& .MuiInputBase-input:focus": {
                    borderColor: errors.password
                      ? theme.palette.error.main
                      : "",
                    boxShadow: errors.password
                      ? `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`
                      : "",
                  },
                }}
              />
              {errors.password && (
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.error.main }}
                >
                  {errors.password}
                </Typography>
              )}
            </FormControl>

            <StyledButton
              type="submit"
              variant="contained"
              sx={{ width: "100%" }}
              disabled={loading}
            >
              {dict.LOGIN.LOGIN_BUTTON}
            </StyledButton>
          </Stack>
        )}
      </Formik>
    </Stack>
  );
};

export default Login;

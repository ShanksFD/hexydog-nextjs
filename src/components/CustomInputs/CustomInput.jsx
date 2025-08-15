"use client";

import { Stack, Typography } from "@mui/material";
import { useField } from "formik";
import { CustomTextField } from "../Utils/UIUtils";

export const CustomInput = ({
  manualMarginBottom = false,
  label,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <Stack
      direction="column"
      sx={{
        width: "100%",
        ...(manualMarginBottom && {
          marginBottom: manualMarginBottom,
        }),
      }}
    >
      <Stack gap={1}>
        {label && (
          <Typography
            component={"label"}
            htmlFor={props.id}
            color="primary.neutral100"
            sx={{
              fontSize: "15px",
              fontWeight: "500",
              "& +.MuiInputBase-root": {
                marginTop: 0,
              },
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </Typography>
        )}
        <CustomTextField
          {...field}
          {...props}
          sx={{
            "& .MuiInputBase-root fieldset": {
              borderColor: meta.error ? "error.main" : "",
            },
            "& .MuiFormHelperText-root": {
              ml: 2,
            },
          }}
        />
      </Stack>
      {meta.error ? (
        <Typography sx={{ fontSize: "14px", mt: 0.5, color: "error.main" }}>
          {meta.error}
        </Typography>
      ) : null}
    </Stack>
  );
};

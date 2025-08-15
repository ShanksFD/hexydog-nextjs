"use client";

import { useState } from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Add } from "@mui/icons-material";

const Accordion = styled((props) => (
  <MuiAccordion
    disableGutters
    elevation={0}
    square
    {...props}
    slotProps={{ TransitionProps: { unmountOnExit: true } }}
  />
))(() => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<Add sx={{ fontSize: "18px", color: "primary.neutral800" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row",
  backgroundColor: theme.palette.primary.neutral1000,
  color: theme.palette.primary.neutral200,
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.primary.neutral200,
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  "& .MuiTypography-root": {
    fontWeight: "500",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: "8px 16px 24px 24px",
  color: theme.palette.primary.neutral600,
  backgroundColor: theme.palette.primary.neutral1000,
  "& .MuiTypography-root": {
    fontWeight: "400",
    color: theme.palette.primary.neutral500,
  },
}));

export default function FaqSummary() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const faq = t("FAQ_SUMMARY", { returnObjects: true }) || [];

  return (
    <>
      {faq.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index + 1}`}
          onChange={handleChange(`panel${index + 1}`)}
        >
          <AccordionSummary
            aria-controls={`panel${index + 1}d-content`}
            id={`panel${index + 1}d-header`}
            sx={{
              "& .MuiTypography-root": {
                fontSize: {
                  xs: "16px",
                  md: "18px",
                },
              },
            }}
          >
            <Typography variant="h3">{item.QUESTION}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{item.ANSWER}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

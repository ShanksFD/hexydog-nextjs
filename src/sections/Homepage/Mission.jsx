import { Container, Stack, Typography } from "@mui/material";
import { Groups, VolunteerActivism, Stars } from "@mui/icons-material";
import Image from "next/image";

export default function Mission({ dict }) {
  const missions = [
    {
      icon: <Groups sx={{ fontSize: "26px", color: "white" }} />,
      title: dict.HOME_PAGE.MISSION.MISSIONS[0].TITLE,
      description: dict.HOME_PAGE.MISSION.MISSIONS[0].DESCRIPTION,
    },
    {
      icon: <VolunteerActivism sx={{ fontSize: "26px", color: "white" }} />,
      title: dict.HOME_PAGE.MISSION.MISSIONS[1].TITLE,
      description: dict.HOME_PAGE.MISSION.MISSIONS[1].DESCRIPTION,
    },
    {
      icon: <Stars sx={{ fontSize: "26px", color: "white" }} />,
      title: dict.HOME_PAGE.MISSION.MISSIONS[2].TITLE,
      description: dict.HOME_PAGE.MISSION.MISSIONS[2].DESCRIPTION,
    },
  ];

  return (
    <Container
      component="section"
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        gap: { xs: 3, md: "48px" },
        py: 4,
        mb: 4,
      }}
      maxWidth="lg"
    >
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexBasis: { xs: "100%", md: "50%" },
          mt: { xs: 4, md: 0 },
          position: "relative",
        }}
      >
        <Image
          src="/images/grid.webp"
          alt="Grid"
          width={385}
          height={385}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            opacity: 0.2,
            width: "70%",
            height: "auto",
          }}
        />
        <Image
          src="/images/image-mission.webp"
          alt="Mission"
          width={300}
          height={385}
          style={{
            maxWidth: "100%",
            width: "300px",
            objectFit: "contain",
            zIndex: 2,
            position: "relative",
          }}
        />
      </Stack>

      <Stack
        gap={2}
        sx={{
          flexBasis: { xs: "100%", md: "50%" },
          width: "100%",
        }}
      >
        <Stack component={"header"} gap={2}>
          <Stack gap={1}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "uppercase",
                color: "primary.main",
              }}
            >
              {dict.HOME_PAGE.MISSION.TITLE}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "24px", sm: "32px", md: "40px" },
                fontWeight: "600",
                color: "common.white",
              }}
            >
              {dict.HOME_PAGE.MISSION.SUBTITLE}
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: "18px",
              fontWeight: "300",
            }}
          >
            {dict.HOME_PAGE.MISSION.PARAGRAPH}
          </Typography>

          <Stack gap={2}>
            {missions.map((point, index) => (
              <Stack key={index}>
                <Stack
                  direction="row"
                  gap={1}
                  alignItems={"center"}
                  sx={{ mb: 1 }}
                >
                  {point.icon}
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "common.white",
                    }}
                  >
                    {point.title}
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    fontSize: "16px",
                    fontWeight: "300",
                  }}
                >
                  {point.description}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}

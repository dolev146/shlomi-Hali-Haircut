import { Typography } from "@mui/material";

const AppointmentHeader = () => {
  return (
    <div>
      <Typography
        alignContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
        variant={"h3"}
        sx={{
          userSelect: "none",
        }}
      >
        לקביעת תורים
      </Typography>
    </div>
  );
};

export { AppointmentHeader };

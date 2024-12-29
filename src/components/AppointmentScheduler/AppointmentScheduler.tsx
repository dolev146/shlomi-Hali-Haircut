import { AppointmentHeader } from "./components/AppointmentHeader";
import { AppointmentCardSchedulerOnSend } from "./components/AppointmentCardSchedulerOnSend";
import { Box } from "@mui/material";

const AppointmentScheduler = () => {
  return (
    <div dir="rtl" style={{ backgroundColor: "white" }}>
      <AppointmentHeader />
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <AppointmentCardSchedulerOnSend />
      </Box>
    </div>
  );
};

export { AppointmentScheduler };

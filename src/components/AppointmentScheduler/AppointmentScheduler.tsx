import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { generateTimeIntervals } from "./utils/generateTimeIntervals";
import { AppointmentHeader } from "./components/AppointmentHeader";
import { AppointmentCard } from "./components/AppointmentCard";

const AppointmentScheduler = () => {
  const [timeIntervals, setTimeIntervals] = useState<string[]>([]);
  const [appointments, setAppointments] = useState(
    [] as { fullName: string; service: string; time: string }[]
  );

  useEffect(() => {
    setTimeIntervals(generateTimeIntervals("10:00", "22:00"));
  }, []);

  const handleInputChange = (
    time: string,
    field: "fullName" | "service",
    value: string
  ) => {
    setAppointments((prevAppointments) => {
      const updatedAppointments = [...prevAppointments];
      const index = updatedAppointments.findIndex(
        (appointment) => appointment.time === time
      );

      if (index > -1) {
        updatedAppointments[index][field] = value;
      } else {
        updatedAppointments.push({
          fullName: field === "fullName" ? value : "",
          service: field === "service" ? value : "",
          time,
        });
      }

      return updatedAppointments;
    });
  };

  const getAppointmentField = (time: string, field: "fullName" | "service") => {
    const appointment = appointments.find((a) => a.time === time);
    return appointment ? appointment[field] : "";
  };

  const handleSubmit = () => {
    console.log("Appointments:", appointments);
  };

  return (
    <div dir="rtl" style={{ backgroundColor: "white" }}>
      <AppointmentHeader />
      <Box
        display="grid"
        sx={{
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)", // 2 columns for small screens (e.g., iPhone)
            sm: "repeat(3, 1fr)", // 3 columns for larger screens
            lg : "repeat(4, 1fr)"
          },
          gap: "16px", // Spacing between grid items
        }}
      >
        {timeIntervals.map((interval) => (
          <AppointmentCard
            interval={interval}
            getAppointmentField={getAppointmentField}
            handleInputChange={handleInputChange}
          />
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: "16px" }}
        >
          שלח
        </Button>
      </Box>
    </div>
  );
};

export { AppointmentScheduler };

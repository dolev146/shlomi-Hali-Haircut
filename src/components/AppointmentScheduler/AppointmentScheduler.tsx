import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { generateTimeIntervals } from "./utils/generateTimeIntervals";
import { AppointmentHeader } from "./components/AppointmentHeader";
import { AppointmentCard } from "./components/AppointmentCard";
import { Appointment } from "./types";
import {
  setAppointmentValuesFromDatabase,
  writeAppointmentData,
} from "./utils/writeAppointmentData";

const AppointmentScheduler = () => {
  const [timeIntervals, setTimeIntervals] = useState<string[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    setTimeIntervals(generateTimeIntervals("10:00", "22:00"));
    setAppointmentValuesFromDatabase(setAppointments);
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
        writeAppointmentData(updatedAppointments[index]);
      } else {
        const newAppointment = {
          fullName: field === "fullName" ? value : "",
          service: field === "service" ? value : "",
          time,
        };
        updatedAppointments.push(newAppointment);
        writeAppointmentData(newAppointment);
      }

      return updatedAppointments;
    });
  };

  const getAppointmentField = (time: string, field: "fullName" | "service") => {
    const appointment = appointments.find((a) => a.time === time);
    return appointment ? appointment[field] : "";
  };

  // const handleSubmit = () => {
  //   console.log("Appointments:", appointments);
  // };

  return (
    <div dir="rtl" style={{ backgroundColor: "white" }}>
      <AppointmentHeader />
      <Box
        display="grid"
        sx={{
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)", // 2 columns for small screens (e.g., iPhone)
            sm: "repeat(3, 1fr)", // 3 columns for larger screens
            lg: "repeat(4, 1fr)",
          },
          gap: "16px", // Spacing between grid items
        }}
      >
        {timeIntervals.map((interval) => (
          <AppointmentCard
            key={interval}
            interval={interval}
            getAppointmentField={getAppointmentField}
            handleInputChange={handleInputChange}
          />
        ))}
      </Box>
    </div>
  );
};

export { AppointmentScheduler };

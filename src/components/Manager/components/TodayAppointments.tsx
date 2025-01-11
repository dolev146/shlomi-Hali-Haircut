import React, { useEffect, useState } from "react";
import { Appointment } from "../../AppointmentScheduler/types";
import { Container, Typography, Paper, Grid, Box } from "@mui/material";
import { subscribeToTodayAppointments } from "../utils/subscribeToTodayAppointments";

const TodayAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = subscribeToTodayAppointments((updatedAppointments) => {
      setAppointments(updatedAppointments);
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  const isAppointmentPast = (
    appointmentDate: string,
    appointmentTime: string
  ) => {
    const [day, month, year] = appointmentDate.split("/").map(Number); // Assuming date format is "DD-MM-YYYY"
    const [hour, minute] = appointmentTime.split(":").map(Number); // Assuming time format is "HH:mm"
    const appointmentDateTime = new Date(year, month - 1, day, hour, minute);
    console.log(appointmentDateTime < new Date());
    return appointmentDateTime < new Date();
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        color: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        הפגישות להיום
      </Typography>
      {appointments.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          אין פגישות להיום
        </Typography>
      ) : (
        appointments.map((appointment, index) => {
          const isPast = isAppointmentPast(appointment.date, appointment.time);
          return (
            <Paper
              key={index}
              elevation={3}
              sx={{
                width: "100%",
                padding: 2,
                marginBottom: 2,
                backgroundColor: isPast ? "lightgreen" : "lightgray",
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>שם:</strong> {appointment.fullName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>שירות:</strong> {appointment.service.serviceName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>תאריך:</strong> {appointment.date}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>שעה:</strong> {appointment.time}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>טלפון:</strong> {appointment.phoneNumber}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          );
        })
      )}
    </Container>
  );
};

export { TodayAppointments };

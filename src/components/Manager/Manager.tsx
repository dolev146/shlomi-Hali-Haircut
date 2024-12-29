import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllAppointments } from "./utils/getAllAppointments";
import { Appointment } from "../AppointmentScheduler/types";

const Manager = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const data = await getAllAppointments();
      setAppointments(data);
    };
    fetchAppointments();
  }, []);

  return (
    <Box color={"black"} style={{ backgroundColor: "white" }} p={2}>
      <Typography variant="h4" gutterBottom>
        הפגישות שלך
      </Typography>
      <Grid container spacing={2}>
        {appointments.map((appointment, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <div dir="rtl">
                  <Typography variant="h6" gutterBottom>
                    שם: {appointment.fullName}
                  </Typography>
                  <Typography variant="body1">
                    שירות: {appointment.service.serviceName}
                  </Typography>
                  <Typography variant="body2">
                    תאריך: {appointment.date}
                  </Typography>
                  <Typography variant="body2">
                    שעה: {appointment.time}
                  </Typography>
                  <Typography variant="body2">
                    טלפון: {appointment.phoneNumber}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export { Manager };

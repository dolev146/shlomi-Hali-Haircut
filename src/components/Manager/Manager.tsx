import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllAppointments } from "./utils/getAllAppointments";
import { Appointment } from "../AppointmentScheduler/types";
import { generateToken, messaging } from "../../services/firebase-service";
import { onMessage } from "firebase/messaging";
import toast from "react-hot-toast";

const Manager = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const notifyUser = async () => {
      const permission = await generateToken();
      onMessage(messaging, (payload) => {
        console.log(payload);
        if (payload.notification?.body) {
          toast(payload.notification?.body);
        }
        if (permission === "granted") {
          if (payload.notification?.body) {
            new Notification(payload.notification?.body);
          }
        }
      });
    };

    const fetchAppointments = async () => {
      const data = await getAllAppointments();
      setAppointments(data);
    };
    fetchAppointments();
    notifyUser()
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

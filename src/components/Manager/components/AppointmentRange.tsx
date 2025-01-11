import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Appointment } from "../../AppointmentScheduler/types";
import { getAppointmentsInRange } from "../utils/getAppointmentsInRange";
import format from "date-fns/format";

const AppointmentRange = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleFetchAppointments = async () => {
    if (!startDate || !endDate) {
      return;
    }

    setLoading(true);

    // Format dates to "DD-MM-YYYY" for the backend
    const start = format(startDate, "dd-MM-yyyy");
    const end = format(endDate, "dd-MM-yyyy");

    try {
      const fetchedAppointments = await getAppointmentsInRange(start, end);
      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        sx={{ color: "black", padding: 2 }}
      >
        <Typography variant="h5" gutterBottom>
          פגישות לפי טווח תאריכים
        </Typography>

        <Box display="flex" gap={2} marginBottom={2}>
          <div dir="rtl">
            <DatePicker
              label="תאריך התחלה"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="תאריך סיום"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchAppointments}
          disabled={!startDate || !endDate || loading}
        >
          {loading ? "טוען..." : "הצג פגישות"}
        </Button>

        {appointments.length > 0 ? (
          <Box sx={{ marginTop: 3, width: "100%", maxWidth: "600px" }}>
            {appointments.map((appointment, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  border: "1px solid gray",
                  borderRadius: "4px",
                  padding: 1,
                  marginBottom: 1,
                }}
              >
                <Typography>תאריך: {appointment.date}</Typography>
                <Typography>שעה: {appointment.time}</Typography>
                <Typography>שם מלא: {appointment.fullName}</Typography>
                <Typography>מספר טלפון: {appointment.phoneNumber}</Typography>
                <Typography>
                  שם השירות: {appointment.service.serviceName}
                </Typography>
                <Typography>מחיר: {appointment.service.cost}</Typography>
              </Box>
            ))}
          </Box>
        ) : (
          !loading && (
            <Typography sx={{ marginTop: 2 }}>
              לא נמצאו פגישות בטווח המבוקש.
            </Typography>
          )
        )}
      </Box>
    </LocalizationProvider>
  );
};

export { AppointmentRange };

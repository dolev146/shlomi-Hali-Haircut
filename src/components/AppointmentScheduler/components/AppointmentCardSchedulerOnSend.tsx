import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import dayjs, { Dayjs } from "dayjs";
import { writeAppointmentData } from "../utils/writeAppointmentData";
import { DateChooser } from "./DateChooser";
import { TimeChooser } from "./TimeChooser";
import { ServiceChooser } from "./ServiceChooser";
import { useAvailableTimeIntervals } from "../hooks/useAvailableTimeIntervals";
import { SuccessfullAppointment } from "./SuccessfullAppointment";

const AppointmentCardSchedulerOnSend = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedTimeInterval, setSelectedTimeInterval] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedService, setSelectedService] = useState<{
    serviceName: string;
    cost: number;
  } | null>({ serviceName: "זקן + שיער ₪60", cost: 60 });

  const timeIntervals = useAvailableTimeIntervals(selectedDate);

  const [displayCard, setDisplayCard] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isFormValid =
    fullName &&
    phoneNumber &&
    selectedService &&
    selectedTimeInterval &&
    selectedDate;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setDisplayCard(false);
    setLoading(true);

    try {
      await writeAppointmentData({
        time: selectedTimeInterval,
        service: selectedService,
        fullName,
        phoneNumber,
        date: selectedDate!.format("DD-MM-YYYY"),
      });
      setSuccess(true);
    } catch (error) {
      console.error("Error submitting appointment", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {displayCard ? (
        <Card sx={{ marginBottom: 2, width: "50vw" }}>
          <CardContent>
            <DateChooser
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />

            <TimeChooser
              selectedDate={selectedDate}
              timeIntervals={timeIntervals}
              setSelectedTimeInterval={setSelectedTimeInterval}
              selectedTimeInterval={selectedTimeInterval}
            />

            <TextField
              dir="rtl"
              id="full-name"
              label="שם מלא"
              variant="outlined"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              sx={{ marginBottom: 2 }}
            />

            <TextField
              dir="rtl"
              id="phone-number"
              label="מספר טלפון"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              sx={{ marginBottom: 2 }}
              type="tel"
            />

            <ServiceChooser
              selectedService={selectedService}
              setSelectedService={setSelectedService}
            />

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!isFormValid}
              sx={{ marginTop: 2 }}
            >
              <Typography variant="body1">קבע תור</Typography>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <SuccessfullAppointment success={success} loading={loading} />
      )}
    </>
  );
};

export { AppointmentCardSchedulerOnSend };

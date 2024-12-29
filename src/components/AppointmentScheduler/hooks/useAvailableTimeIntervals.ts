import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { getAppointmentsByDate } from "../utils/getAppointmentsByDate";
import { generateTimeIntervals } from "../utils/generateTimeIntervals";

export const useAvailableTimeIntervals = (selectedDate: Dayjs | null) => {
  const [timeIntervals, setTimeIntervals] = useState<string[]>([]);

  useEffect(() => {
    const fetchAvailableTimeIntervals = async () => {
      if (selectedDate) {
        try {
          const appointments = await getAppointmentsByDate(selectedDate);
          const takenTimes = appointments.map(
            (appointment) => appointment.time
          );
          const availableTimes = generateTimeIntervals("10:00", "22:00").filter(
            (time) => !takenTimes.includes(time)
          );
          setTimeIntervals(availableTimes);
        } catch (error) {
          console.error("Failed to fetch available time intervals", error);
        }
      }
    };

    fetchAvailableTimeIntervals();
  }, [selectedDate]);

  return timeIntervals;
};

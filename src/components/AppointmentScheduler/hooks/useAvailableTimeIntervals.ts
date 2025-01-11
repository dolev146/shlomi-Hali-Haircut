import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { getAppointmentsByDate } from "../utils/getAppointmentsByDate";
import { generateTimeIntervals } from "../utils/generateTimeIntervals";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

// Extend Dayjs with timezone and UTC plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export const useAvailableTimeIntervals = (selectedDate: Dayjs | null) => {
  const [timeIntervals, setTimeIntervals] = useState<string[]>([]);

  useEffect(() => {
    const fetchAvailableTimeIntervals = async () => {
      if (selectedDate) {
        try {
          // Get the current time in Jerusalem
          const now = dayjs().tz("Asia/Jerusalem");
          const currentTimeString = now.format("HH:mm");

          const appointments = await getAppointmentsByDate(selectedDate);
          const takenTimes = appointments.map(
            (appointment) => appointment.time
          );

          // Generate time intervals between 10:00 and 22:00
          const allIntervals = generateTimeIntervals("10:00", "22:00");

          // Determine if the selected date is today
          const isToday = selectedDate.isSame(now, "day");

          // Filter available times
          const availableTimes = allIntervals.filter((time) => {
            const isAfterCurrentTime = !isToday || time >= currentTimeString;
            return isAfterCurrentTime && !takenTimes.includes(time);
          });

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

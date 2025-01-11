import { appointmentsRef } from "../../../services/firebase-service";
import { Appointment } from "../../AppointmentScheduler/types";
import { get } from "firebase/database";
import { isValidAppointment } from "./isValidAppointment";

// Helper function to parse date strings (assuming format "DD-MM-YYYY")
const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

// Function to fetch and filter appointments within a date range
export const getAppointmentsInRange = async (
  startDate?: string, // Optional start date (format: "DD-MM-YYYY")
  endDate?: string // Optional end date (format: "DD-MM-YYYY")
): Promise<Appointment[]> => {
  try {
    const snapshot = await get(appointmentsRef);
    const data = snapshot.val();

    // Validate the data
    if (!Array.isArray(data) || !data.every(isValidAppointment)) {
      console.error(
        "Invalid data format. Expected an array of appointments.",
        data
      );
      return [];
    }

    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);

    // Set default date range to [oneWeekAgo, now] if no parameters are provided
    const rangeStart = startDate ? parseDate(startDate) : oneWeekAgo;
    const rangeEnd = endDate ? parseDate(endDate) : now;

    // Filter appointments within the specified range
    const filteredAppointments = data.filter((appointment) => {
      const appointmentDate = parseDate(appointment.date);
      return appointmentDate >= rangeStart && appointmentDate <= rangeEnd;
    });

    // Sort appointments by date and time
    filteredAppointments.sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);

      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime();
      }

      const [hoursA, minutesA] = a.time.split(":").map(Number);
      const [hoursB, minutesB] = b.time.split(":").map(Number);

      return hoursA - hoursB || minutesA - minutesB;
    });

    return filteredAppointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};

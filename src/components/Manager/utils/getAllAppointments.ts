import { appointmentsRef } from "../../../services/firebase-service";
import { Appointment } from "../../AppointmentScheduler/types";
import { get } from "firebase/database";
import { isValidAppointment } from "./isValidAppointment";

// New function to fetch and process all appointments
export const getAllAppointments = async (): Promise<Appointment[]> => {
  try {
    const snapshot = await get(appointmentsRef);
    const data = snapshot.val();

    // Validate the data
    if (!Array.isArray(data) || !data.every(isValidAppointment)) {
      console.error(
        "Invalid data format. Expected an array of appointments.",
        data
      );
      return []; // Fallback to an empty array or handle error as needed
    }

    const now = new Date();

    // Filter out past dates, sort by date and time
    const validAppointments = data.filter((appointment) => {
      const [day, month, year] = appointment.date.split("-").map(Number);
      const appointmentDate = new Date(year, month - 1, day);

      // Keep appointments for today and future dates
      return (
        appointmentDate >=
        new Date(now.getFullYear(), now.getMonth(), now.getDate())
      );
    });

    // Sort appointments by date and time
    validAppointments.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split("-").map(Number);
      const [dayB, monthB, yearB] = b.date.split("-").map(Number);

      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);

      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime();
      }

      const [hoursA, minutesA] = a.time.split(":").map(Number);
      const [hoursB, minutesB] = b.time.split(":").map(Number);

      return hoursA - hoursB || minutesA - minutesB;
    });

    return validAppointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return []; // Fallback to an empty array or handle error as needed
  }
};

import { ref, get } from "firebase/database";
import { database } from "../../../services/firebase-service"; // Adjust the path accordingly
import { Dayjs } from "dayjs";
import { Appointment } from "../types";

// Function to get appointments by date
export const getAppointmentsByDate = async (
  date: Dayjs
): Promise<Appointment[]> => {
  const appointmentsRef = ref(database, "appointments");

  try {
    // Fetch the current appointments from the database
    const snapshot = await get(appointmentsRef);
    const currentData = snapshot.val();

    // Ensure the data is an array or initialize it
    const appointments: Appointment[] = Array.isArray(currentData)
      ? currentData
      : [];

    const dateString = date.format("DD-MM-YYYY");

    // Filter appointments by the given date
    const filteredAppointments = appointments.filter((appointment) => {
      return appointment.date === dateString;
    });

    return filteredAppointments;
  } catch (error) {
    console.error("Error fetching appointments by date:", error);
    return [];
  }
};

// Example usage:
// const appointments = await getAppointmentsByDate(dayjs().format('YYYY-MM-DD'));

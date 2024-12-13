import { ref, set, onValue, get } from "firebase/database";
import { database } from "../../../services/firebase-service"; // Adjust the path accordingly
import { Appointment } from "../types";

export const writeAppointmentData = async (newData: Appointment) => {
  const appointmentsRef = ref(database, "appointments");

  try {
    // Fetch the current data
    const snapshot = await get(appointmentsRef);
    const currentData = snapshot.val();

    // Ensure the data is an array or initialize it
    let appointments: Appointment[] = Array.isArray(currentData) ? currentData : [];

    // Check if the appointment already exists (by matching the time)
    const existingIndex = appointments.findIndex(
      (appointment) => appointment.time === newData.time
    );

    if (existingIndex >= 0) {
      // Update the existing appointment
      appointments[existingIndex] = newData;
    } else {
      // Add the new appointment
      appointments.push(newData);
    }

    // Write the updated array back to the database
    await set(appointmentsRef, appointments);
  } catch (error) {
    console.error("Error writing appointment data:", error);
  }
};

const appointmentsRef = ref(database, "appointments/");

export const setAppointmentValuesFromDatabase = (
  setAppointments: (appointments: Appointment[]) => void
) => {
  onValue(appointmentsRef, (snapshot) => {
    const data = snapshot.val();

    // Validate the data is an array of Appointment
    if (Array.isArray(data) && data.every(isValidAppointment)) {
      setAppointments(data as Appointment[]);
    } else {
      console.error(
        "Invalid data format. Expected an array of appointments.",
        data
      );
      setAppointments([]); // Fallback to an empty array or handle error as needed
    }
  });
};

// Helper function to validate an object as an Appointment
const isValidAppointment = (obj: any): obj is Appointment => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.fullName === "string" &&
    typeof obj.service === "string" &&
    typeof obj.time === "string"
  );
};

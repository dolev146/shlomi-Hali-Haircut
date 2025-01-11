import {  set, onValue, get } from "firebase/database";
import { appointmentsRef } from "../../../services/firebase-service"; // Adjust the path accordingly
import { Appointment } from "../types";

export const writeAppointmentData = async (newData: Appointment) => {

  try {
    // Fetch the current data
    const snapshot = await get(appointmentsRef);
    const currentData = snapshot.val();

    // Ensure the data is an array or initialize it
    const appointments: Appointment[] = Array.isArray(currentData)
      ? currentData
      : [];

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


import { onValue } from "firebase/database";
import { Appointment } from "../../AppointmentScheduler/types";
import { appointmentsRef } from "../../../services/firebase-service";
import { isValidAppointment } from "./isValidAppointment";

export const subscribeToTodayAppointments = (
    callback: (appointments: Appointment[]) => void
  ) => {
    const unsubscribe = onValue(
      appointmentsRef,
      (snapshot) => {
        const data = snapshot.val();
  
        // Validate the data
        if (!Array.isArray(data) || !data.every(isValidAppointment)) {
          console.error(
            "Invalid data format. Expected an array of appointments.",
            data
          );
          callback([]); // Fallback to an empty array or handle error as needed
          return;
        }
  
        const now = new Date();
        const todayStart = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const todayEnd = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1
        );
  
        // Filter appointments for today only
        const todayAppointments = data.filter((appointment) => {
          const [day, month, year] = appointment.date.split("-").map(Number);
          const appointmentDate = new Date(year, month - 1, day);
  
          return appointmentDate >= todayStart && appointmentDate < todayEnd;
        });
  
        // Sort the appointments by time (HH:mm)
        todayAppointments.sort((a, b) => {
          const [hourA, minuteA] = a.time.split(":").map(Number);
          const [hourB, minuteB] = b.time.split(":").map(Number);
          return hourA - hourB || minuteA - minuteB;
        });
  
        // Call the callback function with the sorted appointments
        callback(todayAppointments);
      },
      (error) => {
        console.error("Error fetching real-time appointments:", error);
        callback([]);
      }
    );
  
    // Return the unsubscribe function from onValue
    return () => unsubscribe();
  };
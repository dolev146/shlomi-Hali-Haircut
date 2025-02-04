import { Appointment } from "../../AppointmentScheduler/types";

// Helper function to validate an object as an Appointment
export const isValidAppointment = (obj: any): obj is Appointment => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.fullName === "string" &&
    typeof obj.service.serviceName === "string" &&
    typeof obj.service.cost === "number" &&
    typeof obj.time === "string" &&
    typeof obj.date === "string"
  );
};

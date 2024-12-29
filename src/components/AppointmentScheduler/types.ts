export interface Appointment {
  fullName: string;
  service: { cost: number; serviceName: string };
  time: string;
  date: string; // ISO 8601 date string
}

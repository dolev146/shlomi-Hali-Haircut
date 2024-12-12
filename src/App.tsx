import "./App.css";
import { AppointmentScheduler } from "./components/AppointmentScheduler";
import { Header } from "./components/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header />
        <AppointmentScheduler />
      </LocalizationProvider>
    </>
  );
}

export default App;

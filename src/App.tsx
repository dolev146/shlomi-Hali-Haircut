import "./App.css";
import { TimePicker } from "./TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function App() {
  const handleTimeSelect = (time: string) => {
    console.log("Selected time:", time);
    // You can add more logic here, such as saving the selected time in state or sending it to an API
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1>Barber Shop Appointment Scheduler</h1>
        <TimePicker
          startHour={14}
          endHour={20}
          interval={30}
          onTimeSelect={handleTimeSelect}
        />
      </LocalizationProvider>
    </>
  );
}

export default App;

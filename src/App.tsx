import "./App.css";
import { Header } from "./components/Header";
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
        <Header />
        <div style={{ marginTop: "100px" }}>
          <TimePicker
            startHour={14}
            endHour={20}
            interval={30}
            onTimeSelect={handleTimeSelect}
          />
        </div>
      </LocalizationProvider>
    </>
  );
}

export default App;

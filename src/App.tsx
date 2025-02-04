import { Box } from "@mui/material";
import "./App.css";
import { AppointmentScheduler } from "./components/AppointmentScheduler";
import { Header } from "./components/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Route, Routes } from "react-router-dom";
import { Manager } from "./components/Manager";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Box width={"100vw"} height={"100vh"} sx={{backgroundColor : "white"}} >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Toaster position="top-left" />
        <Header />
        <Routes>
          <Route path="/" element={<AppointmentScheduler />} />
          <Route path="/shlomi" element={<Manager />} />
        </Routes>
      </LocalizationProvider>
    </Box>
  );
}

export default App;

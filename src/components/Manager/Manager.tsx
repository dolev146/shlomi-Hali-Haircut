import { useEffect, useState, SyntheticEvent } from "react";
import { generateToken, messaging } from "../../services/firebase-service";
import { onMessage } from "firebase/messaging";
import toast from "react-hot-toast";
import { Box, Tabs, Tab, Typography, Button, TextField } from "@mui/material";
import { TodayAppointments } from "./components/TodayAppointments";
import { AppointmentRange } from "./components/AppointmentRange";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  // State to manage password checking
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  // If authorized, display the original content
  const [activeTab, setActiveTab] = useState(0);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  useEffect(() => {
    const notifyUser = async () => {
      const permission = await generateToken();
      onMessage(messaging, (payload) => {
        console.log(payload);
        if (payload.notification?.body) {
          toast(payload.notification?.body);
        }
        if (permission === "granted") {
          if (payload.notification?.body && payload.notification?.title) {
            new Notification(payload.notification?.title, {
              body: payload.notification?.body,
              icon: "https://shlomi-hali-haircut.web.app/assets/business_icon-CFVLxagW.jpg",
            });
          }
        }
      });
    };
    notifyUser();
  }, []);

  // A simple function to check the password and set isAuthorized
  const handleCheckPassword = () => {
    if (inputPassword === "$shlomi22") {
      setIsAuthorized(true);
    } else {
      alert("Wrong password!");
    }
  };

  // If the user is not authorized, only show the password prompt
  if (!isAuthorized) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Please enter the password to view this page
        </Typography>
        <TextField
          dir="rtl"
          type={showPassword ? "text" : "password"}
          label="סיסמא"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" onClick={handleCheckPassword}>
          שלח
        </Button>
      </Box>
    );
  }

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (event) {
      console.log(event);
    }
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="הפגישות של היום" />
        <Tab label="פגישות לפי טווח" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              הפגישות של היום
            </Typography>
            <TodayAppointments />
          </Box>
        )}
        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              פגישות לפי טווח
            </Typography>
            <AppointmentRange />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export { Manager };

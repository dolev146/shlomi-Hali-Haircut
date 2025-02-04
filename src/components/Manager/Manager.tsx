import { useEffect } from "react";
import { generateToken, messaging } from "../../services/firebase-service";
import { onMessage } from "firebase/messaging";
import toast from "react-hot-toast";
import { SyntheticEvent, useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { TodayAppointments } from "./components/TodayAppointments";
import { AppointmentRange } from "./components/AppointmentRange";

const Manager = () => {
  const [activeTab, setActiveTab] = useState(0);


  useEffect(() => {
    const notifyUser = async () => {
      const permission = await generateToken();
      onMessage(messaging, (payload) => {
        console.log(payload);
        if (payload.notification?.body) {
          toast(payload.notification?.body);
        }
        if (permission === "granted") {
          if (payload.notification?.body) {
            new Notification(payload.notification?.body);
          }
        }
      });
    };
    notifyUser()
  }, []);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if(event){
     console.log(event) 
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

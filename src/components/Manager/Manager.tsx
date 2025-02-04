import { SyntheticEvent, useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { TodayAppointments } from "./components/TodayAppointments";
import { AppointmentRange } from "./components/AppointmentRange";

const Manager = () => {
  const [activeTab, setActiveTab] = useState(0);

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

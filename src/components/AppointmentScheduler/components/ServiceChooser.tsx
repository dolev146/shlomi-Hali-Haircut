import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

type Service = {
  serviceName: string;
  cost: number;
} | null;

type ServiceChooserProps = {
  selectedService: Service;
  setSelectedService: (service: Service) => void;
};

const ServiceChooser: React.FC<ServiceChooserProps> = ({
  selectedService,
  setSelectedService,
}) => {
  return (
    <>
      <FormControl sx={{ display: "block" }}>
        <FormLabel>בחר שירות</FormLabel>
        <RadioGroup
          value={selectedService?.cost}
          onChange={(e) => {
            const cost = Number(e.target.value); // Get the cost from the radio button value
            const serviceName = e.target.closest("label")?.textContent; // Extract the service name
            if (serviceName) {
              setSelectedService({ serviceName, cost });
            }
          }}
        >
          <FormControlLabel
            sx={{ userSelect: "none" }}
            value="60"
            control={<Radio />}
            label={"זקן + שיער ₪60"}
          />
          <FormControlLabel
            sx={{ userSelect: "none" }}
            value="50"
            control={<Radio />}
            label={"שיער ₪50"}
          />
          <FormControlLabel
            sx={{ userSelect: "none" }}
            value="30"
            control={<Radio />}
            label={"זקן ₪30"}
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export { ServiceChooser };

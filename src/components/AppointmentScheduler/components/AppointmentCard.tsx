import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

const AppointmentCard = ({
  interval,
  getAppointmentField,
  handleInputChange,
}: {
  interval: string;
  getAppointmentField: (time: string, field: "fullName" | "service") => string;
  handleInputChange: (
    time: string,
    field: "fullName" | "service",
    value: string
  ) => void;
}) => {
  return (
    <Card key={interval} style={{ marginBottom: "16px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {interval}
        </Typography>
        <TextField
          dir="rtl"
          id={`name-${interval}`}
          label="שם מלא"
          variant="outlined"
          fullWidth
          value={getAppointmentField(interval, "fullName")}
          onChange={(e) =>
            handleInputChange(interval, "fullName", e.target.value)
          }
          style={{ marginBottom: "16px" }}
        />

        <FormControl>
          <FormLabel>בחר שירות</FormLabel>
          <RadioGroup
            value={getAppointmentField(interval, "service")}
            onChange={(e) =>
              handleInputChange(interval, "service", e.target.value)
            }
          >
            <FormControlLabel
              value="60"
              control={<Radio />}
              label={"זקן + שיער ₪60"}
            />
            <FormControlLabel
              value="50"
              control={<Radio />}
              label={"שער ₪50"}
            />
            <FormControlLabel
              value="30"
              control={<Radio />}
              label={"זקן ₪30"}
            />
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export { AppointmentCard };

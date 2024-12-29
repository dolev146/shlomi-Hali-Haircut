import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Dayjs } from "dayjs";

const TimeChooser = ({
  setSelectedTimeInterval,
  selectedTimeInterval,
  timeIntervals,
  selectedDate,
}: {
  setSelectedTimeInterval: (time: string) => void;
  selectedTimeInterval: string;
  timeIntervals: string[];
  selectedDate: Dayjs | null;
}) => {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="select-interval-label">בחר שעה מתאימה</InputLabel>
        <Select
          disabled={selectedDate === null}
          labelId="select-interval-label"
          id="select-interval"
          value={selectedTimeInterval}
          label="בחר שעה מתאימה"
          onChange={(event) => {
            setSelectedTimeInterval(event.target.value);
          }}
        >
          {timeIntervals.map((timeInterval) => (
            <MenuItem key={timeInterval} value={timeInterval}>
              {timeInterval}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedTimeInterval && (
        <Typography variant="h5" gutterBottom sx={{ userSelect: "none" }}>
          נבחר {selectedTimeInterval}
        </Typography>
      )}
    </>
  );
};

export { TimeChooser };

import { Alert } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

const DateChooser = ({
  setSelectedDate,
  selectedDate,
}: {
  setSelectedDate: (date: Dayjs | null) => void;
  selectedDate: Dayjs | null;
}) => {
  const [cleared, setCleared] = useState<boolean>(false);
  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <>
      <DatePicker
        format="DD-MM-YYYY"
        sx={{ width: "100%" }}
        slotProps={{
          field: {
            clearable: true,
            onClear: () => {
              setSelectedDate(null);
              setCleared(true);
            },
          },
        }}
        onChange={(value) => {
          if (!value) {
            setSelectedDate(null);
          } else {
            setSelectedDate(value);
          }
        }}
        value={selectedDate}
      />
      {cleared && (
        <Alert
          sx={{ position: "absolute", bottom: 50, right: 50, width: "30%" }}
          severity="success"
        >
          השדה התנקה
        </Alert>
      )}
    </>
  );
};

export { DateChooser };

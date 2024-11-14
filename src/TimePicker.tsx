// src/components/TimePicker.tsx
import React, { useState } from "react";

interface TimePickerProps {
  startHour?: number;
  endHour?: number;
  interval?: number;
  onTimeSelect: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  startHour = 9,
  endHour = 17,
  interval = 30,
  onTimeSelect,
}) => {
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Function to generate time slots
  const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const handleTimeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const time = event.target.value;
    setSelectedTime(time);
    onTimeSelect(time);
  };

  return (
    <div>
      <label htmlFor="time-picker">Select a time:</label>
      <select id="time-picker" value={selectedTime} onChange={handleTimeSelect}>
        <option value="">-- Choose a time --</option>
        {generateTimeSlots().map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};

export { TimePicker };

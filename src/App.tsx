import "./App.css";
import { TimePicker } from "./TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import BusinessIcon from "./assets/business_icon.jpg";
import BusinessFlyer from "./assets/business_flyer.jpg";

function App() {
  const handleTimeSelect = (time: string) => {
    console.log("Selected time:", time);
    // You can add more logic here, such as saving the selected time in state or sending it to an API
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          style={{
            width: "100vw",
            position: "relative",
            backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 70%, white 100%), url(${BusinessFlyer})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.7)",
            overflow: "visible", // Ensures the icon is not clipped
          }}
        >
          <div className="fade-up" style={{ textAlign: "center" }}>
            <h1>שלומי חלי</h1>
            <h2>סיבוב אחד ואתה חד</h2>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "-75px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              overflow: "hidden", // Ensures the image is fully contained within the circle
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              border: "4px solid white",
              backgroundColor: "white", // Fallback in case the image fails to load
            }}
          >
            <img
              src={BusinessIcon}
              alt="Business Icon"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ensures the image scales nicely within the circle
              }}
            />
          </div>
        </div>
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

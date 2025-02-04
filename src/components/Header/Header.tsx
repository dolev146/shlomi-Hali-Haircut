import BusinessIcon from "../../assets/business_icon.jpg";
import BusinessFlyer from "../../assets/business_flyer.jpg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, IconButton, Typography } from "@mui/material";
import { ContactIcons } from "./ContactIcons";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div style={{ backgroundColor: "white", width: "100vw" }}>
      <div
        style={{
          marginBottom: "75px",
          width: "100vw",
          position: "relative",
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 70%, white 100%), url(${BusinessFlyer})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",

          color: "white",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.7)",
          overflow: "visible", // Ensures the icon is not clipped
        }}
      >
        <IconButton
          onClick={() => {
            if (location.pathname.includes("/shlomi")) {
              navigate("/");
            } else {
              navigate("/shlomi");
            }
          }}
        >
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="fade-up" style={{ textAlign: "center" }}>
            <h1 style={{ userSelect: "none" }}>שלומי חלי</h1>
            <h2 style={{ userSelect: "none" }}>סיבוב אחד ואתה חד</h2>
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
                userSelect: "none",
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ensures the image scales nicely within the circle
              }}
            />
          </div>
        </div>
      </div>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        paddingTop={"0.5rem"}
        sx={{ backgroundColor: "white" }}
      >
        <LocationOnIcon color="info" width={10} />
        <Typography color="black">רחוב עמוס 22 נשר</Typography>
      </Box>
      <ContactIcons />
    </div>
  );
};

export { Header };

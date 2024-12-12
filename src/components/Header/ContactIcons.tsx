import React from "react";
import { Box, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import DirectionsIcon from "@mui/icons-material/Directions";

const ContactIcons: React.FC = () => {
  const phoneNumber = "+972528173190"; // Replace with your business phone number
  const whatsappLink = `https://wa.me/${phoneNumber}`;
  const phoneLink = `tel:${phoneNumber}`;
  const instagramLink = "https://www.instagram.com/shlomihali_barbershop/"; // Replace with your Instagram URL
  const wazeLink = "https://www.waze.com/ul?q=שלומי חלי shlomi hali"; // Replace with your Waze query or URL

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      paddingTop="0.5rem"
    >
      <IconButton
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon />
      </IconButton>

      <IconButton href={phoneLink} aria-label="Phone">
        <PhoneIcon />
      </IconButton>

      <IconButton
        href={instagramLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <InstagramIcon />
      </IconButton>

      <IconButton
        href={wazeLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Waze"
      >
        <DirectionsIcon />
      </IconButton>
    </Box>
  );
};

export { ContactIcons };

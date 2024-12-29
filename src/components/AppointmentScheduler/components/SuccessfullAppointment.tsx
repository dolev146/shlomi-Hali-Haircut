import { Box, CircularProgress, Fab, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import SaveSharpIcon from "@mui/icons-material/SaveSharp";

const SuccessfullAppointment = ({ success , loading}: { success: boolean; loading : boolean;  }) => {
  const saveButtonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="h5" color="success">
        התור שלך נקבע בהצלחה
      </Typography>

      <Box sx={{ m: 1, position: "relative" }}>
        <Fab aria-label="save" color="primary" sx={saveButtonSx}>
          {success ? <CheckIcon /> : <SaveSharpIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: green[500],
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export { SuccessfullAppointment };

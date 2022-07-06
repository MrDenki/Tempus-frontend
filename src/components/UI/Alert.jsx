import AlertComponent from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import Slide from '@mui/material/Slide';

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const Alert = ({ open, title, message, onClose }) => {
  const vertical = "bottom";
  const horizontal = "right";
  const alertType = "error";

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical, horizontal }}
      TransitionComponent={SlideTransition}
    >
      <AlertComponent onClose={onClose} severity={alertType} sx={{ width: "100%" }}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </AlertComponent>
    </Snackbar>
  );
};

export default Alert;

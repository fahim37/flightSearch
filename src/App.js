import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Logo from "./assets/companylogo.webp";
import FlightSearchForm from "./FlightSearchForm";
import LocationField from "./components/LocationField";
function App() {
  return (
    <div>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box component="img" sx={{ height: "55px" }} src={Logo} alt="Logo" />
          <Button
            variant="contained"
            color="secondary"
            sx={{
              borderRadius: "25px",
              fontSize: "12px",
              padding: "8px 20px",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            Login / Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <FlightSearchForm />
    </div>
  );
}

export default App;

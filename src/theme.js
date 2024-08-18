import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#32d095",
    },
    secondary: {
      main: "#525371",
    },
    text: {
      main: "#c7c7c7",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#D7E7F4",
        },
      },
    },
  },
});

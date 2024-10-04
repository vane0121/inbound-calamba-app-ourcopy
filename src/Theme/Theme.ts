import { Button } from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#212C5E",
    },
    secondary: {
      main: "#4caf50",
    },
    text: {
      primary: "#000000",
    },
    background: {
      default: "#222222",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: -1,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#f0f0f0",
            color: "#1C3766",
          },
        },
      },
    },
  },
});

const CustomHoverButton = styled(Button)(() => ({
  color: "white",
  fontFamily: "Poppins', sans-serif",
  "&:hover": {
    backgroundColor: "theme",
    color: "#212C5E",
  },
}));

export { CustomHoverButton };
export default theme;

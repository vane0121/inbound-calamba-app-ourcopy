import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import Router from "./Route/Router";
import theme from "./Theme/Theme";
import { UserProvider } from "./Context/UserContext";
function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={Router} />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;

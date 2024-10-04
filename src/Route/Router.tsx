import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import ManagerControlPanel from "../Features/ManagerControlPanel/ManagerControlPanel";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
import Roles from "../Shared/Enum/Roles.enum";
import Employees from "../Features/Employees/Employees";
import HumanResourceHub from "../Features/HumanResourceHub/HumanResourceHub";
import Supervisor from "../Features/Supervisor/Supervisor";
import SupervisorControlPanel from "../Features/SupervisorControlPanel/SupervisorControlPanel";
import Teams from "../Features/Teams/Teams";
import MyProfile from "../Features/MyProfile/MyProfile";
import Asset from "../Features/Asset/Asset";
import { Login } from "@mui/icons-material";

//create list for each role

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="login" element={<Login></Login>} />
      <Route
        path="ManagerControlPanel"
        element={<ManagerControlPanel></ManagerControlPanel>}
      />
      <Route path="/Employees" element={<Employees />} />
      <Route path="/Teams" element={<Teams />} />
      <Route path="MyProfile" element={<MyProfile></MyProfile>} />
      <Route
        path="HumanResourceHub"
        element={<HumanResourceHub></HumanResourceHub>}
      />
      <Route path="/Assets" element={<Asset />} />
      <Route
        path="/Supervisor"
        element={<Supervisor />}
      />
      <Route path="/SupervisorControlPanel" element={<SupervisorControlPanel />} />
      <Route path="/ManagerPanel"
        element={
          <ProtectedRoute AllowedRoles={[Roles.SYSTEM_ADMINISTRATOR]}
            Element={<ManagerControlPanel></ManagerControlPanel>}
          ></ProtectedRoute>} />
    </Route>
  )
);

export default Router;

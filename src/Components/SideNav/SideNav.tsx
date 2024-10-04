import { Box, Divider, Drawer, IconButton, Typography, useMediaQuery, } from "@mui/material";
import Grid from '@mui/material/Grid2'
import Badge, { badgeClasses } from "@mui/material/Badge";
import ISideNav from "./interface/SideNav.interface";
import { Groups, ForkLeft } from "@mui/icons-material";
import theme from "../../Theme/Theme";
import { useEffect, useState } from "react";
import Roles from "../../Shared/Enum/Roles.enum";
import LocationStorageKey from "../../Shared/Enum/LocationStorageKey.enum";
import { useNavigate } from "react-router-dom";

interface INavLinks {
  Path: string;
  Icon: JSX.Element;
  Label: string;
}

const enrollments: INavLinks[] = [
  { Path: '/Employees', Icon: <Groups />, Label: 'People' },
  { Path: '/', Icon: <ForkLeft />, Label: 'Asset' },
]

const managementsManager: INavLinks[] = [
  { Path: '/', Icon: <Groups />, Label: 'My Profile' },
  { Path: '/', Icon: <ForkLeft />, Label: 'Team Profile' },
  { Path: '/', Icon: <ForkLeft />, Label: 'Asset List' },
  { Path: '/', Icon: <ForkLeft />, Label: 'HR Hub' },
  { Path: '/ManagerPanel', Icon: <ForkLeft />, Label: "Manager's Panel" },
]

const InboundsManager: INavLinks[] = [
  { Path: '/', Icon: <Groups />, Label: 'My Task' },
  { Path: '/', Icon: <ForkLeft />, Label: 'Team Traker' },
  { Path: '/', Icon: <ForkLeft />, Label: 'Movements' },
]

const managementOperator = [
  { Path: '/', Icon: <Groups />, Label: 'My Profile' },
  { Path: '/', Icon: <ForkLeft />, Label: 'HR Hub' },
]

const InboundsOperator: INavLinks[] = [
  { Path: '/', Icon: <Groups />, Label: 'My Task' },
  { Path: '/', Icon: <ForkLeft />, Label: 'Team Traker' },
]


export default function SideNav({ IsVissible, ToggleDrawer, role }: ISideNav) {
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const [enrollmentData, setEnrollmentData] = useState<INavLinks[]>([] as INavLinks[]);
  const [managemanetData, setManagementData] = useState<INavLinks[]>([] as INavLinks[]);
  const [inboundData, setInboundData] = useState<INavLinks[]>([] as INavLinks[]);

  const navigate = useNavigate();

  useEffect(() => {
    const localRole = localStorage.getItem(LocationStorageKey.ROLE);

    switch (localRole) {
      case Roles.SYSTEM_ADMINISTRATOR:
        setEnrollmentData(enrollments)
        setManagementData(managementsManager)
        setInboundData(InboundsManager)
        break;
      case Roles.MANAGER:
        setManagementData(managementOperator)
        setInboundData(InboundsOperator)
        break;
      default:
        break;
    }
  }, [role])

  const handleNavigation = (path: string) => {
    navigate(path); // Navigate to the selected path
    ToggleDrawer(); // Close the drawer after navigating
  };

  return (
    <>
      <Box >
        <Drawer
          anchor={'left'}
          open={IsVissible}
          onClose={ToggleDrawer}
          PaperProps={{
            sx: {
              m: {
                xs: '1vh',  // Small screens (phones)
                sm: '1vh',  // Medium screens (tablets)
                md: '1vh',  // Larger tablets and smaller desktops
                lg: '1vh',  // Large desktops
                xl: '1vh'
              },  // Default margin based on viewport height
              mt: {
                xs: !isLandscape ? '9vh' : '11vh', // Small screens (phones)
                sm: !isLandscape ? '8vh' : '11vh',  // Medium screens (tablets)
                md: !isLandscape ? '8vh' : '11vh',  // Larger tablets and smaller desktops
                lg: !isLandscape ? '8vh' : '8vh',  // Large desktops
                xl: !isLandscape ? '10vh' : '9vh',
              },
              maxHeight: {
                xs: !isLandscape ? '90vh' : '10vh',  // Small screens (phones)
                sm: !isLandscape ? '91vh' : '10vh',  // Medium screens (tablets)
                md: !isLandscape ? '84vh' : '88vh', // Larger tablets and smaller desktops
                lg: !isLandscape ? '84vh' : '91vh',  // Large desktops
                xl: !isLandscape ? '80vh' : '90vh',
              },
              borderRadius: 5,
            },
          }}
        >
          <Box sx={{
            width: {
              xs: !isLandscape ? '90vw' : "100vw",  // Small screens (phones)
              sm: '70vw',  // Medium screens (tablets)
              md: '50vw',  // Larger tablets and smaller desktops
              lg: '50vw',  // Large desktops
              xl: '30vw'   // Extra large desktops
            },
          }} >
            <Box margin={2}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                color="primary"
                fontWeight={'bold'}
              >Enrollment</Typography>
              <Grid container spacing={2}>
                {
                  enrollmentData?.map(x => (
                    <Grid marginLeft={5} marginY={3} size={2}>
                      <Grid size={1} display="flex" justifyContent="center" alignItems="center">
                        <Badge overlap="circular" badgeContent={3} color="error"
                          variant="standard"
                          sx={{
                            [`& .${badgeClasses.standard}`]: {
                              width: 15,
                              height: 21,
                              outline: `4px solid ${theme.palette.primary.light}`,
                            },
                          }}
                        >
                          <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{
                              outline: `5px solid ${theme.palette.primary.main}`, // Adjust thickness and color as needed
                            }}
                            onClick={() => handleNavigation(x.Path)}
                          >
                            {x.Icon}
                          </ IconButton>
                        </Badge>
                      </Grid>
                      <Grid size={10} display="flex" justifyContent="center" alignItems="center">
                        <Typography marginY={2} marginLeft={-2}>
                          {x.Label}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
                }
              </Grid>
            </Box>
            <Divider sx={{ marginX: 2 }} />
            <Box margin={2}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                color="primary"
                fontWeight={'bold'}
              >Management</Typography>
              <Grid container spacing={2}>
                {
                  managemanetData.map(x => (
                    <Grid marginLeft={5} marginY={3} size={2}>
                      <Grid size={1} display="flex" justifyContent="center" alignItems="center">
                        <Badge overlap="circular" badgeContent={3} color="error"
                          variant="standard"
                          sx={{
                            [`& .${badgeClasses.standard}`]: {
                              width: 15,
                              height: 21,
                              outline: `4px solid ${theme.palette.primary.light}`,
                            },
                          }}
                        >
                          <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{
                              outline: `5px solid ${theme.palette.primary.main}`, // Adjust thickness and color as needed
                            }}
                            onClick={() => handleNavigation(x.Path)}
                          >
                            {x.Icon}
                          </ IconButton>
                        </Badge>
                      </Grid>
                      <Grid size={10} display="flex" justifyContent="center" alignItems="center">
                        <Typography marginY={2} marginLeft={-2}>
                          {x.Label}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
                }
              </Grid>
            </Box>
            <Divider sx={{ marginX: 2 }} />
            <Box margin={2}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                color="primary"
                fontWeight={'bold'}
              >Inbounds</Typography>
              <Grid container spacing={2}>
                {
                  inboundData.map(x => (
                    <Grid marginLeft={5} marginY={3} size={2}>
                      <Grid size={1} display="flex" justifyContent="center" alignItems="center">
                        <Badge overlap="circular" badgeContent={3} color="error"
                          variant="standard"
                          sx={{
                            [`& .${badgeClasses.standard}`]: {
                              width: 15,
                              height: 21,
                              outline: `4px solid ${theme.palette.primary.light}`,
                            },
                          }}
                        >
                          <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{
                              outline: `5px solid ${theme.palette.warning.main}`, // Adjust thickness and color as needed
                            }}
                            onClick={() => handleNavigation(x.Path)}
                          >
                            {x.Icon}
                          </ IconButton>
                        </Badge>
                      </Grid>
                      <Grid size={10} display="flex" justifyContent="center" alignItems="center">
                        <Typography marginY={2} marginLeft={-2}>
                          {x.Label}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
                }
              </Grid>
            </Box>
            <Divider sx={{ marginX: 2 }} />
          </Box>
        </Drawer >
      </Box >
    </>
  )
}


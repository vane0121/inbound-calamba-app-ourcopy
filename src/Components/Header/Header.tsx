import { AppBar, Badge, Box, IconButton, Menu, MenuItem, TextField, Toolbar, Typography } from '@mui/material'
import { Apps, AccountCircle } from '@mui/icons-material';
import { ChangeEvent, useState } from 'react';
import SideNav from '../SideNav/SideNav';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/UserContext';
import LocationStorageKey from '../../Shared/Enum/LocationStorageKey.enum';

export default function Header() {
  const { Logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [show, setIsShow] = useState(false);
  const [role, setRole] = useState("")

  function toggleDrawer() {
    setIsShow(!show);
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const nav = useNavigate()
  const handleClose = () => {
    setAnchorEl(null);
    nav("/")
  };

  function handleRoleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setRole(event.target.value)
    localStorage.setItem(LocationStorageKey.ROLE, event.target.value);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SideNav ToggleDrawer={toggleDrawer} IsVissible={show} role={role}></SideNav>
      <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} variant='elevation'>
        <Toolbar >
          <Box display={'flex'} alignItems={"center"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
            >
              <Apps />
            </IconButton>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => console.log("test")}
            >
              <Box
                component="img"
                src="src/assets/snrTransparentLogo.png"
                alt="S&R"
                sx={{
                  width: 90,
                  padding: 1,
                  display: {
                    xs: "none",
                    md: "block",
                  },
                }}
              />
            </IconButton>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            Distribution Center Sytem
          </Typography>
          <Box display={"flex"} alignItems={"center"}>
            <Box
              marginRight={1.5}
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <Typography>{user?.DisplayName}</Typography>
              <Typography fontSize={11}>User {user?.EmployeeNumber}</Typography>
            </Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleMenu}
            >
              <Badge badgeContent={4} color="primary">
                <AccountCircle />
              </Badge>
            </IconButton>
          </Box>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            sx={{ width: '300px' }}
            slotProps={{
              paper: {
                sx: { width: 300, }
              },
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem sx={{ marginY: 1 }} onClick={handleClose}>My Profile</MenuItem>
            <MenuItem
              sx={{ marginY: 1 }}
            >
              <TextField
                select
                fullWidth
                label="Change Role"
                size='small'
                slotProps={{
                  select: {
                    native: true,
                  },
                }}
                onChange={(e) => {
                  handleClose()
                  handleRoleChange(e)
                }}
              >
                {user?.Roles?.map((role) => (
                  <option style={{ padding: 1 }} key={role} value={role}>
                    {role}
                  </option>
                ))}

              </TextField>
            </MenuItem>

            <MenuItem
              sx={{ marginY: 1 }}
              onClick={() => Logout()}
            >Log out</MenuItem>
          </Menu>

        </Toolbar>
      </AppBar>
      <Box marginX={3}>
        <Outlet />
      </Box>
    </Box>
  );
}

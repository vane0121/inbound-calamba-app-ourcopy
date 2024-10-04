import React from "react";
import { Box, Typography, IconButton, Button, TextField, Select, MenuItem, Badge, badgeClasses, } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping"; 
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import theme from "../../Theme/Theme";

const AssignContainerButton: React.FC = () => {
  const handleAssignContainerClick = () => {
    console.log("Test component clicked!");
  };

  return (
    <Button onClick={handleAssignContainerClick}
      sx={{
        display: "flex", alignItems: "center", border: "2px solid #ccc", boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)", width: { xs: "100%", sm: "90%", md: "90%" }, height: "auto", backgroundColor: "white",
        marginTop: "20px", textTransform: "none", overflow: "hidden", boxSizing: "border-box",
      }}>
      <IconButton sx={{
        color: "white", marginRight: 2, padding: 0,
        backgroundColor: "transparent",
        marginLeft: '10px',
        marginTop: '3px',
        marginBottom: '3px',
        "&:hover": {
          backgroundColor: "transparent",
        },
        width: { xs: "40px", sm: "50px", md: "60px" }, height: { xs: "40px", sm: "50px", md: "60px" },
      }}
        aria-label="Assign Container"
      >
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
              outline: `5px solid ${theme.palette.warning.main}`,
            }}
          // onClick={ToggleDrawer}
          >
            <LocalShippingIcon sx={{ fontSize: "inherit", color: "#525252" }} />
          </ IconButton>
        </Badge>
      </IconButton>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1 }}>
        <Typography variant="h6" component="h2" sx={{ textAlign: "left", fontWeight: 700, color: "primary.main", fontSize: { xs: "16px", sm: "20px", md: "24px" }, lineHeight: { xs: "20px", sm: "24px", md: "28px" }, }} >Assign</Typography>
        <Typography variant="h6" component="h2" sx={{ textAlign: "left", fontWeight: 700, color: "primary.main", fontSize: { xs: "16px", sm: "20px", md: "24px" }, lineHeight: { xs: "20px", sm: "24px", md: "28px" }, }} >Container</Typography>
      </Box>
    </Button>
  );
};

// Door Component
interface DoorProps {
  number: number;
  isActive: boolean;
  isAssign?: boolean;
  onClick?: () => void;
}

const Door: React.FC<DoorProps> = ({ number, isActive, isAssign, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      width: { xs: "70px", sm: "80px", md: "90px" },
      height: { xs: "40px", sm: "45px", md: "50px" },
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:
        isActive && isAssign ? "white" : isActive ? "#00B050" : "#9E9E9E",
      color: "primary.main",
      fontSize: { xs: "16px", sm: "20px", md: "32px" },
      fontWeight: 700,
      textAlign: "center",
      borderRadius: 1,
      position: "relative",
      boxShadow: isActive
        ? `inset 3px 3px 6px rgba(255, 255, 255, 0.7), inset -3px -3px 6px rgba(0, 0, 0, 0.5), ${bevelStyle}, 0px 2px 4px rgba(0, 0, 0, 0.2)`
        : `inset 1px 1px 3px rgba(255, 255, 255, 0.5), inset -1px -1px 3px rgba(0, 0, 0, 0.3), ${bevelStyle}, 0px 2px 4px rgba(0, 0, 0, 0.2)`,
      filter: "contrast(1.2) brightness(1.1)",
      transform: "translateZ(0)",
      transition: "transform 0.3s",
      "&:hover": {
        transform: "translateZ(10px) scale(1.05)",
        boxShadow: `0px 10px 20px rgba(0, 0, 0, 0.2), 0px 6px 6px rgba(0, 0, 0, 0.2)`,
      },
    }}
  >
    {number}
    {isAssign && (
      <Box
        sx={{
          position: "absolute",
          top: -10,
          right: -7,
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: "red",
        }}
      />
    )}
  </Box>
);

const bevelStyle = `0px 6px 6px rgba(0, 0, 0, 0.2), 0px -6px 6px rgba(255, 255, 255, 0.2)`;

const handleDoorClick = (doorNumber: number) => {
  console.log(`Door ${doorNumber} clicked`);
}

const ManagerControlPanel: React.FC = () => {
  const doors = Array.from({ length: 17 }, (_, i) => ({
    number: i + 1,
    isActive: [1, 5].includes(i + 1), 
    isAssign: i + 1 === 5, 
  }));

  // Textfield and Select component
  const assignTeams = [
    { value: "Peach", label: "Peach", bgColor: "peachpuff" },
    { value: "Green", label: "Green", bgColor: "green" },
    { value: "Red", label: "Red", bgColor: "red" },
  ];

  const asnPalletConfigs = [
    { value: "ASNPAPERTECH20011", label: "ASNPAPERTECH20011" },
    { value: "ASNPAPERTECH20012", label: "ASNPAPERTECH20012" },
    { value: "ASNPAPERTECH20013", label: "ASNPAPERTECH20013" },
  ];

  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "10px",
      height: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#ccc",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#fff",
    },
  };

  return (
    <Box sx={{ padding: { xs: "8px", sm: "16px" }, minHeight: "100vh", overflow: 'hidden' }} >
      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: 700, color: "#1A237E", marginBottom: "24px", }}>Manager's Control Panel   </Typography>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 4, }}  >
        {/* Left section */}
        <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 25%" }, maxHeight: "710px", overflowY: "auto", boxSizing: "border-box", ...scrollbarStyles, }}>
          <Box sx={{ height: { xs: "100px", sm: "500px", md: "950px" } }}><AssignContainerButton /></Box>
        </Box>
        {/* Right section */}
        <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 75%" } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main", fontSize: { xs: "16px", sm: "20px", md: "24px" }, marginBottom: "16px", }} > Doors</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginBottom: "24px", }}>
            {doors.map((door) => (
              <Box key={door.number} sx={{ flexGrow: { xs: 1, sm: 0 }, cursor: 'pointer', }}>
                <Door number={door.number} isActive={door.isActive} isAssign={door.isAssign} onClick={() => handleDoorClick(door.number)} />
              </Box>
            ))}
          </Box>
          <Button variant="contained" color="primary" fullWidth
            sx={{
              marginBottom: "24px", padding: "4px 10px", width: { sm: "348px", md: "250px" }, fontSize: { xs: "16px", sm: "20px", md: "20px" }, fontWeight: 700, display: "flex", justifyContent: "center", alignItems: "center",
              marginLeft: { xs: 0, sm: 0 },
              marginRight: { xs: 0, sm: 0 },
            }}
          >
            Docked At Door
          </Button>
          {/* Form Section */}
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, }} >
            {/* First Box */}
            <Box sx={{ flex: 1, minHeight: "300px", padding: "16px", borderRadius: "8px", }} >
              <Typography variant="h6" sx={{ color: "primary.main", fontSize: { xs: "16px", sm: "20px", md: "24px" }, marginBottom: "16px", }}> Container Number </Typography>
              <TextField fullWidth variant="outlined" defaultValue="NEL214"
                sx={{
                  marginBottom: "16px", backgroundColor: "#DADEE7", color: "#212C5E", border: 0, boxShadow: 1,
                  "& .MuiOutlinedInput-input": { textAlign: "center", color: "#212C5E", fontSize: "16px", },
                }} />
              <Typography variant="h6" sx={{ color: "primary.main", fontSize: { xs: "16px", sm: "20px", md: "24px" }, marginBottom: "16px", }} > Assign Team </Typography>
              <Select fullWidth defaultValue="Peach"
                sx={{
                  marginBottom: "16px", backgroundColor: "#DADEE7", color: "#212C5E", border: 0, boxShadow: 1,
                  "& .MuiSelect-select": { textAlign: "center", color: "#212C5E", fontSize: "16px", },
                }}  >
                {assignTeams.map((team) => (
                  <MenuItem key={team.value} value={team.value}
                    sx={{
                      display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", textAlign: "center",
                    }}>
                    <Box sx={{ width: 34, height: 22, backgroundColor: team.bgColor, position: "absolute", left: "15px", }} />{team.label}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="h6" sx={{ color: "primary.main", fontSize: { xs: "16px", sm: "20px", md: "24px" }, marginBottom: "16px", }}>Assign Staging Area</Typography>
              <Select fullWidth defaultValue="5"
                sx={{
                  marginBottom: "16px", backgroundColor: "#DADEE7", color: "#212C5E", border: 0, boxShadow: 1,
                  "& .MuiSelect-select": { textAlign: "center", color: "#212C5E", fontSize: "16px", },
                }} >
                {Array.from({ length: 17 }, (_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            {/* Second Box */}
            <Box sx={{ flex: 1, minHeight: "300px", padding: "16px", borderRadius: "8px", display: "flex", flexDirection: "column", }}>
              <Typography variant="h6" sx={{ color: "primary.main", fontSize: { xs: "16px", sm: "20px", md: "24px" }, marginBottom: "16px", }} >ASN/Pallet Config</Typography>
              <Select fullWidth defaultValue="ASNPAPERTECH20012"
                sx={{
                  marginBottom: "16px", backgroundColor: "#DADEE7", color: "#212C5E", border: 0, boxShadow: 1, "& .MuiSelect-select": { textAlign: "center", color: "#212C5E", fontSize: "16px", },
                }}>
                {asnPalletConfigs.map((palletConfig) => (
                  <MenuItem key={palletConfig.value} value={palletConfig.value}
                    sx={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", textAlign: "center",
                    }}>{palletConfig.label}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="h6" sx={{ color: "primary.main", fontSize: { xs: "16px", sm: "20px", md: "24px" }, marginBottom: "16px", }} > Seal Number</Typography>
              <TextField fullWidth variant="outlined"
                sx={{
                  marginBottom: "16px", backgroundColor: "#DADEE7", color: "#212C5E", border: 0, boxShadow: 1, "& .MuiOutlinedInput-input": { textAlign: "center", color: "#212C5E", fontSize: "16px", },
                }} />
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "16px", marginBottom: "16px", }}>
                <Button variant="outlined" startIcon={<RestartAltIcon />} sx={{ width: "100%", padding: "4px 10px", fontSize: { xs: "16px", sm: "20px", md: "20px" }, fontWeight: 700, }}>Reset</Button>
                <Button variant="contained" color="primary" sx={{ width: "100%", padding: "4px 10px", fontSize: { xs: "16px", sm: "20px", md: "20px" }, fontWeight: 700, }} >Delegate</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ManagerControlPanel;


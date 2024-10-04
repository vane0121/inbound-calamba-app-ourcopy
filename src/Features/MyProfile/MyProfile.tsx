import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, styled, tableCellClasses, Button, ButtonProps, } from '@mui/material';
import { useState } from 'react';
import theme from '../../Theme/Theme';
import GetUserPayload from '../../Shared/Services/Jwt/jwtService';

// Temporary static data
const profileData = {
    name: 'Jane Smith',
    designation: 'Inbound Supervisor',
    rank: 'Supervisor',
    immediateHead: 'Janet Doe',
    location: 'DC – Calamba',
    employmentType: 'Direct',
    tenure: '2Y 5M',
};

const statsData = {
    assignedTasks: 100,
    completed: 90,
    open: 8,
    reAssigned: 2,
    productivity: '90%',
};

const attendanceData = [
    { month: 'JAN', businessDays: 25, present: 25, away: 0 },
    { month: 'FEB', businessDays: 23, present: 23, away: 0 },
    { month: 'MAR', businessDays: 25, present: 25, away: 0 },
    { month: 'APR', businessDays: 25, present: 24, away: 1 },
    { month: 'MAY', businessDays: 25, present: 25, away: 0 },
    { month: 'JUN', businessDays: 25, present: 25, away: 0 },
    { month: 'JUL', businessDays: 25, present: 23, away: 2 },
    { month: 'AUG', businessDays: 25, present: 25, away: 0 },
    { month: 'SEP', businessDays: 25, present: 3, away: '-' },
    { month: 'OCT', businessDays: 25, present: '-', away: '-' },
    { month: 'NOV', businessDays: 25, present: '-', away: '-' },
    { month: 'DEC', businessDays: 25, present: '-', away: '-' },
];

const scheduleData = [
    { day: 'SUN', startTime: '-', endTime: '-' },
    { day: 'MON', startTime: '7:00 AM', endTime: '5:00 PM' },
    { day: 'TUE', startTime: '7:00 AM', endTime: '5:00 PM' },
    { day: 'WED', startTime: '7:00 AM', endTime: '5:00 PM' },
    { day: 'THU', startTime: '7:00 AM', endTime: '5:00 PM' },
    { day: 'FRI', startTime: '7:00 AM', endTime: '5:00 PM' },
    { day: 'SAT', startTime: '7:00 AM', endTime: '5:00 PM' },
];

interface StyledTableCellProps extends React.ComponentPropsWithoutRef<typeof TableCell> {
    isMonth?: boolean;
    isHeader?: boolean;
    isDay?: boolean;
}

const StyledTableCell = styled(TableCell, {
    shouldForwardProp: (prop) =>
        prop !== "isMonth" && prop !== "isHeader" && prop !== "isDay",
})<StyledTableCellProps>(({ theme, isMonth, isHeader, isDay }) => ({
    [`&.${tableCellClasses.head}`]: {
        padding: "12px 16px",
        backgroundColor: "#DADEE7",
        color: isHeader ? "#0B76C2" : "#002060",
        fontWeight: 700,
        fontSize: "16px",
        borderTop: "none",
        borderBottom: "2px solid #B9B9B9",
        borderLeft: "2px solid #B9B9B9",
        borderRight: "2px solid #B9B9B9",
        textAlign: "center",
        boxShadow: 1,
    },
    [`&.${tableCellClasses.body}`]: {
        padding: "12px 16px",
        color: isMonth ? "#0B76C2" : isDay ? "#0B76C2" : theme.palette.common.black,
        fontWeight: 400,
        fontSize: "16px",
        borderTop: "none",
        borderBottom: "none",
        borderLeft: "2px solid #B9B9B9",
        borderRight: "2px solid #B9B9B9",
        textAlign: "center",
        boxShadow: 1,
    },
}));

const StyledTable = styled(Table)(() => ({
    borderRadius: theme.shape.borderRadius,
    border: "2px solid #B9B9B9",
    width: "100%",
    "& .MuiTableRow-root:hover": {
        backgroundColor: "#DADEE7",
    },
    "& .MuiTableCell-root": {
        padding: "12px 16px",
        border: "1px solid #B9B9B9",
    },
}));

interface DayButtonProps extends ButtonProps {
    selected?: boolean;
}

const DayButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "selected",
})<DayButtonProps>(({ theme, selected }) => ({
    width: "50px",
    height: "40px",
    marginRight: "12px",
    fontWeight: 700,
    fontSize: "20px",
    color: selected ? theme.palette.primary.main : "#fff",
    backgroundColor: selected ? "#D9D9D9" : "#007635",
    border: "1px solid # 007635",
    borderRadius: "8px",
    "&:hover": {
        backgroundColor: selected ? "#D0D0D0" : "#005A2A",
        border: "none",
    },
    "@media (max-width: 1200px)": {
        width: "45px",
        height: "35px",
    },
    "@media (max-width: 900px)": {
        width: "40px",
        height: "30px",
    },
}));

const dayInitials: Record<string, string> = {
    SUN: 'S',
    MON: 'M',
    TUE: 'T',
    WED: 'W',
    THU: 'T',
    FRI: 'F',
    SAT: 'S',
};

const toProperCase = (text: string) => {
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const MyProfile = () => {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const user = GetUserPayload();
    console.log("USER: ", user);


    return (
        <Box
            sx={{
                padding: { xs: "8px", sm: "16px" },
                minHeight: "100vh",
                overflow: "hidden",
                borderRadius: "16px", // Add rounded corners
                backgroundColor: "#f7f7f7", // Add a light gray background
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    marginBottom: "24px",
                    fontSize: { xs: "24px", sm: "30px", md: "36px" }, // Adjust font size
                    textShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)", // Add a subtle text shadow
                }}
            >
                My Profile
            </Typography>
            {/* Profile and Status Section */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: "10px", md: "20px" },
                    justifyContent: "space-between",
                    margin: theme.spacing(2), // Add some negative space
                    backgroundColor: "#fff", // Add a white background
                    borderRadius: "8px", // Add rounded corners
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
                    padding: theme.spacing(2), // Add some padding
                }}
            >
                {/* Profile Section */}
                <Box
                    sx={{
                        flex: 1,
                        padding: theme.spacing(2),
                        backgroundColor: "#f5f5f5", // Add a light gray background
                        borderRadius: "8px", // Add rounded corners
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
                        margin: theme.spacing(1), // Add some negative space
                    }}
                >
                    {Object.entries(profileData).map(([key, value]) => (
                        <Box
                            key={key}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: theme.spacing(1),
                            }}
                        >
                            <Box
                                sx={{
                                    width: "40%",
                                    textAlign: "right",
                                    paddingRight: theme.spacing(5),
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: theme.palette.primary.main,
                                        fontWeight: 700,
                                        fontSize: { xs: "16px", sm: "18px", md: "20px" }, // Adjust font size
                                        textShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)", // Add a subtle text shadow
                                    }}
                                >
                                    {toProperCase(key.replace(/([A-Z])/g, " $1"))}:
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: "60%",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontWeight: theme.typography.fontWeightRegular,
                                    }}
                                >
                                    <strong>{value}</strong>
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
                {/* Status Section */}
                <Box
                    sx={{
                        flex: 1,
                        padding: theme.spacing(2),
                        backgroundColor: "#f5f5f5", // Add a light gray background
                        borderRadius: "8px", // Add rounded corners
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
                        margin: theme.spacing(1), // Add some negative space
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                            fontSize: { xs: "18px", sm: "20px", md: "22px" }, // Adjust font size
                            marginBottom: theme.spacing(1),
                            textShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)", // Add a subtle text shadow
                        }}
                    >
                        My Stats
                    </Typography>
                    {Object.entries(statsData).map(([key, value]) => (
                        <Box
                            key={key}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: theme.spacing(1),
                            }}
                        >
                            <Box
                                sx={{
                                    width: "40%",
                                    textAlign: "right",
                                    paddingRight: theme.spacing(5),
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: theme.palette.primary.main,
                                        fontWeight: 700,
                                        fontSize: { xs: "16px", sm: "18px", md: "20px" }, // Adjust font size
                                        textShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)", // Add a subtle text shadow
                                    }}
                                >
                                    {toProperCase(key.replace(/([A-Z])/g, " $1"))}:
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: "60%",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontWeight: theme.typography.fontWeightRegular,
                                    }}
                                >
                                    <strong>{value}</strong>
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            {/* Attendance and Schedule Tables */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: "10px", md: "20px" },
                    justifyContent: "space-between",
                    marginTop: theme.spacing(3),
                    backgroundColor: "#fff", // Add a white background
                    borderRadius: "8px", // Add rounded corners
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
                    padding: theme.spacing(2), // Add some padding
                }}
            >
                {/* Attendance Table */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: "300px",
                        margin: theme.spacing(1), // Add some negative space
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                            fontSize: { xs: "18px", sm: "20px", md: "22px" }, // Adjust font size
                            marginBottom: theme.spacing(2),
                            textShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)", // Add a subtle text shadow
                        }}
                    >
                        Attendance:
                    </Typography>
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell isHeader>Month</StyledTableCell>
                                <StyledTableCell>Bus. Days</StyledTableCell>
                                <StyledTableCell>Present</StyledTableCell>
                                <StyledTableCell>Away</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attendanceData.map((row, index) => (
                                <TableRow key={index}>
                                    <StyledTableCell isMonth>{row.month}</StyledTableCell>
                                    <StyledTableCell>{row.businessDays}</StyledTableCell>
                                    <StyledTableCell>{row.present}</StyledTableCell>
                                    <StyledTableCell>{row.away}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
                </Box>
                 {/* Schedule Table */}
        <Box
          sx={{
            flex: 1,
            minWidth: "300px",
            margin: theme.spacing(1), // Add some negative space
          }}
        >
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: { xs: "20px", md: "70px" },
  }}
>
  <Typography
    variant="h6"
    sx={{
      fontWeight: 700,
      color: theme.palette.primary.main,
      fontSize: { xs: "18px", sm: "20px", md: "22px" }, // Adjust font size
      textShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)", // Add a subtle text shadow
    }}
  >
    Team:
  </Typography>
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Typography
      variant="h6"
      sx={{
        backgroundColor: "#FFE5B4",
        padding: theme.spacing(1),
        borderRadius: "8px",
        color: "#002060",
        fontWeight: 700,
        fontSize: { xs: "18px", sm: "20px", md: "22px" }, // Adjust font size
        textShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)", // Add a subtle text shadow
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
        border: "1px solid #FFC499", // Add a border
        transform: "scale(1.1)", // Add a scale effect
        transition: "all 0.3s ease-in-out", // Add a transition effect
        "&:hover": {
          transform: "scale(1.2)", // Add a hover effect
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add a hover shadow
        },
      }}
    >
      Peach
    </Typography>
  </Box>
</Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              fontSize: { xs: "18px", sm: "20px", md: "22px" }, // Adjust font size
              marginBottom: theme.spacing(2),
              textShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)", // Add a subtle text shadow
              backgroundColor: "#DADEE7", // Add a light gray background
              padding: theme.spacing(1), // Add some padding
              borderRadius: "8px", // Add rounded corners
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
            }}
          >
            Schedule:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              marginBottom: theme.spacing(2),
            }}
          >
            {scheduleData.map((day) => (
              <DayButton
                key={day.day}
                selected={selectedDay === day.day}
                onClick={() => setSelectedDay(day.day)}
              >
                {" "}
                {dayInitials[day.day]}
              </DayButton>
            ))}
          </Box>
          <StyledTable>
            <TableHead>
              <TableRow>
                <StyledTableCell>Day</StyledTableCell>
                <StyledTableCell>Start Time</StyledTableCell>
                <StyledTableCell>End Time</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scheduleData.map((row, index) => (
                <TableRow key={index}>
                  <StyledTableCell isDay>
                    {dayInitials[row.day]}
                  </StyledTableCell>
                  <StyledTableCell>{row.startTime}</StyledTableCell>
                  <StyledTableCell>{row.endTime}</StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </Box>
      </Box>
    </Box>
  );
};

export default MyProfile;

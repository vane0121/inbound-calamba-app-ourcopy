import { Typography } from '@mui/material';
import React, { useState, useEffect, memo } from 'react';
import theme from '../../Theme/Theme';

const TimeClock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const tick = () => {
      setTime(new Date());
    };

    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const isAM = hours < 12;
  const formattedTime = `${(hours % 12 || 12).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}${isAM ? 'AM' : 'PM'}`;
  
  return (
    <Typography
    sx={{
        color: theme.palette.text.secondary,
        fontWeight: theme.typography.fontWeightRegular,
        width: "100%",
    }}
    >
      <strong>{formattedTime}</strong>
    </Typography>
  );
};

export default memo(TimeClock);
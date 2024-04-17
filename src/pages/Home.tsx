// src/pages/Home.tsx
import React, { useEffect } from 'react';
import {Typography} from "@mui/material";

const Home: React.FC = () => {

  useEffect(() => {
    document.title = '4M Control Panel Home';
  }, []);

  return (
    <>
      <Typography variant="h4">4M Control Panel</Typography>
      <Typography paragraph>
        The Mean Money Making Machine that IS going to lead to IMMENSE wealth💰💎🤑!!
        And the below Prosche 911 Turbo S 🚗🚀🔥!!
      </Typography>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <img src={`${process.env.PUBLIC_URL}/992-turbo-s.png`} alt="992 Turbo S" style={{width: '80%'}}/>
      </div>
    </>
  );
};

export default Home;
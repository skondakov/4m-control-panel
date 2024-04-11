// src/pages/Home.tsx
import React from 'react';
import {Typography} from "@mui/material";

const Home: React.FC = () => {
  return (
    <>
      <Typography variant="h4">Home Page</Typography>
      <Typography paragraph>This is the home page of the admin dashboard.</Typography>
    </>
  );
};

export default Home;
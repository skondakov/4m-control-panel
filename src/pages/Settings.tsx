// src/pages/Settings.tsx
import React, {useEffect} from 'react';
import {Typography} from "@mui/material";

const Settings: React.FC = () => {

  useEffect(() => {
    document.title = 'Settings';
  }, []);

  return (
    <div>
      <Typography variant="h4">Settings Page</Typography>
      <Typography paragraph>This is the settings page of the admin dashboard.</Typography>
    </div>
  );
};

export default Settings;
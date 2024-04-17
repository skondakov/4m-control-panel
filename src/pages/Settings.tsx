// src/pages/Settings.tsx
import React, {useEffect} from 'react';
import {Typography} from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import { Box } from '@mui/system';

const Settings: React.FC = () => {

  useEffect(() => {
    document.title = 'Settings';
  }, []);

  return (
    <div>
      <Typography variant="h4">Settings</Typography>
      <Typography paragraph>This is the settings page of the admin dashboard.</Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Box sx={{ color: 'warning.main' }}>
          <Typography variant="h3" align="center">
            <WarningIcon fontSize="large" /> Under Construction <WarningIcon fontSize="large" />
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Settings;
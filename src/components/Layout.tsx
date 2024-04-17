import React, { useEffect, useState } from 'react';
import { AppBar, Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Select, Toolbar, Typography, FormControl, SelectChangeEvent } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import menuItems from '../config/menuItems';
import { Link } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';

const drawerWidth = 240;

interface environmentOptionType {
  value: string;
  label: string;
}

const environmentOptions: environmentOptionType[] = [
  { value: '992-turbo-s-tokyo', label: '992 Turbo S - Tokyo' },
  { value: 'revuelto-plovdiv', label: 'Revuelto - Plovdiv' },
];

const Layout: React.FC<{ children: React.ReactNode, signOut: ((data?: any) => void) | undefined }> = ({ children, signOut }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [environment, setEnvironment] = useState(environmentOptions[0].value);
  const isMenuOpen = Boolean(anchorEl);
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { username,  } = await getCurrentUser();
      setUser(username);
    };

    fetchUser();
  }, []);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEnvironmentChange = (event: SelectChangeEvent) => {
    setEnvironment(event.target.value);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={signOut}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            4M Control Panel
          </Typography>
          {/* Environment Dropdown */}
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              labelId="environment-select-label"
              id="environment-select"
              value={environment}
              onChange={handleEnvironmentChange}
              label="Environment"
            >
              {environmentOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Profile Icon */}
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
            <Typography sx={{ ml: 1 }}>{user}</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        anchor="left"
      >
        <Toolbar /> {/* This adds space at the top of the drawer below the app bar */}
        <List>
          {menuItems.map((item) => (
            <ListItemButton key={item.text} component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.alternative', p: 3, marginTop: 8 }} // Adjust marginTop to account for AppBar height
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
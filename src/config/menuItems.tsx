// src/config/menuItems.ts
import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

interface MenuItemType {
  text: string;
  icon: React.ReactElement;
  path: string;
}

const menuItems: MenuItemType[] = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Orders', icon: <SwapHorizIcon />, path: '/orders' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' }
];

export default menuItems;
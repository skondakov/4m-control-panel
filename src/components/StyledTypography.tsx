// src/components/StyledTypography.tsx
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  // Add more styles here
}));

export default StyledTypography;
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import logo from './logo.png';
import Button from '@mui/material/Button';

// Search bar styles
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  border: '1px solid #ccc', 
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(45),
    width: '25%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// Reusable Icon Button Component
function NotificationBadge({ count, color }) {
  return (
    <IconButton size="large" color="inherit">
      <Badge badgeContent={count} color={color}>
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}

export default function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
        <Toolbar>
          {/* Logo + Text */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Prime Minister's Office Logo" style={{ height: 40, marginRight: 10 }} />
            <Box>
              <Typography variant="body2" sx={{ lineHeight: 1}}>
                අග්‍රාමාත්‍යාංශ කාර්යාලය
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1 }}>
                பிரதமர் அலுவலகம்
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
                Prime Minister's Office
              </Typography>
            </Box>
          </Box>

          {/* Search Bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          {/* Six Icons */}
          <NotificationBadge count={5} color="primary" />
          <NotificationBadge count={2} color="secondary" />
          <NotificationBadge count={10} color="error" />
          <NotificationBadge count={8} color="success" />
          <NotificationBadge count={1} color="warning" />
          <NotificationBadge count={15} color="info" />

          {/* Account Menu Button */}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>

          {/* Menu */}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <Avatar /> Profile
            </MenuItem>

            <MenuItem>
              <Avatar /> My account
            </MenuItem>

            <Divider />

            <MenuItem>
              <ListItemIcon>
                <SummarizeIcon fontSize="small" />
              </ListItemIcon>
              Reports
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <AnalyticsIcon fontSize="small" />
              </ListItemIcon>
              Analysis
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>

          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


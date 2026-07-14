import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <AccountBalanceWalletIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 700 }}
        >
          Smart Expense Tracker
        </Typography>
        <Box>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/">Dashboard</Button>
              <Button color="inherit" component={Link} to="/transactions">Transactions</Button>
              <Button color="inherit" onClick={handleLogout}>Logout ({user.name})</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

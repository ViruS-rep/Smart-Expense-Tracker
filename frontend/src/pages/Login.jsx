import { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Alert, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>Welcome Back</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Login to manage your expenses
        </Typography>
        {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth label="Email" type="email" margin="normal"
            value={email} onChange={(e) => setEmail(e.target.value)} required
          />
          <TextField
            fullWidth label="Password" type="password" margin="normal"
            value={password} onChange={(e) => setPassword(e.target.value)} required
          />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account? <MuiLink component={Link} to="/register">Register</MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;

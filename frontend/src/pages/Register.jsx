import { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Alert, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>Create Account</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Start tracking your expenses today
        </Typography>
        {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth label="Full Name" margin="normal"
            value={name} onChange={(e) => setName(e.target.value)} required
          />
          <TextField
            fullWidth label="Email" type="email" margin="normal"
            value={email} onChange={(e) => setEmail(e.target.value)} required
          />
          <TextField
            fullWidth label="Password" type="password" margin="normal"
            helperText="At least 6 characters"
            value={password} onChange={(e) => setPassword(e.target.value)} required
          />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }} disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <MuiLink component={Link} to="/login">Login</MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;

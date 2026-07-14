import { useEffect, useState } from 'react';
import { Container, Typography, Grid, CircularProgress, Box, Alert } from '@mui/material';
import api from '../services/api.js';
import SummaryCards from '../components/SummaryCards.jsx';
import CategoryPieChart from '../components/CategoryPieChart.jsx';
import MonthlyBarChart from '../components/MonthlyBarChart.jsx';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await api.get('/transactions/analytics/summary', {
          params: { year: new Date().getFullYear() },
        });
        setSummary(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>Dashboard</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Overview for {new Date().getFullYear()}
      </Typography>
      <SummaryCards summary={summary} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CategoryPieChart data={summary.categoryBreakdown} />
        </Grid>
        <Grid item xs={12} md={6}>
          <MonthlyBarChart data={summary.monthlyBreakdown} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;

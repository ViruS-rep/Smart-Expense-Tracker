import { Grid, Card, CardContent, Typography } from '@mui/material';

export const formatINR = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value || 0);

const SummaryCards = ({ summary }) => {
  const cards = [
    { label: 'Total Income', value: summary.totalIncome, color: '#0f766e' },
    { label: 'Total Expense', value: summary.totalExpense, color: '#dc2626' },
    {
      label: 'Balance',
      value: summary.balance,
      color: summary.balance >= 0 ? '#0f766e' : '#dc2626',
    },
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {cards.map((card) => (
        <Grid item xs={12} sm={4} key={card.label}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {card.label}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: card.color }}>
                {formatINR(card.value)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;

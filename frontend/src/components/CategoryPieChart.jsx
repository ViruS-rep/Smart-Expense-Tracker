import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';
import { formatINR } from './SummaryCards.jsx';

const COLORS = [
  '#0f766e', '#f97316', '#6366f1', '#dc2626', '#eab308',
  '#14b8a6', '#8b5cf6', '#ec4899', '#22c55e', '#64748b',
];

const CategoryPieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Spending by Category</Typography>
          <Typography color="text.secondary">No expense data yet.</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Spending by Category</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={(entry) => entry.name}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatINR(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryPieChart;

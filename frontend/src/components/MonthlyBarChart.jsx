import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';
import { formatINR } from './SummaryCards.jsx';

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MonthlyBarChart = ({ data }) => {
  const chartData = (data || []).map((d) => ({ ...d, name: MONTH_LABELS[d.month - 1] }));

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Monthly Income vs Expense</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => formatINR(value)} />
            <Legend />
            <Bar dataKey="income" fill="#0f766e" name="Income" />
            <Bar dataKey="expense" fill="#dc2626" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyBarChart;

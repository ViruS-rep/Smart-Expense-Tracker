import { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Button, Grid,
} from '@mui/material';

const CATEGORIES = [
  'Food & Dining', 'Groceries', 'Transport', 'Rent', 'Utilities', 'Entertainment',
  'Healthcare', 'Shopping', 'Education', 'Investments', 'Travel', 'Others',
];
const PAYMENT_METHODS = ['Cash', 'UPI', 'Debit Card', 'Credit Card', 'Net Banking', 'Other'];

const emptyForm = {
  type: 'expense',
  amount: '',
  category: 'Food & Dining',
  description: '',
  paymentMethod: 'UPI',
  date: new Date().toISOString().slice(0, 10),
};

const TransactionForm = ({ open, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData, date: new Date(initialData.date).toISOString().slice(0, 10) });
    } else {
      setForm(emptyForm);
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit({ ...form, amount: Number(form.amount) });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={6}>
            <TextField select fullWidth label="Type" name="type" value={form.type} onChange={handleChange}>
              <MenuItem value="expense">Expense</MenuItem>
              <MenuItem value="income">Income</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth type="number" label="Amount (₹)" name="amount"
              value={form.amount} onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField select fullWidth label="Category" name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField select fullWidth label="Payment Method" name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
              {PAYMENT_METHODS.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth type="date" label="Date" name="date" value={form.date}
              onChange={handleChange} InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth label="Description" name="description" value={form.description}
              onChange={handleChange} multiline rows={2}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!form.amount || Number(form.amount) <= 0}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionForm;

import { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import api from '../services/api.js';
import TransactionList from '../components/TransactionList.jsx';
import TransactionForm from '../components/TransactionForm.jsx';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const fetchTransactions = async () => {
    try {
      const { data } = await api.get('/transactions');
      setTransactions(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load transactions');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleEdit = (t) => {
    setEditing(t);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this transaction?')) {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    }
  };

  const handleSubmit = async (form) => {
    if (editing) {
      await api.put(`/transactions/${editing._id}`, form);
    } else {
      await api.post('/transactions', form);
    }
    setFormOpen(false);
    fetchTransactions();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight={700}>Transactions</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Add Transaction
        </Button>
      </Box>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <TransactionList transactions={transactions} onEdit={handleEdit} onDelete={handleDelete} />
      <TransactionForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={editing}
      />
    </Container>
  );
};

export default Transactions;

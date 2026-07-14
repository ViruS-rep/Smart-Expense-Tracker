import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, IconButton, Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatINR } from './SummaryCards.jsx';

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  if (!transactions || transactions.length === 0) {
    return <Typography color="text.secondary" sx={{ mt: 2 }}>No transactions found.</Typography>;
  }

  return (
    <TableContainer component={Paper} elevation={2} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Payment</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((t) => (
            <TableRow key={t._id} hover>
              <TableCell>{new Date(t.date).toLocaleDateString('en-IN')}</TableCell>
              <TableCell><Chip size="small" label={t.category} /></TableCell>
              <TableCell>{t.description || '-'}</TableCell>
              <TableCell>{t.paymentMethod}</TableCell>
              <TableCell
                align="right"
                sx={{ color: t.type === 'income' ? '#0f766e' : '#dc2626', fontWeight: 600 }}
              >
                {t.type === 'income' ? '+' : '-'}{formatINR(t.amount)}
              </TableCell>
              <TableCell align="center">
                <IconButton size="small" onClick={() => onEdit(t)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => onDelete(t._id)}>
                  <DeleteIcon fontSize="small" color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionList;

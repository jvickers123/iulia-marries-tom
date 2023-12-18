import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AdminTableBody from './AdminTableBody';

const AdminTable = () => {
  return (
    <TableContainer component={Paper} className="rsvp-table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Attending?</TableCell>
            <TableCell>Full Day?</TableCell>
            <TableCell>Accomodation</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <AdminTableBody />
      </Table>
    </TableContainer>
  );
};

export default AdminTable;

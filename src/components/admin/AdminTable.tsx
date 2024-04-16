import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Guests } from '@/types/admin-types';
import AdminTableRow from './AdminTableRow';
import AddGuestButton from './AddGuestButton';
import AddGuest from './AddGuest';

const AdminTable = ({ guests }: { guests: Guests[] }) => {
  const [showAddGuestForm, setShowAddGuestForm] = useState(false);

  return (
    <>
      <h2>Guests</h2>
      <TableContainer component={Paper} className="rsvp-table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Attending?</TableCell>
              <TableCell>Full Day?</TableCell>
              <TableCell>Accomodation</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Lunch BBQ</TableCell>
              <TableCell>Hotdog</TableCell>
              <TableCell>Dietry Requirements</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guests?.map(guest => (
              <AdminTableRow key={guest.id} guest={guest} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddGuestButton setShowAddGuestForm={setShowAddGuestForm} />
      {showAddGuestForm && (
        <AddGuest
          setShowAddGuestForm={setShowAddGuestForm}
          showAddGuestForm={showAddGuestForm}
        />
      )}
    </>
  );
};

export default AdminTable;

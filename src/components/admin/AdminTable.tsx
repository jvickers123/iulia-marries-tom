import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';

import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchGuests } from '@/utilities/api-utils';
import { Guests } from '@/types/admin-types';
import LoadingSpinner from '../LoadingSpinner';
import AdminTableRow from './AdminTableRow';
import AddGuestButton from './AddGuestButton';
import AddGuest from './AddGuest';

const AdminTable = () => {
  const [guests, setGuests] = useState<Guests[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddGuestForm, setShowAddGuestForm] = useState(false);

  const getData = async () => {
    setLoading(true);
    const data = await fetchGuests();
    setLoading(false);

    if (!data) return;
    setGuests(data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Button
        onClick={getData}
        variant="contained"
        className="admin-table__button">
        Refresh
      </Button>
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
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guests.map(guest => (
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
      {loading && <LoadingSpinner />}
    </>
  );
};

export default AdminTable;

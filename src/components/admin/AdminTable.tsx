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
import TotalFoodTable from './TotalFood';

const AdminTable = ({ guests }: { guests: Guests[] }) => {
  const [showAddGuestForm, setShowAddGuestForm] = useState(false);

  return (
    <>
      <h2 className="admin-table__heading">Guests</h2>
      <h3>Food Totals:</h3>
      <TotalFoodTable guests={guests} />
      <TableContainer component={Paper} className="rsvp-table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="admin-table__cell--heading">Name</TableCell>
              <TableCell className="admin-table__cell--heading">
                Email
              </TableCell>
              <TableCell className="admin-table__cell--heading">
                Attending?
              </TableCell>
              <TableCell className="admin-table__cell--heading">
                Full Day?
              </TableCell>
              <TableCell className="admin-table__cell--heading">
                Accomodation
              </TableCell>
              <TableCell className="admin-table__cell--heading">Paid</TableCell>
              <TableCell className="admin-table__cell--heading">
                Lunch BBQ
              </TableCell>
              <TableCell className="admin-table__cell--heading">
                Hotdog
              </TableCell>
              <TableCell className="admin-table__cell--heading">
                Dietry Requirements
              </TableCell>
              <TableCell className="admin-table__cell--heading">
                Notes
              </TableCell>
              <TableCell className="admin-table__cell--heading">Edit</TableCell>
              <TableCell className="admin-table__cell--heading">
                Delete
              </TableCell>
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

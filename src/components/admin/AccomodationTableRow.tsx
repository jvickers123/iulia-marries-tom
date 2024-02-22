import { Guests, Tent } from '@/types/admin-types';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditButton from './EditButton';
import { useState } from 'react';
import EditModal from './EditModal';
import DeleteButton from './DeleteButton';
import { getGuestNamesOneString } from '@/utilities/data';

const AdminTableRow = ({ tent }: { tent: Tent }) => {
  const [editing, setEditing] = useState(false);

  const { id, name, price, guests, paid, type, notes } = tent;

  const guestNames = getGuestNamesOneString(guests);

  return (
    <>
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        className={`admin-table__table-row--attending-${paid && 'yes'}`}>
        <TableCell>{guestNames}</TableCell>
        <TableCell>{type}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>{paid ? 'Paid' : 'Not Paid'}</TableCell>
        <TableCell>{notes}</TableCell>
        <TableCell>
          <EditButton setEditing={setEditing} />
        </TableCell>
        <TableCell>
          <DeleteButton guestId={id} guestName={name} isAccomodation />
        </TableCell>
      </TableRow>
      {editing && (
        <EditModal editing={editing} setEditing={setEditing} tent={tent} />
      )}
    </>
  );
};

export default AdminTableRow;

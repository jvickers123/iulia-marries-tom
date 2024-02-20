import { Guests, Tent } from '@/types/admin-types';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditButton from './EditButton';
import { useState } from 'react';
import EditModal from './EditModal';
import DeleteGuestButton from './DeleteGuestButton';
import { getGuestNamesOneString } from '@/utilities/data';

const AdminTableRow = ({ tent }: { tent: Tent }) => {
  const [editing, setEditing] = useState(false);

  const { id, name, price, guests, paid, type, notes } = tent;

  const guestNames = getGuestNamesOneString(guests);

  return (
    <>
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        className={`admin-table__table-row--attending-${paid}`}>
        <TableCell>{guestNames}</TableCell>
        <TableCell>{type}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>{paid ? 'Paid' : 'Not Paid'}</TableCell>
        <TableCell>{notes}</TableCell>
        <TableCell>
          <EditButton setEditing={setEditing} />
        </TableCell>
        <TableCell>
          <DeleteGuestButton guestId={id} guestName={name} />
        </TableCell>
      </TableRow>
      {editing && (
        <EditModal editing={editing} setEditing={setEditing} tent={tent} />
      )}
    </>
  );
};

export default AdminTableRow;

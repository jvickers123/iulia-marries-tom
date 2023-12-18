import { Guests } from '@/types/admin-types';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditButton from './EditButton';
import { SetStateAction, useState } from 'react';
import EditGuest from './Editguest';
import DeleteGuestButton from './DeleteGuestButton';

const AdminTableRow = ({ guest }: { guest: Guests }) => {
  const [editing, setEditing] = useState(false);

  const { id, name, email, attending, fullDay, accomodation, price, notes } =
    guest;

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>{name}</TableCell>
        <TableCell component="th" scope="row">
          {email}
        </TableCell>
        <TableCell>{attending}</TableCell>
        <TableCell>{fullDay ? 'Full Day' : 'Reception Only'}</TableCell>
        <TableCell>{accomodation}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>{notes}</TableCell>
        <TableCell>
          <EditButton setEditing={setEditing} />
        </TableCell>
        <TableCell>
          <DeleteGuestButton guestId={id} />
        </TableCell>
      </TableRow>
      {editing && (
        <EditGuest editing={editing} setEditing={setEditing} guest={guest} />
      )}
    </>
  );
};

export default AdminTableRow;

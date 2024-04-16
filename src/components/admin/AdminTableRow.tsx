import { Guests } from '@/types/admin-types';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditButton from './EditButton';
import { useState } from 'react';
import EditModal from './EditModal';
import DeleteButton from './DeleteButton';

const AdminTableRow = ({ guest }: { guest: Guests }) => {
  const [editing, setEditing] = useState(false);

  const {
    id,
    name,
    email,
    attending,
    fullDay,
    accomodationTents,
    hotdog,
    lunch,
    dietryRequirements,
    notes,
  } = guest;

  return (
    <>
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        className={`admin-table__table-row--attending-${attending}`}>
        <TableCell>{name}</TableCell>
        <TableCell component="th" scope="row">
          {email}
        </TableCell>
        <TableCell>{attending}</TableCell>
        <TableCell>{fullDay ? 'Full Day' : 'Reception Only'}</TableCell>
        <TableCell>{accomodationTents ? 'Booked' : 'Not booked'}</TableCell>
        <TableCell>
          {accomodationTents
            ? accomodationTents.paid
              ? 'paid'
              : 'Not paid'
            : ''}
        </TableCell>
        <TableCell>{lunch}</TableCell>
        <TableCell>{hotdog}</TableCell>
        <TableCell>{dietryRequirements}</TableCell>
        <TableCell>{notes}</TableCell>
        <TableCell>
          <EditButton setEditing={setEditing} />
        </TableCell>
        <TableCell>
          <DeleteButton guestId={id} guestName={name} />
        </TableCell>
      </TableRow>
      {editing && (
        <EditModal editing={editing} setEditing={setEditing} guest={guest} />
      )}
    </>
  );
};

export default AdminTableRow;

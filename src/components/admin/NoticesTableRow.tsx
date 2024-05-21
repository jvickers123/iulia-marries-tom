import { Notice } from '@/types/admin-types';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditButton from './EditButton';
import { useState } from 'react';
import EditModal from './EditModal';
import DeleteButton from './DeleteButton';
import Button from '@mui/material/Button';

const NoticesTableRow = ({ notice }: { notice: Notice }) => {
  const [editing, setEditing] = useState(false);

  const { id, title, message, updatedAt } = notice;

  const updatedAtLocale = new Date(updatedAt!).toLocaleString();

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>{title}</TableCell>
        <TableCell>{message}</TableCell>
        <TableCell>{updatedAtLocale}</TableCell>
        <TableCell>
          <EditButton setEditing={setEditing} />
        </TableCell>
        <TableCell>
          <DeleteButton itemId={id!} guestName={title} isNotice />
        </TableCell>
      </TableRow>
      {editing && (
        <EditModal editing={editing} setEditing={setEditing} notice={notice} />
      )}
    </>
  );
};

export default NoticesTableRow;

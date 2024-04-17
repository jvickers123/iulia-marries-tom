import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';

import Paper from '@mui/material/Paper';
import { Tent } from '@/types/admin-types';
import AccomodationTableRow from './AccomodationTableRow';
import { useState } from 'react';
import EditButton from './EditButton';
import EditModal from './EditModal';

const AccomodationTable = ({ tents }: { tents: Tent[] }) => {
  const [showEditing, setShowEditing] = useState(false);
  return (
    <>
      <h2>Accomodation</h2>
      <TableContainer component={Paper} className="rsvp-table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="admin-table__cell--heading">
                Guests
              </TableCell>
              <TableCell className="admin-table__cell--heading">Type</TableCell>
              <TableCell className="admin-table__cell--heading">
                Price
              </TableCell>
              <TableCell className="admin-table__cell--heading">Paid</TableCell>
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
            {tents?.map(tent => (
              <AccomodationTableRow key={tent.id} tent={tent} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showEditing && (
        <EditModal editing={showEditing} setEditing={setShowEditing} />
      )}
    </>
  );
};

export default AccomodationTable;

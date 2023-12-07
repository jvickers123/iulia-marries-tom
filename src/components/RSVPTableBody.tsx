import { RSVPData } from '@/types/rsvp-types';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const RSVPTableBody = ({ rsvps }: { rsvps: RSVPData[] }) => (
  <TableBody>
    {rsvps.map(({ email, people, notes, attending, id }) => (
      <TableRow
        key={id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {email}
        </TableCell>
        <TableCell>{people}</TableCell>
        <TableCell>{attending}</TableCell>
        <TableCell>{notes}</TableCell>
      </TableRow>
    ))}
  </TableBody>
);

export default RSVPTableBody;

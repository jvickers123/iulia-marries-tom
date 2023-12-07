import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { RSVPData } from '@/types/rsvp-types';
import RSVPTableBody from './RSVPTableBody';

const RSVPTable = ({ rsvps }: { rsvps: RSVPData[] }) => (
  <TableContainer component={Paper} className="rsvp-table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>On behalf of</TableCell>
          <TableCell>Are they attending?</TableCell>
          <TableCell>Notes</TableCell>
        </TableRow>
      </TableHead>
      <RSVPTableBody rsvps={rsvps} />
    </Table>
  </TableContainer>
);

export default RSVPTable;

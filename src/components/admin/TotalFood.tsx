import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import { Guests } from '@/types/admin-types';
import { getTotalFood } from '@/utilities/form-utils';

const TotalFoodTable = ({ guests }: { guests: Guests[] }) => {
  const { lamb, salmon, veggie, vegan, classic, fish, halloumi, tofu } =
    getTotalFood(guests);

  return (
    <TableContainer className="total-food-table__container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="total-food-table__cell--heading">
              Food
            </TableCell>
            <TableCell>Classic Hotdog</TableCell>
            <TableCell>Fish Hotdog</TableCell>
            <TableCell>Halloumi Hotdog</TableCell>
            <TableCell>Tofu Hotdog</TableCell>
            <TableCell>Lamb BBQ</TableCell>
            <TableCell>Salmon BBQ</TableCell>
            <TableCell>Veggie BBQ</TableCell>
            <TableCell>Vegan BBQ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className="total-food-table__cell--heading">
              Total
            </TableCell>
            <TableCell>{classic}</TableCell>
            <TableCell>{fish}</TableCell>
            <TableCell>{halloumi}</TableCell>
            <TableCell>{tofu}</TableCell>
            <TableCell>{lamb}</TableCell>
            <TableCell>{salmon}</TableCell>
            <TableCell>{veggie}</TableCell>
            <TableCell>{vegan}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TotalFoodTable;

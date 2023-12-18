import { Guests } from '@/types/admin-types';

import TableBody from '@mui/material/TableBody';

import { useEffect, useState } from 'react';

import { fetchGuests } from '@/utilities/api-utils';
import AdminTableRow from './AdminTableRow';

const AdminTableBody = () => {
  const [guests, setGuests] = useState<Guests[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchGuests();
      setGuests(data);
    };
    getData();
  }, []);

  return (
    <TableBody>
      {guests.map(guest => (
        <AdminTableRow key={guest.id} guest={guest} />
      ))}
    </TableBody>
  );
};

export default AdminTableBody;

import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import AdminTable from './AdminTable';
import AccomodationTable from './AccomodationTable';
import { Guests, Tent } from '@/types/admin-types';
import { getData } from '@/utilities/data';
import LoadingSpinner from '../LoadingSpinner';

const AdminContainer = () => {
  const [showAccomodation, setShowAccomodation] = useState(false);
  const [guests, setGuests] = useState<Guests[]>([]);
  const [tents, setTents] = useState<Tent[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleAccomodation = () => setShowAccomodation(prev => !prev);

  useEffect(() => {
    getData({
      setLoading,
      setGuests,
      setTents,
    });
  }, []);

  return (
    <>
      <div className="admin-button-container">
        <Button
          onClick={toggleAccomodation}
          variant="contained"
          className="admin-table__button">
          {showAccomodation ? 'Show Guests' : 'Show Accomodation'}
        </Button>
        <Button
          onClick={() => getData({ setLoading, setGuests, setTents })}
          variant="contained"
          color="success"
          className="admin-table__button">
          Refresh
        </Button>
      </div>
      {showAccomodation ? (
        <AccomodationTable tents={tents} />
      ) : (
        <AdminTable guests={guests} />
      )}
      {loading && <LoadingSpinner />}
    </>
  );
};

export default AdminContainer;

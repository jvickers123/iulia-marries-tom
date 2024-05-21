import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import AdminTable from './AdminTable';
import AccomodationTable from './AccomodationTable';
import { Guests, Notice, Tent } from '@/types/admin-types';
import { getData } from '@/utilities/data';
import LoadingSpinner from '../LoadingSpinner';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import NoticesTable from './NoticesTable';

const AdminContainer = () => {
  const [showAccomodation, setShowAccomodation] = useState(false);
  const [panel, setPanel] = useState(0);
  const [guests, setGuests] = useState<Guests[]>([]);
  const [tents, setTents] = useState<Tent[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChangePanel = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setPanel(newValue);
  };

  const toggleAccomodation = () => setShowAccomodation(prev => !prev);

  useEffect(() => {
    getData({
      setLoading,
      setGuests,
      setTents,
      setNotices,
    });
  }, []);

  return (
    <>
      <div className="admin-button-container">
        <Tabs
          value={panel}
          onChange={handleChangePanel}
          aria-label="basic tabs example">
          <Tab label="Guests" />
          <Tab label="Accomodation" />
          <Tab label="Notices" />
        </Tabs>
        <Button
          onClick={() =>
            getData({ setLoading, setGuests, setTents, setNotices })
          }
          variant="contained"
          color="success"
          className="admin-table__button">
          Refresh
        </Button>
      </div>

      {panel === 0 && <AdminTable guests={guests} />}
      {panel === 1 && <AccomodationTable tents={tents} />}
      {panel === 2 && <NoticesTable notices={notices} />}
      {loading && <LoadingSpinner />}
    </>
  );
};

export default AdminContainer;

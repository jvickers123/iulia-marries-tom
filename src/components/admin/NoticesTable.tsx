import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';

import Paper from '@mui/material/Paper';
import { Notice } from '@/types/admin-types';
import NoticesTableRow from './NoticesTableRow';
import { useEffect, useState } from 'react';
import EditModal from './EditModal';
import Button from '@mui/material/Button';
import AddNotice from './AddNotice';

const NoticesTable = ({ notices }: { notices: Notice[] }) => {
  const [showEditing, setShowEditing] = useState(false);
  const [showAddNoticeForm, setShowAddNoticeForm] = useState(false);
  const [sortedNotices, setSortedNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const sorted = notices.sort((a, b) => {
      return (
        new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime()
      );
    });

    setSortedNotices(sorted);
  }, [notices]);
  return (
    <>
      <h2>Notices</h2>
      <Button
        variant="contained"
        className="add-guest__button"
        onClick={() => setShowAddNoticeForm(true)}>
        Add Notice
      </Button>
      <TableContainer component={Paper} className="rsvp-table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="admin-table__cell--heading">
                Title
              </TableCell>
              <TableCell className="admin-table__cell--heading">
                Message
              </TableCell>
              <TableCell className="admin-table__cell--heading">
                Last Update
              </TableCell>
              <TableCell className="admin-table__cell--heading">Edit</TableCell>
              <TableCell className="admin-table__cell--heading">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notices?.map(notice => (
              <NoticesTableRow key={notice.id} notice={notice} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showAddNoticeForm && (
        <AddNotice
          setShowAddNoticeForm={setShowAddNoticeForm}
          showAddNoticeForm={showAddNoticeForm}
        />
      )}
      {showEditing && (
        <EditModal editing={showEditing} setEditing={setShowEditing} />
      )}
    </>
  );
};

export default NoticesTable;

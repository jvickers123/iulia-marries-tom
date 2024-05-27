import Modal from '@mui/material/Modal';
import ModalContentContainer from './ModalContentContainer';
import { ModalVariant } from '@/types/guest-page-types';
import { useEffect, useState } from 'react';
import { Notice } from '@/types/admin-types';
import { fetchNotices } from '@/utilities/api-utils';
import LoadingSpinner from './LoadingSpinner';
import NoticeCard from './NoticeCard';

const Notices = ({
  showNotices,
  closeModal,
}: {
  showNotices: boolean;
  closeModal: () => void;
}) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchNotices({ setNotices, setLoading, setError });
  }, []);

  return (
    <Modal open={showNotices} onClose={closeModal}>
      <ModalContentContainer variant={ModalVariant.INFO}>
        <h2 className="info__heading">Notices</h2>
        {notices.length ? (
          notices.map(notice => <NoticeCard notice={notice} key={notice.id} />)
        ) : (
          <p className="info__para info__para--green">
            There doesn&apos;t appear to be any notices yet. They will be
            displayed here once they are posted.
          </p>
        )}

        {loading && <LoadingSpinner />}
        {error && (
          <p>There was an error loading the notices. Please try again later</p>
        )}
      </ModalContentContainer>
    </Modal>
  );
};

export default Notices;

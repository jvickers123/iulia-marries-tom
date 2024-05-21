import { Notice } from '@/types/admin-types';
import { TextField, Button } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { emptyNotice } from '@/utilities/form-utils';
import LoadingSpinner from '../LoadingSpinner';
import SuccessToast from '../SuccessToast';
import { addNotice, editNotice } from '@/utilities/api-utils';

const NoticeForm = ({ notice }: { notice?: Notice }) => {
  const [formData, setFormData] = useState(emptyNotice);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
    setError(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (notice) {
      editNotice({
        body: formData,
        setLoading,
        setError,
        setShowSuccessToast,
      });
    } else {
      addNotice({
        body: formData,
        setLoading,
        setError,
        setShowSuccessToast,
      });
    }
  };

  useEffect(() => {
    if (notice) {
      setFormData(notice);
    }
  }, [notice]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (showSuccessToast) {
      timeoutId = setTimeout(() => {
        setShowSuccessToast(false);
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [showSuccessToast]);

  return (
    <>
      <h2 className="edit-form__heading">Edit notice</h2>
      <form onSubmit={handleSubmit} className="edit-form edit-form--wide">
        <div className="edit-form__flex-container">
          <TextField
            onChange={handleChange}
            value={formData.title}
            className="edit-form__input edit-form__input--wide"
            id="title"
            label="Title"
            type="text"
          />
          <TextField
            onChange={handleChange}
            value={formData.message}
            className="edit-form__input edit-form__input--wide"
            id="message"
            label="Message"
            multiline
            type="text"
          />
        </div>
        <Button className="edit-form__button" variant="contained" type="submit">
          {notice ? 'Update' : 'Add'}
        </Button>
        {loading && <LoadingSpinner />}
        {showSuccessToast && <SuccessToast />}

        {error && (
          <p className="login__error">Something went wrong, please try again</p>
        )}
      </form>
    </>
  );
};

export default NoticeForm;

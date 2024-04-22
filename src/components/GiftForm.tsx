import { sendGiftEmail } from '@/utilities/api-utils';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import SuccessToast from './SuccessToast';
import { checkIfValidEmail } from '@/utilities/auth';

const GiftForm = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendGiftEmail({ setError, setLoading, setSuccess, email });
  };

  useEffect(() => {
    const validEmail = checkIfValidEmail(email);
    setIsEmailValid(validEmail);
  }, [email]);

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <TextField
        className="booking-form__input"
        id="email"
        label="Email"
        variant="standard"
        type="email"
        value={email}
        onChange={e => {
          setEmail(e.target.value);
          console.log(e);
        }}
      />

      <Button
        variant="contained"
        className="booking-form__submit-btn"
        size="large"
        disabled={!isEmailValid}
        type="submit"
        color="secondary">
        Email me bank details
      </Button>

      {loading && <LoadingSpinner />}
      {error && (
        <p className="booking-form__para booking-form__para--warning-text">
          Something went wrong, could not send email. Please try again later.
        </p>
      )}
      {success && (
        <SuccessToast
          text={`Email sent! It will be from ${process.env.NEXT_PUBLIC_SENT_EMAIL} Please check spam if you cannot see in your primary inbox`}
        />
      )}
    </form>
  );
};
export default GiftForm;

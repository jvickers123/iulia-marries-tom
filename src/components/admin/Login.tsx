import { TextField, Button } from '@mui/material';
import AdminCard from './AdminCard';
import { SetStateAction, useState } from 'react';
import { LoginData } from '@/types/admin-types';
import { login } from '@/utilities/api-utils';
import LoadingSpinner from '../LoadingSpinner';

const Login = ({
  setIsLoggedIn,
}: {
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
    setError(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login({ formData, setError, setFormData, setLoading, setIsLoggedIn });
  };
  return (
    <AdminCard>
      <h2 className="login__title">Login</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <TextField
          onChange={handleChange}
          className="login__input"
          id="email"
          label="Email"
          variant="standard"
          type="email"
          required
        />
        <TextField
          onChange={handleChange}
          className="login__input"
          id="password"
          label="Password"
          variant="standard"
          type="password"
          required
        />
        <Button className="login__button" variant="contained" type="submit">
          Login
        </Button>
        {error && (
          <p className="login__error">
            Incorrect email or password. Please try again
          </p>
        )}
      </form>
      {loading && <LoadingSpinner />}
    </AdminCard>
  );
};

export default Login;

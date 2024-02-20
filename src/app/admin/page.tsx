'use client';

import '../../styles/main.scss';

import { useEffect, useState } from 'react';
import Login from '../../components/admin/Login';
import { userAuth } from '@/utilities/auth';
import AdminContainer from '../../components/admin/AdminContainer';

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = userAuth();
    if (userLoggedIn) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <main className="admin-main">
      <h1 className="admin-main__heading">Admin</h1>

      {loggedIn ? <AdminContainer /> : <Login setIsLoggedIn={setLoggedIn} />}
    </main>
  );
};

export default Admin;

'use client';

import '../../styles/main.scss';

import { useEffect, useState } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import Login from '@/components/admin/Login';
import { userAuth } from '@/utilities/auth';
import Success from '@/components/admin/Success';

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    const userLoggedIn = userAuth();
    if (userLoggedIn) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <main>
      <h1>Admin</h1>
      {loggedIn ? <AdminTable /> : <Login setIsLoggedIn={setLoggedIn} />}
    </main>
  );
};

export default Admin;

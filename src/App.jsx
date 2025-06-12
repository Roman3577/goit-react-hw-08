import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from './redux/auth/operations';
import { selectIsRefreshing } from './redux/auth/selectors';
import AppRoutes from './routes';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) return <div>Loading...</div>;

  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" />
    </>
  );
}

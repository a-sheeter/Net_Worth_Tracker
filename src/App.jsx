// react
import { useState, useEffect } from 'react';

// router
import { Routes, Route } from "react-router-dom";

// hooks
import useUser from './hooks/user';

// supabase
import { supabase } from "./utils/supabase";

// auth
import Register from './auth/Register';
import Login from './auth/Login';
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicRoute from "./auth/PublicRoute";

// pages
import Index from './pages/Index';

// styles
import './App.css'

export default function App() {
  /* --- Auth State --- */
  const [user, setUser] = useState(null);

  /* --- Effects --- */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }}) => {
      setUser(session?.user ?? null);
    });

    const { data: {subscription},} = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  /* --- Render --- */
  return (
    <>
      <Routes>

        {/* Public Routes */}
        <Route path="/register"
          element={
            <PublicRoute user={user}>
              <Register/>
            </PublicRoute>
          }
        />
        <Route path="/login"
          element={
            <PublicRoute user={user}>
              <Login/>
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route path="/"
          element={
            <ProtectedRoute user={user}>
              <Index/>
            </ProtectedRoute>
          }
          />
      </Routes>
    </>
  )
}

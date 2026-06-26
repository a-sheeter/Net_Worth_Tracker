// react
import { useState, useEffect } from 'react';

// router
import { Routes, Route } from "react-router-dom";

// supabase
import { supabase } from "./utils/supabase";

// auth
import Register from './auth/Register';
import Login from './auth/Login';
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicRoute from "./auth/PublicRoute";

// pages
import Index from './pages/Index';

// forms
import AccountForm from './pages/AccountForm';

// styles
import './App.css'

export default function App() {
  /* --- Auth State --- */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* --- Effects --- */
  useEffect(() => {
      async function loadSession() {
        const {
          data: {session},
        } = await supabase.auth.getSession();

        setUser(session?.user ?? null);
        setLoading(false);
      }

      loadSession();

      const {
        data: {subscription},
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

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
        <Route path="/account-form"
          element={
            <ProtectedRoute user={user}>
              <AccountForm/>
            </ProtectedRoute>
          }
          />
      </Routes>
    </>
  )
}

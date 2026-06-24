// react
import { useState, useEffect } from 'react';

// router
import { Routes, Route } from "react-router-dom";

// supabase
import { supabase } from "./utils/supabase";

// auth
import Register from './auth/Register';
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicRoute from "./auth/PublicRoute";

// styles
import './App.css'

export default function App() {
  /* --- Auth State --- */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* --- Effects --- */

  /* --- Render --- */
  return (
    <>
      <Routes>
        <Route path="/register"
          element={
            <PublicRoute user={user}>
              <Register/>
            </PublicRoute>
          }
        />
      </Routes>
    </>
  )
}

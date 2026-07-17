import { useState } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../utils/supabase";

import NavBar from "../components/NavBar";

export default function Index() {

    /* --- Render --- */
    return (
        <>
            <NavBar/>
            <h1>NET WORTH TRACKER</h1>
            <button><Link to="/update-networth">Update Net Worth</Link></button>
        </>
    )
}
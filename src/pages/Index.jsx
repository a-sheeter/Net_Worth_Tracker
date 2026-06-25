import { useState } from "react";

import { supabase } from "../utils/supabase";

import NavBar from "../components/NavBar";

export default function Index() {

    /* --- Render --- */
    return (
        <>
            <NavBar/>
            <h1>NET WORTH TRACKER</h1>
        </>
    )
}
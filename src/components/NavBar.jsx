import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../utils/supabase";

export default function NavBar() {
    const navigate = useNavigate();

    /* --- Handlers */
    async function handleLogOut() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log('Error logging out:', error.message);
        } else {
            console.log('User logged out successfuly!')
        }

        navigate("/login");
    }

    /* --- Render --- */
    return (
        <>
            <div>
                <Link to="/">Home</Link>
                <Link to="/login">Log In</Link>
                <button type="submit" onClick={handleLogOut}>Log Out</button>
            </div>
        </>
    )
}
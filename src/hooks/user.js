import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

export default function useUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        const { data: {user}, error: userError } = await supabase.auth.getUser();

        if (userError) {
            console.log(userError)
        }

        setUser(user)
    }

    return {
        user
    }
}
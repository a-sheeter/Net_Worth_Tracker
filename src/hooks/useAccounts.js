import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

// hooks
import useUser from "../hooks/useUser";

export default function useAccounts() {
    const { user } = useUser();

    /* --- State --- */
    const [accounts, setAccounts] = useState([]);

    /* --- Effects --- */
    useEffect(() => {
        if (user) {
            getAccounts();
        }
    }, [user]);

    /* --- Async functions --- */
    async function getAccounts() {
        if (!user) return;

        const { data, error } = await supabase
            .from("accounts")
            .select("*")
            .order('name', { ascending: true })
            .eq("user_id", user.id)

        if (error) {
            console.log(error.message);
            return;
        }
        setAccounts(data);
    }

    /* --- Handlers --- */
    async function handleDeleteAccount(accountId) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this account?"
        );

        if (!confirmed) return;

        const { error } = await supabase
            .from("accounts")
            .delete()
            .eq("id", accountId);

        if (error) {
            console.log(error);
            return;
        }

        setAccounts(prev => prev.filter(account => account.id !== accountId));
    }

    return {
        accounts,
        handleDeleteAccount
    }
}
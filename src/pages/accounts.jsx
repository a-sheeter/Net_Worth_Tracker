import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../utils/supabase";

import useUser from "../hooks/useUser";

export default function Accounts() {
    /* --- consts --- */
    const { user } = useUser();

    /* --- State --- */
    const [accounts, setAccounts] = useState([]);

    /* --- Effects --- */
    useEffect(() => {
        document.title = "Accounts | Net Worth Tracker";
    }, []);

    useEffect(() => {
        if (user) {
            getAccounts();
        }
    }, [user]);

    async function getAccounts() {
        if (!user) return;

        const { data, error } = await supabase
            .from("accounts")
            .select("*")
            .eq("user_id", user.id)

        if (error) {
            console.log(error.message);
            return;
        }

        setAccounts(data);
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Balance</td>
                        <td>Account Type</td>
                        <td>Account Subtype</td>
                        <td>Last Updated</td>
                        <td>Visit Account</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(account => (
                        <tr key={account.id}>
                            <td>{account.name}</td>
                            <td>{account.balance}</td>
                            <td>{account.account_type}</td>
                            <td>{account.account_subtype}</td>
                            <td>Need to add</td>
                            <td><Link target="_blank" to={account.url}>{account.url}</Link></td>
                            <td>Edit</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
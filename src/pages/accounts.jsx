// react
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// hooks
import useUser from "../hooks/useUser";

// components
import NavBar from "../components/NavBar";

// utils
import { supabase } from "../utils/supabase";



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

    /* --- Handlers --- */
    async function handleDeleteContact(accountId) {
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

    return (
        <>
            <NavBar />
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
                    {accounts.map(account => {
                        const lastUpdated = new Date(account.last_updated);

                        return (
                            <tr key={account.id}>
                                <td>{account.name}</td>
                                <td>{account.balance}</td>
                                <td>{account.account_type}</td>
                                <td>{account.account_subtype}</td>
                                <td>{lastUpdated.toLocaleDateString()}{" "} {lastUpdated.toLocaleTimeString()}</td>
                                <td><Link target="_blank" to={account.url}>{account.name}</Link></td>
                                <td>Edit | <button type="button" onClick={() => handleDeleteContact(account.id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
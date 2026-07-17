// react
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// hooks
import useAccounts from "../hooks/useAccounts";

// components
import NavBar from "../components/NavBar";

// data
import { accountTypes } from "../constants/accountTypes";

//utils
import { formatCurrency } from "../utils/formatters";
import { totalBalanceByType } from "../utils/calculations";
import { supabase } from "../utils/supabase";


export default function UpdateNetworth() {

    /* --- State --- */
    const {
        accounts,
        getAccounts
    } = useAccounts();

    const [successMessage, setSuccessMessage] = useState('');

    const [updatedBalances, setUpdatedBalances] = useState({});

    /* --- Effects --- */
    useEffect(() => {
        if (!successMessage) return;

        const timer = setTimeout(() => {
            setSuccessMessage('');
        }, 3000);

        return () => clearTimeout(timer);
    }), [successMessage];

    /* --- Handlers --- */
    function handleBalanceChange(accountId, value) {
        setUpdatedBalances(prev => ({
            ...prev,
            [accountId]: value
        }));
    }

    async function updateNetworthSnapshots(accounts) {
        const assetTotal = totalBalanceByType(accounts, "asset");
        const liabilityTotal = totalBalanceByType(accounts, "liability");
        const networthTotal = assetTotal - liabilityTotal;

        try {
            await supabase
                .from("networth_snapshots")
                .insert({
                    asset_total: assetTotal,
                    liability_total: liabilityTotal,
                    networth_total: networthTotal
                })
        } catch (error) {
            console.log(error)
        }
    }

    async function handleUpdateNetworth(e) {
        e.preventDefault();

        setSuccessMessage('');

        const updates = Object.entries(updatedBalances);

        for (const [id, balance] of updates) {
            try {
                await supabase
                    .from("accounts")
                    .update({
                        balance: Number(balance),
                        last_updated: new Date().toISOString()
                    })
                    .eq("id", id)
            } catch (error) {
                console.log(error)
            } finally {
                getAccounts();
                setSuccessMessage('Your Net Worth was successfully updated!');
            }

        }

        updateNetworthSnapshots(accounts);
    }

    return (
        <>
            <NavBar />
            <h1>Update Net Worth</h1> <button type="button"><Link to="/">Back to Dashboard</Link></button>
            <form onSubmit={handleUpdateNetworth}>
                <h2>Assets</h2>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Balance</td>
                            <td>Last Updated</td>
                            <td>New Balance</td>
                        </tr>
                    </thead>
                    <tbody>

                        {accounts.map(account => {
                            const lastUpdated = new Date(account.last_updated);

                            if (account.balance_type === "asset") {
                                return (
                                    <tr key={account.id}>
                                        <td>{account.name}</td>
                                        <td>{formatCurrency(account.balance)}</td>
                                        <td>{lastUpdated.toLocaleDateString()}{" "} {lastUpdated.toLocaleTimeString()}</td>
                                        <td><input
                                            type="number"
                                            value={updatedBalances[account.id] ?? account.balance}

                                            onChange={(e) => handleBalanceChange(account.id, e.target.value)}
                                        /></td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>

                <h2>Liabilities</h2>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Balance</td>
                            <td>Last Updated</td>
                            <td>New Balance</td>
                        </tr>
                    </thead>
                    <tbody>

                        {accounts.map(account => {
                            const lastUpdated = new Date(account.last_updated);

                            if (account.balance_type === "liability") {
                                return (
                                    <tr key={account.id}>
                                        <td>{account.name}</td>
                                        <td>{formatCurrency(account.balance)}</td>
                                        <td>{lastUpdated.toLocaleDateString()}{" "} {lastUpdated.toLocaleTimeString()}</td>
                                        <td><input
                                            type="number"
                                            value={updatedBalances[account.id] ?? account.balance}

                                            onChange={(e) => handleBalanceChange(account.id, e.target.value)}
                                        /></td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>

                <button type="submit">Update Net Worth</button>
            </form>
            <p>{successMessage}</p>
        </>
    )
}
// react
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// hooks
import useUser from "../hooks/useUser";

// components
import NavBar from "../components/NavBar";

// constants
import { accountTypes } from "../constants/accountTypes";

// utils
import { supabase } from "../utils/supabase";

export default function AccountForm() {

    const navigate = useNavigate();
    const { user } = useUser();

    /* --- Effect --- */
    useEffect(() => {
        document.title = "Add Account | Net Worth Tracker";
    }, []);

    /* --- State --- */
    const [name, setName] = useState("");
    const [typeId, setTypeId] = useState("");
    const [subtypeId, setSubtypeId] = useState("");
    const [url, setUrl] = useState("");
    const [balance, setBalance] = useState("");

    const selectedType = accountTypes.find(
        type => type.id === typeId
    );

    const balanceType = selectedType?.balanceType;

    /* --- Errors --- */
    const [errorMessage, setErrorMessage] = useState("");

    /* --- Form --- */
    function resetForm() {
        setName("");
        setTypeId("");
        setSubtypeId("");
        setUrl("");
        setBalance("");
    }

    /* --- Handlers --- */
    async function handleSubmit(e) {
        e.preventDefault();

        setErrorMessage("");

        const { error } = await supabase
            .from("accounts")
            .insert([
                {
                    user_id: user.id,
                    name: name,
                    account_type: typeId,
                    account_subtype: subtypeId,
                    url: url,
                    balance: balance,
                    balance_type: balanceType
                }
            ])

        if (error) {
            setErrorMessage(error.message);
            return;
        }

        resetForm();

        navigate("/accounts")
    }

    return (
        <>
            <NavBar />
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="account-type">Account Type</label>
                <select id="account-type" name="account-type" value={typeId} onChange={(e) => {
                    setTypeId(e.target.value); setSubtypeId("");
                }}>
                    <option value="">Choose Account Type</option>
                    {accountTypes.map(type => (
                        <option
                            key={type.id}
                            value={type.id}
                        >
                            {type.label}
                        </option>
                    ))
                    }
                </select>

                <label htmlFor="account-subtype">Account Sub-Type</label>
                <select id="account-subtype" value={subtypeId} name="account-subtype" onChange={(e) => setSubtypeId(e.target.value)}>
                    <option value="">Choose Account Subtype</option>
                    {selectedType?.subtypes.map(subtype => (
                        <option
                            key={subtype.id}
                            value={subtype.id}
                        >
                            {subtype.label}
                        </option>
                    ))}
                </select>

                <label htmlFor="url">Url to login</label>
                <input
                    id="url"
                    type="text"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <label htmlFor="balance">Balance</label>
                <input
                    id="balance"
                    type="number"
                    required
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                />

                <button type="submit">Add Account</button>
            </form>
        </>
    )
}
// react
import { useEffect } from "react";

// hooks
import useAccounts from "../hooks/useAccounts";

// components
import NavBar from "../components/NavBar";
import AssetTable from "../components/AssetTable";

// Render
export default function Accounts() {

    /* --- State --- */
    const {
        accounts,
        handleDeleteAccount
    } = useAccounts();

    /* --- Effects --- */
    useEffect(() => {
        document.title = "Accounts | Net Worth Tracker";
    }, []);

    return (
        <>
            <NavBar />
            <AssetTable/>
        </>
    )
}
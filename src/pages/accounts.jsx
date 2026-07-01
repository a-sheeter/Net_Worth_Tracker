// react
import { useEffect } from "react";
import { Link } from "react-router-dom";

// hooks
import useAccounts from "../hooks/useAccounts";

// data
import { accountTypes } from "../constants/accountTypes";

// components
import NavBar from "../components/NavBar";
import AssetTable from "../components/AssetTable";
import LiabilityTable from "../components/LiabilityTable";

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
            <LiabilityTable/>
        </>
    )
}
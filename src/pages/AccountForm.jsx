import { useState, useEffect } from "react";

import { accountTypes } from "../constants/accountTypes";

export default function AccountForm() {
    /* --- Effect --- */
    useEffect(() => {
        document.title = "Add Account | Net Worth Tracker";
    }, []);

    return (
        <>
            <p>Hello</p>
        </>
    )
}
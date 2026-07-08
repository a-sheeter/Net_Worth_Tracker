// react
import { Link, useNavigate } from "react-router-dom";

// hooks
import useAccounts from "../hooks/useAccounts";

// data
import { accountTypes } from "../constants/accountTypes";

export default function AssetTable() {

    const navigate = useNavigate();

    /* --- State --- */
    const {
        accounts,
        handleDeleteAccount
    } = useAccounts();

    return (
        <>
            <h2>Assets</h2>
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

                        const selectedType = accountTypes.find(
                            type => type.id === account.account_type
                        );

                        const selectedSubtype = selectedType.subtypes.find(
                            subtype => subtype.id === account.account_subtype
                        );

                        const formatter = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            currencySign: 'accounting'
                        });

                        if (account.balance_type === "asset") {
                            return (
                                <tr key={account.id}>
                                    <td>{account.name}</td>
                                    <td>{formatter.format(account.balance)}</td>
                                    <td>{selectedType?.label ?? account.account_type}</td>
                                    <td>{selectedSubtype?.label ?? account.account_subtype}</td>
                                    <td>{lastUpdated.toLocaleDateString()}{" "} {lastUpdated.toLocaleTimeString()}</td>
                                    <td><Link target="_blank" to={account.url}>{account.name}</Link></td>
                                    <td><button
                                        type="button"
                                        onClick={() => navigate(`/account-form/${account.id}/edit`)}
                                    >Edit</button> | <button type="button" onClick={() => handleDeleteAccount(account.id)}>Delete</button></td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
        </>
    )
}
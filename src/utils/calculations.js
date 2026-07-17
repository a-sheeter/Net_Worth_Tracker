export function totalBalanceByType(accounts, type) {
    return accounts.reduce((sum, account) => {
        return account.balance_type === type
            ? sum + account.balance
            : sum;
    }, 0);
}

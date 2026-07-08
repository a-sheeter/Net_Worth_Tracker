const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencySign: 'accounting'
});

export function formatCurrency(value) {
    return currencyFormatter.format(value);
}
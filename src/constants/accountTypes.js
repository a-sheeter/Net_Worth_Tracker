export const accountTypes = [
    {
        id: "cash",
        label: "Banking",
        balanceType: "asset",
        subtypes: [
            { id: "checking", label: "Checking" },
            { id: "savings", label: "Savings" },
            { id: "hysa", label: "HYSA" },
            { id: "money_market", label: "Money Market" },
            { id: "cd", label: "Certificate of Deposit" },
        ],
    },
    {
        id: "investments",
        label: "Investments",
        balanceType: "asset",
        subtypes: [
            { id: "brokerage", label: "Brokerage" },
            { id: "robo_advisor", label: "Robo-Advisor" },
            { id: "cryptocurrency", label: "Cryptocurrency" },
            { id: "529_plan", label: "529 Plan" },
        ],
    },
    {
        id: "retirement",
        label: "Retirement",
        balanceType: "asset",
        subtypes: [
            { id: "401k", label: "401(k)" },
            { id: "403b", label: "403(b)" },
            { id: "457b", label: "457(b)" },
            { id: "traditional_ira", label: "Traditional IRA" },
            { id: "roth_ira", label: "Roth IRA" },
            { id: "sep_ira", label: "SEP IRA" },
            { id: "simple_ira", label: "SIMPLE IRA" },
            { id: "pension", label: "Pension" },
        ],
    },
    {
        id: "health",
        label: "Health Savings",
        balanceType: "asset",
        subtypes: [
            { id: "hsa", label: "HSA" },
            { id: "fsa", label: "FSA" },
        ],
    },
    {
        id: "debt",
        label: "Debt",
        balanceType: "liability",
        subtypes: [
            { id: "credit_card", label: "Credit Card" },
            { id: "student_loan", label: "Student Loan" },
            { id: "auto_loan", label: "Auto Loan" },
            { id: "mortgage", label: "Mortgage" },
            { id: "heloc", label: "HELOC" },
            { id: "personal_loan", label: "Personal Loan" },
        ],
    },
    {
        id: "real_estate",
        label: "Real Estate",
        balanceType: "asset",
        subtypes: [
            { id: "primary_residence", label: "Primary Residence" },
            { id: "rental_property", label: "Rental Property" },
            { id: "vacation_property", label: "Vacation Property" },
            { id: "land", label: "Land" },
        ],
    },
    {
        id: "other",
        label: "Other",
        balanceType: "mixed",
        subtypes: [
            { id: "vehicle", label: "Vehicle", balanceType: "asset" },
            { id: "collectibles", label: "Collectibles", balanceType: "asset" },
            { id: "precious_metals", label: "Precious Metals", balanceType: "asset" },
            { id: "other_asset", label: "Other Asset", balanceType: "asset" },
            { id: "other_liability", label: "Other Liability", balanceType: "liability" },
        ],
    }
];
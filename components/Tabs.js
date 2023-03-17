
 
export const configurationCards = [
    {
        url: '/icons/config-setting.svg',
        title: "All settings",
        detail: "Explore all configuration settings on the dashboard"
    },
    {
        url: '/icons/config-bank.svg',
        title: "Transaction",
        detail: "Configure and mange all transaction activities on the platform"
    },
    {
        url: '/icons/config-security.svg',
        title: "Login & Password",
        detail: "Manage agents login and sign up passwords configurations"
    },
    {
        url: '/icons/config-student-card.svg',
        title: "Airtime",
        detail: "Manage airtime configurations and activities"
    },
    {
        url: '/icons/config-users.svg',
        title: "Commission",
        detail: "Configure how the agents and super agents  commission works "
    },
    {
        url: '/icons/config-time-forward.svg',
        title: "Wallet",
        detail: "You get to Setup and manage all direct debits here"
    },
    {
        url: '/icons/config-menu-home.svg',
        title: "Currency",
        detail: "Set your default language, currency, and timezone"
    },
    {
        url: '/icons/config-notes.svg',
        title: "Others",
        detail: "You can always request for your account statement & report for each account"
    },
]




export const tabs = [
    {
        text: "Analytics",
        data: "0",
        subTexts: [
            {
                text: "Agent Metrics",
                active:'/icons/agent-metrics.svg',
                inactive: '/icons/agent-metrics-inactive.svg',
                data: "0",
                link: "/dashboard/analytics/agent-metrics",
            },
            {
                text: "Loan Metrics",
                active:'/icons/loan-metrics.svg',
                inactive: '/icons/loan-metrics-inactive.svg',
                data: "0",
                link: "/dashboard/analytics/loan-metrics",
            },
        ],
        height: "hover:h-[80px]",
        full: "h-[80px]"
    },
    {
        text: "System",
        data: "1",
        subTexts: [
            {
                text: "User Management",
                active:'/icons/user-management.svg',
                inactive: '/icons/user-management-inactive.svg',
                data: "1",
                link: "/dashboard/system/user-management",
                permission:"USER_MANAGEMENT",
            },
            {
                text: "Configurations",
                active:'/icons/configurations.svg',
                inactive: '/icons/configurations-inactive.svg',
                data: "1",
                link: "/dashboard/system/configuration",
                permission:"CONFIGURATIONS",
            },
            {
                permission:"INSTITUTIONS",
                text: "Institutions",
                active:'/icons/institutions.svg',
                inactive: '/icons/institutions-inactive.svg',
                data: "1",
                link: "/dashboard/system/institutions",
            },
            {
                permission:"APPROVALS",
                text: "Approvals",
                active:'/icons/approvals.svg',
                inactive: '/icons/approvals-inactive.svg',
                data: "approvals",
                link: "/dashboard/system/approvals"
            },
        ],
        height: "hover:h-[145px]",
        1: "[50px]",
        2: "[85px]",
        3: "[120px]",
        4: "[145px]",
        5: "[170px]",
        6: "[200px]",
        7: "[230px]",
        full: "h-[145px]"
    },
    {
        text: "Agency",
        data: "2",
        height: "hover:h-[230px]",
        1: "[50px]",
        2: "[85px]",
        3: "[120px]",
        4: "[145px]",
        5: "[170px]",
        6: "[200px]",
        7: "[230px]",
        full: "h-[230px]",
        subTexts: [
            {
                text: "Agent Management",
                active:'/icons/agent-management.svg',
                inactive: '/icons/agent-management-inactive.svg',
                data: "2",
                link: "/dashboard/agency/agent-management/agents",
                permission: ["VIEW_AGENT_MANAGEMENT", "EDIT_AGENT_MANAGEMENT"]
            },
            {
                text: "Customer Management",
                active:'/icons/customer-management.svg',
                inactive: '/icons/customer-management-inactive.svg',
                data: "2",
                link: "/dashboard/agency/customer-management",
                permission: ["VIEW_CUSTOMER_MANAGEMENT", "EDIT_CUSTOMER_MANAGEMENT"]
            },
            {
                text: "Value Added Services",
                active:'/icons/value-added-services.svg',
                inactive: '/icons/value-added-services-inactive.svg',
                data: "2",
                link: "valueaddedservices",
                permission: ["VIEW_VALUE_ADDED_SERVICES", "EDIT_VALUE_ADDED_SERVICES"]
            },
            {
                text: "Transactions",
                active:'/icons/transactions.svg',
                inactive: '/icons/transactions-inactive.svg',
                data: "2",
                link: "/dashboard/agency/transactions",
                permission: ["VIEW_TRANSACTIONS", "EDIT_TRANSACTIONS"]
            },
            {
                text: "Settlement",
                active:'/icons/settlement.svg',
                inactive: '/icons/settlement-inactive.svg',
                data: "2",
                link: "/dashboard/agency/settlement",
                permission: ["VIEW_SETTLEMENTS", "EDIT_SETTLEMENTS"]
            },
            {
                text: "Reconciliation",
                active:'/icons/reconciliation.svg',
                inactive: '/icons/reconciliation-inactive.svg',
                data: "2",
                link: "/dashboard/agency/reconciliation",
                permission: ["VIEW_RECONCILATION", "EDIT_RECONCILATION"]
            },
            {
                text: "POS Terminals",
                active:'/icons/pos-terminals.svg',
                inactive: '/icons/pos-terminals-inactive.svg',
                data: "2",
                link: "/dashboard/agency/pos-terminals",
                permission: ["VIEW_POS_TERMINAL", "EDIT_POS_TERMINAL"]
            },
        ]
    },
    {
        text: "Insights and Reports",
        data: "3",
        height: "hover:h-[50px]",
        1: "[50px]",
        2: "[85px]",
        3: "[120px]",
        4: "[145px]",
        5: "[170px]",
        6: "[200px]",
        7: "[230px]",
        full: "h-[50px]",
        subTexts: [
            {
                text: "Reports",
                active:'/icons/report.svg',
                inactive: '/icons/reports-inactive.svg',
                data: "3",
                link: "reports",
                permission: ["VIEW_REPORTS", "EDIT_REPORTS"]
            },
        ]
    },
    {
        text: "Support",
        height: "hover:h-[120px]",
        1: "[50px]",
        2: "[85px]",
        3: "[120px]",
        4: "[145px]",
        5: "[170px]",
        6: "[200px]",
        7: "[230px]",
        full: "h-[120px]",
        data: "4",
        subTexts: [
            {
                text: "Ticket Management",
                active:'/icons/ticket-management.svg',
                inactive: '/icons/ticket-management-inactive.svg',
                data: "4",
                link: "/dashboard/support/ticket-management",
                permission: ["EDIT_TICKET_MANAGEMENT"]
            },
            {
                text: "Bulk Notification",
                active:'/icons/bulk-notification.svg',
                inactive: '/icons/bulk-notification-inactive.svg',
                data: "4",
                link: "/dashboard/support/bulk-notification",
                permission: ["EDIT_BULK_NOTIFICATION"]
            },
            {
                text: "Audits",
                active:'/icons/audits.svg',
                inactive: '/icons/audits-inactive.svg',
                data: "4",
                link: "/dashboard/support/audits",
                permission: ["EDIT_AUDITS"]
            },
        ]
    },
    // {
    //     text: "Loan",
    //     height: "hover:h-[85px]",
    //     full: "h-[85px]",
    //     data: "5",
    //     subTexts: [
    //         {
    //             text: "Loan Performance",
    //             active:'/icons/loan-performance.svg',
    //             inactive: '/icons/loan-performance-inactive.svg',
    //             data: "5",
    //             link: "loanperformance",
    //         },
    //         {
    //             text: "Credit Call",
    //             active:'/icons/credit-call.svg',
    //             inactive: '/icons/credit-call-inactive.svg',
    //             data: "5",
    //             link: "creditcall",
    //         },
    //     ]
    // },
]


export const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
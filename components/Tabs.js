
import inactiveAgentMetrics from '../public/icons/agent-metrics-inactive.svg'
import activeAgentMetrics from '../public/icons/agent-metrics.svg'
import agentManagementActive from '../public/icons/agent-management.svg'
import agentManagementInactive from '../public/icons/agent-management-inactive.svg'
import approvalsActive from '../public/icons/approvals.svg'
import approvalsInactive from '../public/icons/approvals-inactive.svg'
import auditsActive from '../public/icons/audits.svg'
import auditsInactive from '../public/icons/audits-inactive.svg'
import bulkNotificationActive from '../public/icons/bulk-notification.svg'
import bulkNotificationInactive from '../public/icons/bulk-notification-inactive.svg'
import configInactive from '../public/icons/configurations-inactive.svg'
import configActive from '../public/icons/configurations.svg'
import creditCallActive from '../public/icons/credit-call.svg'
import creditCallInactive from '../public/icons/credit-call-inactive.svg'
import customerManagementActive from '../public/icons/customer-management.svg'
import customerManagementInactive from '../public/icons/customer-management-inactive.svg'
import fundReqActive from '../public/icons/fund-request.svg'
import fundReqInactive from '../public/icons/fund-request-inactive.svg'
import institutionsActive from '../public/icons/institutions.svg'
import institutionsInactive from '../public/icons/institutions-inactive.svg'
import loanMetricsActive from '../public/icons/loan-metrics.svg'
import loanMetricsInactive from '../public/icons/loan-metrics-inactive.svg'
import loanPerformanceInactive from '../public/icons/loan-performance-inactive.svg'
import loanPerformanceActive from '../public/icons/loan-performance.svg'
import posActive from '../public/icons/pos-terminals.svg'
import posInactive from '../public/icons/pos-terminals-inactive.svg'
import reconActive from '../public/icons/reconciliation.svg'
import reconInactive from '../public/icons/reconciliation-inactive.svg'
import reportsInactive from '../public/icons/reports-inactive.svg'
import reportActive from '../public/icons/report.svg'
import reportInactive from '../public/icons/reports-inactive.svg'
import settlementInactive from '../public/icons/settlement-inactive.svg'
import settlementActive from '../public/icons/settlement.svg'
import TicketManagementInactive from '../public/icons/ticket-management-inactive.svg'
import TicketManagementActive from '../public/icons/ticket-management.svg'
import transactionsInactive from '../public/icons/transactions-inactive.svg'
import transactionsActive from '../public/icons/transactions.svg'
import userManagementActive from '../public/icons/user-management.svg'
import userManagementInactive from '../public/icons/user-management-inactive.svg'
import valueAddedInactive from '../public/icons/value-added-services-inactive.svg'
import valueAddedActive from '../public/icons/value-added-services.svg'
 
export const configurationCards = [
    {
        url: '../icons/config-setting.svg',
        title: "All settings",
        detail: "Explore all configuration settings on the dashboard"
    },
    {
        url: '../icons/config-bank.svg',
        title: "Transaction",
        detail: "Configure and mange all transaction activities on the platform"
    },
    {
        url: '../icons/config-security.svg',
        title: "Login & Password",
        detail: "Manage agents login and sign up passwords configurations"
    },
    {
        url: '../icons/config-student-card.svg',
        title: "Airtime",
        detail: "Manage airtime configurations and activities"
    },
    {
        url: '../icons/config-users.svg',
        title: "Commission",
        detail: "Configure how the agents and super agents  commission works "
    },
    {
        url: '../icons/config-time-forward.svg',
        title: "Wallet",
        detail: "You get to Setup and manage all direct debits here"
    },
    {
        url: '../icons/config-menu-home.svg',
        title: "Currency",
        detail: "Set your default language, currency, and timezone"
    },
    {
        url: '../icons/config-notes.svg',
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
                link: "/analytics/agent-metrics",
            },
            {
                text: "Loan Metrics",
                active:'/icons/loan-metrics.svg',
                inactive: '/icons/loan-metrics-inactive.svg',
                data: "0",
                link: "/analytics/loan-metrics",
            },
        ],
        height: "hover:h-[80px]"
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
                link: "/system/user-management",
            },
            {
                text: "Configurations",
                active:'/icons/configurations.svg',
                inactive: '/icons/configurations-inactive.svg',
                data: "1",
                link: "/system/configuration",
            },
            {
                text: "Institutions",
                active:'/icons/institutions.svg',
                inactive: '/icons/institutions-inactive.svg',
                data: "1",
                link: "/system/institutions",
            },
            {
                text: "Approvals",
                active:'/icons/approvals.svg',
                inactive: '/icons/approvals-inactive.svg',
                data: "approvals",
                link: "/system/approvals"
            },
        ],
        height: "hover:h-[145px]"
    },
    {
        text: "Agency",
        data: "2",
        height: "hover:h-[270px]",
        subTexts: [
            {
                text: "Agent Management",
                active:'/icons/agent-management.svg',
                inactive: '/icons/agent-management-inactive.svg',
                data: "agentmanagement",
            },
            {
                text: "Customer Management",
                active:'/icons/customer-management.svg',
                inactive: '/icons/customer-management-inactive.svg',
                data: "2",
                link: "customermanagement",
            },
            {
                text: "Fund Request",
                active:'/icons/fund-request.svg',
                inactive: '/icons/fund-request-inactive.svg',
                data: "2",
                link: "fundrequest",
            },
            {
                text: "Value Added Services",
                active:'/icons/value-added-services.svg',
                inactive: '/icons/value-added-services-inactive.svg',
                data: "2",
                link: "valueaddedservices",
            },
            {
                text: "Transactions",
                active:'/icons/transactions.svg',
                inactive: '/icons/transactions-inactive.svg',
                data: "2",
                link: "transactions",
            },
            {
                text: "Settlement",
                active:'/icons/settlement.svg',
                inactive: '/icons/settlement-inactive.svg',
                data: "2",
                link: "settlement",
            },
            {
                text: "Reconciliation",
                active:'/icons/reconciliation.svg',
                inactive: '/icons/reconciliation-inactive.svg',
                data: "2",
                link: "reconciliation",
            },
            {
                text: "POS Terminals",
                active:'/icons/pos-terminals.svg',
                inactive: '/icons/pos-terminals-inactive.svg',
                data: "2",
                link: "pos",
            },
        ]
    },
    {
        text: "Insights and Reports",
        data: "3",
        height: "hover:h-[50px]",
        subTexts: [
            {
                text: "Reports",
                active:'/icons/report.svg',
                inactive: '/icons/reports-inactive.svg',
                data: "3",
                link: "reports",
            },
        ]
    },
    {
        text: "Support",
        height: "hover:h-[120px]",
        data: "4",
        subTexts: [
            {
                text: "Ticket Management",
                active:'/icons/ticket-management.svg',
                inactive: '/icons/ticket-management-inactive.svg',
                data: "4",
                link: "ticketmanagement",
            },
            {
                text: "Bulk Notification",
                active:'/icons/bulk-notification.svg',
                inactive: '/icons/bulk-notification-inactive.svg',
                data: "4",
                link: "bulknotification",
            },
            {
                text: "Audits",
                active:'/icons/audits.svg',
                inactive: '/icons/audits-inactive.svg',
                data: "4",
                link: "audits",
            },
        ]
    },
    {
        text: "Loan",
        height: "hover:h-[85px]",
        data: "5",
        subTexts: [
            {
                text: "Loan Performance",
                active:'/icons/loan-performance.svg',
                inactive: '/icons/loan-performance-inactive.svg',
                data: "5",
                link: "loanperformance",
            },
            {
                text: "Credit Call",
                active:'/icons/credit-call.svg',
                inactive: '/icons/credit-call-inactive.svg',
                data: "5",
                link: "creditcall",
            },
        ]
    },
]


export const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
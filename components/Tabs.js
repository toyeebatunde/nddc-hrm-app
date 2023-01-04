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
import configBank from '../public/icons/config-bank.svg'
import configMenuHome from '../public/icons/config-menu-home.svg'
import configNotes from '../public/icons/config-notes.svg'
import configSecurity from '../public/icons/config-security.svg'
import configSetting from '../public/icons/config-setting.svg'
import configStudentCard from '../public/icons/config-student-card.svg'
import configTimeForward from '../public/icons/config-time-forward.svg'
import configUsers from '../public/icons/config-users.svg'
 
export const configurationCards = [
    {
        url: configSetting,
        title: "All settings",
        detail: "Explore all configuration settings on the dashboard"
    },
    {
        url: configBank,
        title: "Transaction",
        detail: "Configure and mange all transaction activities on the platform"
    },
    {
        url: configSecurity,
        title: "Login & Password",
        detail: "Manage agents login and sign up passwords configurations"
    },
    {
        url: configStudentCard,
        title: "Airtime",
        detail: "Manage airtime configurations and activities"
    },
    {
        url: configUsers,
        title: "Commission",
        detail: "Configure how the agents and super agents  commission works "
    },
    {
        url: configTimeForward,
        title: "Wallet",
        detail: "You get to Setup and manage all direct debits here"
    },
    {
        url: configMenuHome,
        title: "Currency",
        detail: "Set your default language, currency, and timezone"
    },
    {
        url: configNotes,
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
                active:activeAgentMetrics,
                inactive: inactiveAgentMetrics,
                data: "0",
                link: "agentmetrics",
            },
            {
                text: "Loan Metrics",
                active:loanMetricsActive,
                inactive: loanMetricsInactive,
                data: "0",
                link: "loanmetrics",
            },
        ]
    },
    {
        text: "System",
        data: "1",
        subTexts: [
            {
                text: "User Management",
                active:userManagementActive,
                inactive: userManagementInactive,
                data: "1",
                link: "usermanagement",
            },
            {
                text: "Configurations",
                active:configActive,
                inactive: configInactive,
                data: "1",
                link: "configuration",
            },
            {
                text: "Institutions",
                active:institutionsActive,
                inactive: institutionsInactive,
                data: "1",
                link: "institutions",
            },
            {
                text: "Approvals",
                active:approvalsActive,
                inactive: approvalsInactive,
                data: "approvals",
            },
        ]
    },
    {
        text: "Agency",
        data: "2",
        subTexts: [
            {
                text: "Agent Management",
                active:agentManagementActive,
                inactive: agentManagementInactive,
                data: "agentmanagement",
            },
            {
                text: "Customer Management",
                active:customerManagementActive,
                inactive: customerManagementInactive,
                data: "2",
                link: "customermanagement",
            },
            {
                text: "Fund Request",
                active:fundReqActive,
                inactive: fundReqInactive,
                data: "2",
                link: "fundrequest",
            },
            {
                text: "Value Added Services",
                active:valueAddedActive,
                inactive: valueAddedInactive,
                data: "2",
                link: "valueaddedservices",
            },
            {
                text: "Transactions",
                active:transactionsActive,
                inactive: transactionsInactive,
                data: "2",
                link: "transactions",
            },
            {
                text: "Settlement",
                active:settlementActive,
                inactive: settlementInactive,
                data: "2",
                link: "settlement",
            },
            {
                text: "Reconciliation",
                active:reconActive,
                inactive: reconInactive,
                data: "2",
                link: "reconciliation",
            },
            {
                text: "POS Terminals",
                active:posActive,
                inactive: posInactive,
                data: "2",
                link: "pos",
            },
        ]
    },
    {
        text: "Insights and Reports",
        data: "3",
        subTexts: [
            {
                text: "Reports",
                active:reportActive,
                inactive: reportInactive,
                data: "3",
                link: "reports",
            },
        ]
    },
    {
        text: "Support",
        data: "4",
        subTexts: [
            {
                text: "Ticket Management",
                active:TicketManagementActive,
                inactive: TicketManagementInactive,
                data: "4",
                link: "ticketmanagement",
            },
            {
                text: "Bulk Notification",
                active:bulkNotificationActive,
                inactive: bulkNotificationInactive,
                data: "4",
                link: "bulknotification",
            },
            {
                text: "Audits",
                active:auditsActive,
                inactive: auditsInactive,
                data: "4",
                link: "audits",
            },
        ]
    },
    {
        text: "Loan",
        data: "5",
        subTexts: [
            {
                text: "Loan Performance",
                active:loanPerformanceActive,
                inactive: loanPerformanceInactive,
                data: "5",
                link: "loanperformance",
            },
            {
                text: "Credit Call",
                active:creditCallActive,
                inactive: creditCallInactive,
                data: "5",
                link: "creditcall",
            },
        ]
    },
]


export const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
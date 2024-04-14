
import Dashboard from './components/Dashboard.jsx'
import Profile from './components/Profile.jsx'
import TableList from './components/TableList.jsx'
import NavBar from './components/Navbar.jsx'
import CryptoChart from './components/MarketPlace.jsx'
import Transactions from './components/Xerp.jsx'

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: Profile,
  },
  {
    path: "/ledger",
    name: "Ledger",
    icon: "nc-icon nc-notes",
    component: TableList,
  },
  {
    path: "/trends",
    name: "Trends",
    icon: "nc-icon nc-notes",
    component: CryptoChart,
  },
  {
    path: "/transactions",
    name: "Transactions",
    icon: "nc-icon nc-notes",
    component: Transactions,
  }
];

export default dashboardRoutes;
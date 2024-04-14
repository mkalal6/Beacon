
import Dashboard from './components/Dashboard.jsx'
import Profile from './components/Profile.jsx'
import TableList from './components/TableList.jsx'
import NavBar from './components/Navbar.jsx'

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
    path: "/table",
    name: "Ledger",
    icon: "nc-icon nc-notes",
    component: TableList,
  },
];

export default dashboardRoutes;
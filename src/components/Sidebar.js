import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust the import path

// Define your routes
const routes = [
  { path: '/dashboard', name: 'Dashboard', icon: 'fa fa-dashboard', layout: '/admin' },
  { path: '/profile', name: 'Profile', icon: 'fa fa-user', layout: '/admin' },
  // Add more routes as needed
];

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Sidebar routes={routes} color="blue" image="" />
        {/* Add your main content here */}
        <div className="main-panel">
          <Switch>
            {/* Define your routes using Route component */}
            {routes.map((route, key) => (
              <Route
                exact
                path={route.layout + route.path}
                render={(props) => (
                  <route.component {...props} />
                )}
                key={key}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";

import routes from "../routes";

function NavBar() {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

    const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
    if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
    return routes[i].name;
        }
    }
    return "Beacon";
  };
  return (
        <Nav><div class="d-flex p-2"> 
        <div>
        <a className="simple-text" href="/dashboard">
            <img class="rounded" src={"./src/assets/img/file.png"} style ={{width: "200px", height:"80px"}}alt="..." />
          </a>
        </div>
        <div class="navbar ">
              {routes.map((prop, key) => {
                if (!prop.redirect)
                  return (
                    <li
                      className={
                     prop.upgrade
                          ? "active active-pro"
                          : activeRoute(prop.layout + prop.path)
                      }
                      key={key}
                    >
                      <NavLink
                        to={prop.path}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <div class="d-flex p-2">
                        <i className={prop.icon} />
                        <p>{prop.name}</p>
                        </div>  
                      </NavLink>
                    </li>
                  );
                return null;
              })}
            </div>
    </div>
            </Nav>
  );
}

export default NavBar;
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./appContext";
import Logout from "./log/logout";

const Navbar = () => {
  const  uid  = React.useContext(UidContext);
  const userData = useSelector((state) => state.USER.user);


  return (
    <nav className="navbar">
         <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="icon" />
              <h3>Raccoont</h3>
            </div>
          </NavLink>
        </div>
      <div className="nav-container">
          <ul>
            <li className="pageJeu">
              <NavLink exact to="/homeListeJeux">
                <h5>liste jeu</h5>
              </NavLink>
            </li>
          </ul>
        {uid ? (
          <ul >
            <li className="welcome">
              <NavLink exact to="/profil">
                <h5>Bienvenue {userData.username}</h5>
              </NavLink>
            </li>
            
            <Logout />
            
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink exact to="/profil">
                <img src="./img/icons/login.svg" alt="login"/>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
          <div className="menu">
                <img src="./img/menu.png" alt="menu"/>
            </div>
    </nav>
  );
};
export default Navbar;

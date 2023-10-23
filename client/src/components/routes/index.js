import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from "react-router-dom"
// import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Home from'../../pages/home';
import Profil from'../../pages/profil';
import UserIdProfil from'../../pages/UserIdProfil';
import Listejeux from'../../pages/homeListeJeux';
import Navbar from "../Navbar";
import ListeTournois from'../../pages/homeListeTournois';
import JeuCreate from'../../pages/jeuCreate';
import Jeu from '../../pages/jeu';

const index = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profil" element = {<Profil />}></Route>
            <Route path="/profil/:userId" element={<UserIdProfil />} />
            <Route path="/homeListeJeux" element = {<Listejeux />}></Route>
            <Route path="/jeu/new" element = {<JeuCreate />}></Route>
            <Route path="/jeu/:jeuId" element = {<Jeu />}></Route>
            {/* <Route path="/homeListetournois" element = {<ListeTournois />}></Route> */}
            <Route path="/tournoi/:tournoiId" element = {<ListeTournois />}></Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
    </Router>
     
   
  );
};

export default index;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { JeuAPI } from "./actions/pjeu.actions";
import { TournoiAPI } from "./actions/tournoi.actions";
import { UserAPI } from "./actions/user.actions";
import { UidContext } from "./components/appContext";
import Routes from "./components/routes";
import { setJeuList } from "./store/jeu/jeu.reducer";
import { setTournoiList } from "./store/tournoi/tournois.reducer";
import { setUser } from "./store/user/user.reducer";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  async function getUser(uid) {
    const user = await UserAPI.getUser(uid);
    dispatch(setUser(user));
  }
  async function fetchAllJeux() {
    const jeuList = await JeuAPI.fetchAll();
    dispatch(setJeuList(jeuList));
  }
  async function fetchAllTounois() {
    const tournoiList = await TournoiAPI.fetchAll();
    // console.log(tournoiList);
    dispatch(setTournoiList(tournoiList));
  }

  useEffect(() => {
    fetchAllJeux();
    fetchAllTounois();
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
          // console.log(res.data);
          // console.log(uid);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) {
      getUser(uid);
      // console.log( uid)
    }
  }, [uid]);

  // useEffect(() => {
  //   if (uid) {getUser();
  //     console.log( uid)}
  // // console.log(uid);
  // }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;

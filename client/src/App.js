import React, { useEffect, useState } from "react";
import Routes from "./components/routes";
import { UidContext } from "./components/appContext";
import { useDispatch } from "react-redux";
import axios from "axios";
import { UserAPI } from "./actions/user.actions";
import { JeuAPI } from "./actions/pjeu.actions";
import { setJeuList } from "./store/jeu/jeu.reducer";
import { setUser } from "./store/user/user.reducer";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  // async function getUser(uid) {
  //   const user = await UserAPI.getUser(uid);
  //   dispatch(setUser(user));
  // }
  async function fetchAllJeux() {
    const jeuList = await JeuAPI.fetchAll();
    dispatch(setJeuList(jeuList));
  }
  useEffect(() => {
    fetchAllJeux();
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
          console.log(res.data);
          console.log(uid);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) {dispatch(setUser( UserAPI.getUser(uid)));
    console.log( uid)}
  }, [uid]);

console.log(uid);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;

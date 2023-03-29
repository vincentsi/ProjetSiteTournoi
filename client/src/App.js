import React, { useEffect,useState } from "react";
import Routes from "./components/routes";
import {UidContext} from "./components/appContext";
import {useDispatch} from "react-redux";
import axios from "axios";
import { getUser } from "./actions/user.actions";
import { getAllJeu } from "./actions/pjeu.actions";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getAllJeu());
  },[])
  
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
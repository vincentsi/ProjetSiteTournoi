import React from "react";
import Log from '../components/log';
import { UidContext } from "../components/appContext";
import UpdateProfil from "../components/profil/UpdateProfil";

const Profil = () => {
  const uid  = React.useContext(UidContext);
  return (
    <div className="profil-page">
      {uid ?(
        <UpdateProfil />
      ) : (
      <div className="log-container">
        <Log signin={false} signup={true} />
      </div>
      )}
    </div>
  );
}

export default Profil;

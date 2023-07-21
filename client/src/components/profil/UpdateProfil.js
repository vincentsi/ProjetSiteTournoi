import React, { useState } from "react";
import { dateParser } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.USER.user);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData.id, bio));
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <h1>Profil de {userData.username}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="user-pic" className="profile-pic" />
          <UploadImg />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {!updateForm ? (
              <>
                <p className="bio-text" onClick={() => setUpdateForm(!updateForm)}>
                  {userData.bio}
                </p>
                <button className="update-profil-btn" onClick={() => setUpdateForm(true)}>
                  Modifier bio
                </button>
              </>
            ) : (
              <>
                <textarea
                  className="bio-textarea"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button className="update-profil-btn" onClick={handleUpdate}>
                  Valider modifications
                </button>
                <button className="update-profil-btn" onClick={() => setUpdateForm(false)}>
                  Annuler
                </button>
              </>
            )}
          </div>
            <div className="date-container">
              <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
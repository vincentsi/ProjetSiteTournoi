

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPictureTournoi } from "../../actions/tournoi.actions";

const UploadTournoiImg  = ({ tournoiId,tournoiTitle }) => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();


  const handlePicture = (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("name", tournoiTitle);
    data.append("tournoiId", parseInt(tournoiId));
    data.append("file", file);

    dispatch(uploadPictureTournoi(data,parseInt(tournoiId)));
    
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file"></label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br/>
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadTournoiImg;



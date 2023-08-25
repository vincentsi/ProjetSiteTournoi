// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { uploadTournoiPicture } from "../../store/tournoi/tournois.reducer";
// import { TournoiAPI } from "../../actions/tournoi.actions";
// const UploadTournoiImg = ({ tournoiId }) => {
//     const [file, setFile] = useState();
//     const dispatch = useDispatch();
  
//     const handlePicture = async (e) => {
//       e.preventDefault();
//       const data = new FormData();
//       data.append("name", tournoiId);
//       data.append("file", file);
//       console.log(data);
//       try {
//         const response = await TournoiAPI.updateImgTournoi(tournoiId, data);
//         console.log(response);
//         // dispatch(updateTournoi(response)); // Mettre à jour le state Redux avec les nouvelles données du tournoi
//       } catch (error) {
//         console.error("Erreur lors de l'upload de l'image du tournoi :", error);
//       }
//     };
  
//     return (
//       <form action="" onSubmit={handlePicture} className="upload-pic">
//         <label htmlFor="file">Télécharger l'image du tournoi</label>
//         <input
//           type="file"
//           id="file"
//           name="file"
//           accept=".jpg, .jpeg, .png"
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//         <br />
//         <input type="submit" value="Envoyer" />
//       </form>
//     );
//   };
  
//   export default UploadTournoiImg;
  

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPictureTournoi } from "../../actions/tournoi.actions";

const UploadTournoiImg  = ({ tournoiId,tournoiTitle }) => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();

    console.log(tournoiTitle)
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



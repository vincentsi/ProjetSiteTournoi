import React from "react";
import TournoiSelec from "../components/listetournois/tournoiSelected";
import {  useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const HomeListeTournois = () => {
  const { tournoiId } = useParams();
  const tournoi = useSelector((store) =>
  store.TOURNOI.tournoiList.find((tournoi) => tournoi.id === tournoiId)
);
  return (
    <div>
      <div className="test">
     {tournoi &&<TournoiSelec tournoi={tournoi}/>}
     </div>
    </div>
    
  );
};

export default HomeListeTournois;
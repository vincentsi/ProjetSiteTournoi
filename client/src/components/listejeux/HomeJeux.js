import React, { useEffect, useState } from "react";
import { JeuAPI } from "./recuperationJeux";
import {AfficheAllJeux} from "./afficheJeux";
import {AfficheJeux} from "./afficheJeux";
import {SearchBar} from "./searchBar";
import { Navigate } from "react-router-dom";
import HomeTournois from "../listetournois/hometournois";
// import LeftNav from "../LeftNav";
// import { useDispatch, useSelector } from "react-redux";
// import { ErrorResponse } from "@remix-run/router";
// import UploadImg from "./UploadImg";


const HomeJeux = () => {
  // const jeuData = useSelector((state) => state.jeuReducer);
  const [showImg, setShowImg] = useState();
  const [showImgList, setShowImgList] = useState();
  async function jeuRecuperation(){
    const reqjeu = await JeuAPI.jeuRecuperation();
    if(reqjeu.length > 0){
      setShowImg(reqjeu[""]);
    } 
  }
  async function jeuRecuperationList(){
    const reqjeuList = await JeuAPI.jeuRecuperation();
    if(reqjeuList.length > 0){
      setShowImgList(reqjeuList);
    } 
  }
  useEffect(()=>{
      jeuRecuperation()
  },[])
  useEffect(()=>{
    jeuRecuperationList()
},[])
  console.log('***',showImg)
  // console.log(showImgList)
  async function searchJeu(jeuName) {
 
  }
  return (
    // {showImg !== undefined ? }
    
  <div className="jeux-container" 
  // style={{
      
  //     background: showImg
  //       ? "green"
  //       : "red",
  //   }} 
     >
    
 
      
        <div className="midjeu">
        {!showImg ?(
            <>
          <div className="headerJeux">
          <div className="row">
            <div className="col-4"> 
              <div>subtitle</div>
            </div>
            <div className="col-sm-12 col-md-4">
              <SearchBar onSubmit={searchJeu}/>
            </div>
          </div>
        </div>
          <div className="AffJeu">
              {showImg && <AfficheJeux affJeu={showImg}/>}
          </div>
          <div className="AffAllJeu">
            {showImgList && <AfficheAllJeux onClickItem={setShowImg}  affAllJeux={showImgList}/>}
            {/* {showImg !== undefined ? 
               <Navigate to="/homeListetournois" replace /> :console.log("imgPasClique")
                } */}

          </div>
          </>
        
        ): (  
        <div className="jeuSelec-container" >
          <div className="headerJeuSelec" >
            <div className="row">
              <div className="col-4"> 
                <div>{showImg.title}</div>
              </div>
              <div className="col-sm-12 col-md-4">
              <div className="descriptionAff">{showImg.description}</div>
            </div>
            <div className="col-4"> 
                <div>{showImg.title}</div>
              </div>
          </div>
        </div>
      <div className="midJeuSelec" >
      
    
      </div>
    </div>  
        
        )}
        </div>
        
        <div className="basjeu"> bas</div>
        
  </div>
  );
};

export default HomeJeux;

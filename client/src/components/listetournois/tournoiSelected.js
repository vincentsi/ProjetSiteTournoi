

// import { useState } from "react";
// import { TournoiAPI } from "../../actions/tournoi.actions";
import React from "react";

export function TournoiSelec({tournoi}) {
   

    return (
     
        <div class="tounois-selected-container">
          <div class="tounois-selected-header">
            <div className="row"> 
                <div className="col-4">
                    {tournoi.name} 
                </div>
            </div>
          </div>
          <div class="tounois-selected-bas">
            <h6 className="card-subtitle mb-2 text-muted">{tournoi.createdAt}</h6>
            <p className="card-text text_description">{tournoi.description}</p>
          </div>
        </div>
    );
    
  }
  export default TournoiSelec;

  
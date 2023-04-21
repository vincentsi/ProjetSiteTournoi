import React, { useState } from "react";
// import HomeJeux from "../components/listejeux/HomeJeux";
import { JeuList } from "../components/listejeux/JeuList";
import { SearchBar } from "../components/SearchBar/searchBarJeux";
import { useSelector } from "react-redux";
const HomeListeJeux = (props) => {
  const [searchText, setSearchText] = useState("");
  const jeuList = useSelector((store) => store.JEU.jeuList);
  // console.log(searchText);
  const filteredList = jeuList.filter((jeu) => {
    const containsName = jeu.name
      .toUpperCase()
      .includes(searchText.trim().toUpperCase());
    const containsDescription = jeu.description
      .toUpperCase()
      .includes(searchText.trim().toUpperCase());

    return containsName || containsDescription;
  });
  console.log(filteredList)
  return (
    <>
      <div className="row justify-content-center mb-5">
        <div className="col-sm-12 col-md-4">
          <SearchBar
            placeholder="Search your game..."
            onTextChange={setSearchText}
          />
        </div>
      </div>
      <JeuList jeuList={filteredList} />
    </>
  );
};

export default HomeListeJeux;

import React, { useState } from "react";
// import HomeJeux from "../components/listejeux/HomeJeux";
import { JeuList } from "../components/listejeux/JeuList";
import { SearchBar } from "../components/SearchBar/searchBarJeux";
import { useSelector } from "react-redux";

const HomeListeJeux = (props) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchText, setSearchText] = useState("");

  const jeuList = useSelector((store) => store.JEU.jeuList);

  // console.log(searchText);
  const filteredList = jeuList.filter((jeu) => {
    const containsName = jeu.title
      .toUpperCase()
      .includes(searchText.trim().toUpperCase());
    const containsDescription = jeu.description
      .toUpperCase()
      .includes(searchText.trim().toUpperCase());
    const matchesGenre =
      selectedGenre === "" || jeu.genres.includes(selectedGenre);

    return (containsName || containsDescription) && matchesGenre;
  });
  const genreOptions = [
    { value: "", label: "All Genres" },
    { value: "Action", label: "Action" },
    { value: "Aventure", label: "Aventure" },
    { value: "rpg", label: "rpg" },
    { value: "moba", label: "moba" },
    { value: "combat", label: "combat" },
  ];
  console.log(filteredList);
  return (
    <div
    // className="background-image-jeux"
    // style={{ backgroundImage: `url(./img/homeImg/fond.jpeg)` }}
  >
      <div className="row justify-content-center mb-5 jp_top">
        <div className="col-sm-12 col-md-4">
          <SearchBar
            placeholder="Search your game..."
            onTextChange={setSearchText}
          />
        </div>
        <div className="col-sm-12 col-md-1">
          <div className="mb-3">
            <label htmlFor="genreSelect">Select Genre:</label>
            <select
              id="genreSelect"
              className="form-select"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {genreOptions.map((genre) => (
                <option key={genre.value} value={genre.value}>
                  {genre.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <JeuList jeuList={filteredList} />
    </div>
  );
};

export default HomeListeJeux;

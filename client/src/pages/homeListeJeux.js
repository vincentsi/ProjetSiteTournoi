import React, { useState, useEffect } from "react";
// import HomeJeux from "../components/listejeux/HomeJeux";
import { useSelector } from "react-redux";
import { JeuList } from "../components/listejeux/JeuList";
import { SearchBar } from "../components/SearchBar/searchBarJeux";
import { ButtonPrimary } from "../components/ButtonPrimary/ButtonPrimary";
import { UserAPI } from "../actions/user.actions";
import { useNavigate } from "react-router-dom";

const HomeListeJeux = (props) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const jeuList = useSelector((store) => store.JEU.jeuList);
  const userData = useSelector((store) => store.USER.user);
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est admin
  useEffect(() => {
    const checkAdminRole = async () => {
      if (userData.id) {
        try {
          const userRoles = await UserAPI.getUserRoles(userData.id);
          const isAdminRole = userRoles.includes("admin");
          setIsAdmin(isAdminRole);
        } catch (error) {
          console.error("Erreur lors de la vérification du rôle admin:", error);
        }
      }
    };

    checkAdminRole();
  }, [userData.id]);

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
    { value: "MOBA", label: "MOBA" },
    { value: "FPS", label: "FPS" },
    { value: "Sport", label: "Sport" },
    { value: "Combat", label: "Combat" },
    { value: "Auto-chess", label: "Auto-chess" },
    { value: "Aventure", label: "Aventure" },
  ];

  return (
    <div className="HomeListeJeux-container">
      <div className="jp_top">
        <div className="controls-grid">
          <div className="search-container">
            <SearchBar
              placeholder="Rechercher votre jeu favori..."
              onTextChange={setSearchText}
            />
          </div>

          <div className="genre-select-container">
            <label htmlFor="genreSelect" className="genre-label">
              Genre
            </label>
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

          {isAdmin && (
            <button
              className="create-game-btn"
              onClick={() => navigate("/jeu/new")}
            >
              ✨ Créer un jeu
            </button>
          )}
        </div>
      </div>
      <JeuList jeuList={filteredList} />
    </div>
  );
};

export default HomeListeJeux;

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
        {isAdmin && (
          <div className="col-sm-12 col-md-3 d-flex align-items-end">
            <ButtonPrimary
              onClick={() => navigate("/jeu/new")}
              style={{
                background: "linear-gradient(135deg, #ff4757, #ff3838)",
                width: "50%",
                fontSize: "14px",
                fontWeight: "500",
                padding: "10px 20px",
                color: "white",
                border: "none",
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(255, 71, 87, 0.3)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px) scale(1.05)";
                e.target.style.boxShadow = "0 6px 20px rgba(255, 71, 87, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 4px 15px rgba(255, 71, 87, 0.3)";
              }}
            >
              Créer un jeu
            </ButtonPrimary>
          </div>
        )}
      </div>
      <JeuList jeuList={filteredList} />
    </div>
  );
};

export default HomeListeJeux;

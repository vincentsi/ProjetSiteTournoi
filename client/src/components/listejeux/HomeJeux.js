import { useState } from "react";
// import { Trash as TrashIcon } from "reac/t-bootstrap-icons";

export function HomeJeux({
  title,
  picture,
  subtitle,
  description,
  onClickTrash,
  onClick,
  showAdminButtons,
}) {
  const [isCardHovered, setIsCardHovered] = useState(false);

  const handleCardClick = (e) => {
    if (e.target.closest(".admin-buttons")) {
      return;
    }
    onClick();
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Empêcher la propagation vers onClick
    if (onClickTrash) {
      onClickTrash();
    }
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className="jeux-container"
      style={{ borderColor: isCardHovered ? "#0d6efd" : "transparent" }}
    >
      <div className="name_row">
        <img alt={title} className="listejeu_img" src={picture}></img>
        <h5 className="listejeu_name">{title}</h5>
      </div>

      {showAdminButtons && (
        <div
          className="admin-buttons"
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            display: "flex",
            gap: "8px",
            opacity: isCardHovered ? 1 : 0.7,
            transition: "opacity 0.3s ease",
          }}
        >
          <button
            onClick={handleDeleteClick}
            className="admin-delete-btn"
            style={{
              background: "linear-gradient(135deg, #ff4757, #ff3838)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "8px 12px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              boxShadow: "0 4px 15px rgba(255, 71, 87, 0.3)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
            title="Supprimer le jeu"
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px) scale(1.05)";
              e.target.style.boxShadow = "0 6px 20px rgba(255, 71, 87, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.boxShadow = "0 4px 15px rgba(255, 71, 87, 0.3)";
            }}
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
}
export default HomeJeux;

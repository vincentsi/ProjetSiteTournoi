import { useState } from "react";
// import { Trash as TrashIcon } from "reac/t-bootstrap-icons";

export function HomeJeux({ title, picture, subtitle, description, onClickTrash, onClick }) {
  
  const [isCardHovered, setIsCardHovered] = useState(false);
  return (
    
    <div
      onClick={onClick}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className="jeux-container"
      style={{ borderColor: isCardHovered ? "#0d6efd" : "transparent" }}
    >

      <div className="name_row">
      <img alt={title} className="listejeu_img" src={picture}></img>
        <h5 className="listejeu_name">{title}</h5>
      </div>
    </div>
  );
}
export default HomeJeux;

import { useState } from "react";
import { Trash as TrashIcon } from "react-bootstrap-icons";

export function HomeJeux({ title, subtitle, content, onClickTrash, onClick }) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isTrashHovered, setIsTrashHovered] = useState(false);

  function onClickTrash_(e) {
    onClickTrash();
    e.stopPropagation();
  }
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className="card jeux-container"
      style={{ borderColor: isCardHovered ? "#0d6efd" : "transparent" }}
    >
      <div className="card-body">
        <div className="title_row">
          <h5 className="card-title">{title}</h5>
          <TrashIcon
            size={20}
            onMouseEnter={() => setIsTrashHovered(true)}
            onMouseLeave={() => setIsTrashHovered(false)}
            style={{ color: isTrashHovered ? "#FF7373" : "#b8b8b8" }}
            onClick={onClickTrash_}
          />
        </div>
        <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
        <p className="card-text text_content">{content}</p>
      </div>
    </div>
  );
}
export default HomeJeux;

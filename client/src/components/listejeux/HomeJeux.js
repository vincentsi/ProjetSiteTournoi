import { useState } from "react";
// import { Trash as TrashIcon } from "reac/t-bootstrap-icons";

export function HomeJeux({ name, picture, subtitle, description, onClickTrash, onClick }) {
  
  const [isCardHovered, setIsCardHovered] = useState(false);
  // const [isTrashHovered, setIsTrashHovered] = useState(false);
  
  // function onClickTrash_(e) {
  //   onClickTrash();
  //   e.stopPropagation();
  // }
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className="jeux-container"
      style={{ borderColor: isCardHovered ? "#0d6efd" : "transparent" }}
    >

      <div className="name_row">
      <img alt={name} className="listejeu_img" src={picture}></img>
        <h5 className="listejeu_name">{name}</h5>
          {/* <TrashIcon
            size={20}
            onMouseEnter={() => setIsTrashHovered(true)}
            onMouseLeave={() => setIsTrashHovered(false)}
            style={{ color: isTrashHovered ? "#FF7373" : "#b8b8b8" }}
            onClick={onClickTrash_}
          /> */}
      </div>
    </div>
  );
}
export default HomeJeux;

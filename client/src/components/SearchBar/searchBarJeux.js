import { Search as SearchIcon } from "react-bootstrap-icons";

export function SearchBar({ placeholder, onTextChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="inputSearchBar"
        onChange={(e) => onTextChange(e.target.value)}
        placeholder={placeholder}
      />
      <SearchIcon size={20} className="iconSearchBar" />
    </div>
  );
}
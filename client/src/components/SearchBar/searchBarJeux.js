import { Search as SearchIcon } from "react-bootstrap-icons";
export function SearchBar({ placeholder, onTextChange }) {
  return (
    <>
      <SearchIcon size={25} className="iconSearchBar" />
      <input
        type="text"
        className="inputSearchBar"
        onChange={(e) => onTextChange(e.target.value)}
        placeholder={placeholder}
      />
    </>
  );
}
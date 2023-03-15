import { Search as SearchIcon} from "react-bootstrap-icons"

export function SearchBar({ onSubmit }) {
    function submit(e) {
      if (e.key === "Enter" && e.target.value.trim() !== "") {
        console.log("***", e.target.value);
        onSubmit(e.target.value);
      }
    }
    return (
    <>
    <SearchIcon size={27} className="rechercheIcon"/>
    <input 
        onKeyUp={submit}
        type="text" 
        placeholder="cherche un jeu"
        className="inputRechercheJeu"
    />
    
    </>
    );
}
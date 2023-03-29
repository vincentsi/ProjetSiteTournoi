
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

export function Jeu(props) {
  const { jeuId } = useParams();
  const [searchParams] = useSearchParams();
  const jeu = useSelector((store) =>
    store.JEU.jeuList.find((jeu) => jeu.id === jeuId)
  );
  return <>{searchParams.get("truc")}</>;
}
export default Jeu;
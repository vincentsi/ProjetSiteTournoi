import axios from "axios";

export class JeuAPI {
    static async jeuRecuperation(){
        const response = await axios.get(`${process.env.REACT_APP_API_URL}app/jeux/all`)
        
        return response.data;
    }
}
import PokemonDetails from "../Components/PokemonDetails/PokemonDetails";
import { Routes, Route } from "react-router-dom";
import Pokedex from "../Components/Pokedex/Pokedex";

function CustomRoutes() {
  return (
      <Routes>
        <Route path="/" element= {<Pokedex />}/>
        <Route path="/pokemon/:id" element= {<PokemonDetails />}/>
      </Routes>
  )
}
export default CustomRoutes

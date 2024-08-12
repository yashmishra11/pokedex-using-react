import Search from "../Search/Search";
import './Pokedex.css'
import PokemonList from "../PokemonList/PokemonList";
import { useState } from "react";

function Pokedex() {
  const [ search, setSearch] = useState("");
  return (
    <div className="pokedex-wrapper">
        <Search search ={search} setSearch={setSearch}/>
        <PokemonList search={search}/>
    </div>
  )
}


export default Pokedex;

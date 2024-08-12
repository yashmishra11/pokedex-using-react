import { useEffect, useState } from "react";
import axios from 'axios';
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon.jsx";
const PokemonList = ({search}) => {

  const [pokemonListState, setPokemonListState] = useState ({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon/",
    nextUrl: '',
    prevUrl: '',
  })

async function downloadPokemons() {

  // setIsLoading(true);
  setPokemonListState((state) => ({...state, isLoading: true }));
    const response = await axios.get(pokemonListState.pokedexUrl);
    //downloads list of 20 pokemons.
    // console.log(response);
    const pokemonResult = response.data.results; //get array of pokemons from result

    // console.log(response.data);
    // setNextUrl(response.data.next);

    setPokemonListState((state) => ({...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous
    }));


    // setPrevUrl(response.data.previous);
    
    // console.log(pokemonResult);


       /*
            iterating over the array of pokemons, and using their url, to create an array of promises
            that will download those 20 pokemons.  
        */
    const pokemonResultPromise = pokemonResult.map((pokemon) =>
        axios.get(pokemon.url))
        // console.log(pokemonResultPromise)
        // passing that promise array to axios.all 
        const pokemonData = await axios.all(pokemonResultPromise) // might use promise.all in place of axios.all
        // console.log(pokemonData);
        // now iterate on the data of each pokemon, and extract id ,name ,image and types.
        const pokeListResult =  pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;

            // console.log(pokemon);
            return {
                id: pokemon.id, 
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default, 
                types: pokemon.types
            }
        });
        
        // console.log(pokeListResult);
        // setPokemonList(pokeListResult);

        setPokemonListState((state) => ({...state, pokemonList: pokeListResult, isLoading: false}));

        // setIsLoading(false);
}

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl])

  const filteredPokemonList = pokemonListState.pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase()) );

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
      {(pokemonListState.isLoading) ? 'loading...' : filteredPokemonList.map((p) => (<Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
    )}
    </div>
    <div className="controls">
      {/* <button disabled={prevUrl == null} onClick={() => setPokedexUrl(prevUrl)}>Prev</button> */}

      <button disabled={pokemonListState.prevUrl == null} onClick={() => setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.prevUrl})} >Prev</button>

      {/* <button disabled={nextUrl == null} onClick={() => setPokedexUrl(nextUrl)}>Next</button> */}

      <button disabled={pokemonListState.nextUrl == null} onClick={() => setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.nextUrl})} >Next</button>

    </div>
  </div>
  )
}

export default PokemonList;
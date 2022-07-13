import React, { useEffect, useState } from 'react';

import PokemonThumbnail from './PokemonThumbnail';

function App() {

  const [allPokemon, setAllPokemon] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=50');

  const getAllPokemon = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject (result) {
      result.forEach ( async (pokemon) => {
        const res = await fetch(pokemon.url);
        const data = await res.json();

        setAllPokemon(currentList => [...currentList, data]);
      })
      
    }

    createPokemonObject(data.results);
  }

  useEffect(() => {
    getAllPokemon();
  }, [])

  return (
    <div className="app-container">
      <div style={{"text-align": "center"}}>
        <h1 style={{"text-align": "center"}}>The Pokédex</h1>
        <small><a href="https://www.flaticon.com/free-icons/pokemon" title="pokemon icons" style={{"text-align": "center"}}>Pokeball icons created by Nikita Golubev - Flaticon</a></small>
        <br />
      </div>
      <div className="pokemon-container">
        <div className="all-container">
          { allPokemon.sort((a, b) => a.id - b.id).map((pokemon, index) => 
          <PokemonThumbnail 
            id={pokemon.id} 
            name={pokemon.name}
            image={pokemon.sprites.other['official-artwork'].front_default}
            type1={pokemon.types[0].type.name}
            type2={pokemon.types[1] ? pokemon.types[1].type.name : undefined}
            key={index}
          />
          )}

        </div>
        <button className="load-more" onClick={getAllPokemon}>Load more</button>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { Cards } from "./components/card";
import { PokemonProps } from "./types/card-types";
import { Pagination } from "./components/next-page";

export default function App() {
  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [navBar, setNavBar] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const fetchLimit = 50;
  const totalPokemons = 1025;

  const getSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNavBar(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    async function fetchAllPokemons() {
      if (loading) return;
      setLoading(true);

      const pokemonList: PokemonProps[] = [];

      for (let id = 1; id <= totalPokemons; id++) {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}/`
          );
          const data = await response.json();
          pokemonList.push(data);
        } catch (error) {
          console.error(`Erro ao carregar o Pokémon ${id}:`, error);
        }
      }

      setPokemons(pokemonList);
      setLoading(false);
    }

    fetchAllPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredPokemons = navBar
    ? pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(navBar.toLowerCase())
      )
    : pokemons;

  const pokemonsPerPage = fetchLimit;
  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  return (
    <div className="dark:bg-gray-800">
      <header className="bg-red-500 text-white py-4 mb-6">
        <div className="container mx-5">
          <input
            onChange={getSearch}
            value={navBar}
            placeholder="Pesquise aqui"
            className="border-3 border-gray-400 p-2"
          />
        </div>
      </header>

      {loading ? (
        <p className="text-center text-white">Carregando Pokémons...</p>
      ) : (
        <>
          <div className="flex flex-wrap dark:text-white gap-5">
            {currentPokemons.map((pokemon) => (
              <Cards
                key={pokemon.id}
                sprites={pokemon.sprites}
                name={pokemon.name}
                stats={pokemon.stats}
                types={pokemon.types}
              />
            ))}
          </div>

          {/* Paginação */}
          {filteredPokemons.length > pokemonsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}

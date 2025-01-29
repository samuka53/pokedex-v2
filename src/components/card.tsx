import { PokemonProps } from "../types/card-types";

const typeColors: Record<string, string> = {
  normal: "bg-gray-400 text-white",
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  electric: "bg-yellow-400 text-black",
  grass: "bg-green-500 text-white",
  ice: "bg-cyan-300 text-black",
  fighting: "bg-red-700 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-yellow-600 text-white",
  flying: "bg-indigo-300 text-black",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-500 text-black",
  rock: "bg-gray-600 text-white",
  ghost: "bg-indigo-700 text-white",
  dragon: "bg-purple-700 text-white",
  dark: "bg-gray-900 text-white",
  steel: "bg-gray-500 text-white",
  fairy: "bg-pink-300 text-black",
};

export function Cards({ sprites, name, types, stats }: PokemonProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 max-w-xs shadow-md">
      <img
        src={sprites.front_default}
        alt={name}
        className="w-full h-32 object-contain rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold capitalize">{name}</h3>

      {/* Tipos do Pokémon */}
      <div className="flex gap-2 mt-2">
        {types.map((typeObj) => (
          <span
            key={typeObj.type.name}
            className={`px-2 py-1 text-sm rounded ${
              typeColors[typeObj.type.name] || "bg-gray-200 text-black"
            }`}
          >
            {typeObj.type.name}
          </span>
        ))}
      </div>

      {/* Status do Pokémon */}
      <div className="mt-3">
        {stats.map((statObj) => (
          <div key={statObj.stat.name} className="flex justify-between text-sm">
            <span className="capitalize">{statObj.stat.name}:</span>
            <span className="font-semibold">{statObj.base_stat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

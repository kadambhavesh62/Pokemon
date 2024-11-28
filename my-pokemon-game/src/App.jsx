import { useEffect, useState } from "react";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [ClickedPokemon, setClickedPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const fetchPokemon = async () => {
    const pokemonList = [];
    for (let i = 1; i <= 12; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await response.json();
      pokemonList.push({
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
      });
    }
    setPokemon(pokemonList);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleClick = (id) => {
    if (ClickedPokemon.includes(id)) {
      setClickedPokemon([]);
      setScore(0);
      alert("Game Over");
    } else {
      setClickedPokemon([...ClickedPokemon, id]);
      setScore(score + 1);
      setBestScore(Math.max(bestScore, score + 1));

      if (score + 1 === 12) {
        alert("You've won!");
        setClickedPokemon([]);
        setScore(0);
      }
    }

    setPokemon(shuffleArray(pokemon));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500 p-4">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center text-center bg-black/70 p-4 sm:p-6 rounded-2xl w-full max-w-3xl">
        <h1 className="font-mono font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Pokemon Memory Game
        </h1>
        <div className="text-lg sm:text-xl md:text-2xl text-white">
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-4xl">
        {pokemon.map((p) => (
          <div
            className="bg-white rounded-lg shadow-lg p-2 sm:p-4 cursor-pointer transform hover:scale-105 transition-transform"
            key={p.id}
            onClick={() => handleClick(p.id)}
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto"
            />
            <p className="text-center mt-2 text-sm sm:text-base md:text-lg font-medium">
              {p.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

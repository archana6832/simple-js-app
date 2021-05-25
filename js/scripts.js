// To IIFE to avoid accidentally accessing the global state.
let pokemonRepository = (function () {
  let pokemonList = [
    {name: "Squirtle", height: 1, types: ["water"]},
    {name: "Charizard" , height: 1.7, types: ["fire","flying"]},
    {name: "Charmander", height: .6, types: ["fire"]}
  ];

  function getAll(){
    return pokemonList;
  }
  function add(item){
    pokemonList.push(item);
  }
  return{
    getAll: getAll,
    add: add
  }
})();

  //to write the name of the pokemon.
pokemonRepository.getAll().forEach(function(pokemon){
  //to find out the tallest pokemon
  if (pokemon.height >1){
    document.write(`Pokemon Name: ${pokemon.name} (Height: ${pokemon.height}) - Wow, that\'s big!`);
    document.write("<br>");
    document.write("<br>");
  }else {
    document.write(`Pokemon Name: ${pokemon.name} (Height: ${pokemon.height})`);
    document.write("<br>");
    document.write("<br>");
  }
});

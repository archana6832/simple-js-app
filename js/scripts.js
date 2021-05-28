// To IIFE to avoid accidentally accessing the global state.
let pokemonRepository = (function () {
  let repository = [
    {name: "Squirtle", height: 1, types: ["water"]},
    {name: "Charizard" , height: 1.7, types: ["fire","flying"]},
    {name: "Charmander", height: .6, types: ["fire"]}
  ];

  function getAll(){
    return repository;
  }
  //to add new pokemons in the repository
  function add(pokemon) {
     if (
       typeof pokemon === "object" &&
       "name" in pokemon &&
       "height" in pokemon &&
       "types" in pokemon
     ) {
       repository.push(pokemon);
     } else {
       console.log("pokemon is not correct");
     }
   }

   //to Create buttons  for pokemons in the webpage
  function  addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    //to add an event listener to the button just above created
    //button.addEventListener('click', function (event) {
    //showDetails(pokemon);
    //});
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);

    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', buttonNameDetails);
  }

  //to add an event listener to the button just above created
 function buttonNameDetails(button, pokemon) {
 showDetails(pokemon);
   }
  //to show the details of the pokemon selected with buttons
  function showDetails(pokemon){
   console.log(pokemon);
  }
// to return all the required variables
  return{
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    buttonNameDetails: buttonNameDetails
  }
})();

  // to work with each item in the repository
pokemonRepository.getAll().forEach(function(pokemon){
  //to write the name of the pokemon on the buttons
  pokemonRepository.addListItem(pokemon);
});

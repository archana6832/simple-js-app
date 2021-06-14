// To create  IIFE to avoid accidentally accessing the global state.
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll() {
    return pokemonList;
  }
  //to add new pokemons in the repository
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      /* eslint-disable no-console */
      console.log("pokemon is not correct");
      /* eslint-enable no-console */
    }
  }

  //to Create buttons  for pokemons in the webpage
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-lg", "btn-info", "btn-block");
    button.setAttribute("data-target", "#exampleModal");
    button.setAttribute("data-toggle", "modal");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    //event listener
    button.addEventListener("click", function() {
      showDetails(pokemon);
    });
  }

  //  load the List of the pokemons from API (A promise function)
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          /* eslint-disable no-console */
          console.log(pokemon);
          /* eslint-enable no-console */
        });
      })
      .catch(function(e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      });
  }

  //to load the details of the pokemos from api
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        item.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
      })
      .catch(function(e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      });
  }

  //to show the details of the pokemon selected with buttons
  function showDetails(pokemon) {
    //to load the pokemon details from api
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  // to create a modal to show the details of the pokemon Bootstrap modal
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + item.name + "</h1>");
    let imageElement = $('<img class="modal-img" style="width:40%">');
    imageElement.attr("src", item.imageUrl);
    let heightElement = $("<p>" + "Height : " + item.height + "</p>");
    let weightElement = $("<p>" + "Weight : " + item.weight + "</p>");
    let typesElement = $("<p>" + "Type : " + item.types + "</p>");
    let abilitiesElement = $("<p>" + "Abilities : " + item.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  // to return all the required variables
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

// to work with each item in the repository
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

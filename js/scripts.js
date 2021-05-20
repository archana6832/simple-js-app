let pokemonList = [
          {name: "Squirtle", height: 1, types: ["water"]},
          {name: "Charizard" , height: 1.7, types: ["fire","flying"]},
          {name: "Charmander", height: .6, types: ["fire"]}
          ];

           //to write the name of the pokemon.
          for(let i=0; i < pokemonList.length; i++){

              //to find out the tallest pokemon
            if (pokemonList[i].height >1){
              document.write(`Pokemon Name: ${pokemonList[i].name} (Height: ${pokemonList[i].height}) - Wow, that\'s big!`);
              document.write("<br>");
              document.write("<br>");
              }

              else {

            document.write(`Pokemon Name: ${pokemonList[i].name} (Height: ${pokemonList[i].height})`);
            document.write("<br>");
            document.write("<br>");
          }
}

let globalPokemon = [];
const mainContainer = document.querySelector('.main-container');
const searchInput = document.querySelector('#search-input');


const cleanView = () => {
    mainContainer.innerHTML = '';
}

searchInput.addEventListener('keyup', () => {
    const inputText = searchInput.value;
    let globalPokemon2 = searchByName(inputText);
    cleanView();
    renderPokemons(globalPokemon2);
    console.log(globalPokemon2);
});

const searchByName = (searchingParameter) => {
    const filteredPokemon = globalPokemon.filter((pokemon)=> {
        if(pokemon.name.includes(searchingParameter)) {
            return pokemon;
        }
    });
    return filteredPokemon;
}

async function getPokemons() {
    try{
           

        //Consultar la API
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        // Consumir la API en un formato que pueda procesar (JSON)
        const responseJson = await response.json();
        console.log(responseJson);
       
        // No me sirve toooodo lo que tiene la API, solo
        //quiero los results
        const pokemons = responseJson.results;
        // console.log(pokemons);

        for (let i = 0; i < pokemons.length; i++) {
            //Me voy a crear una variable temporal para cada
            //uno de los pokemons
            const pokemon = pokemons[i];
            // console.log(pokemon);
        
            //Necesito capturar la URL
            const pokemonUrl = pokemon.url;
            // console.log(pokemonUrl);
            //Consultar la API
            const response = await fetch(pokemonUrl);
            // Consumir la API en un formato que pueda procesar (JSON)
            const responseJson = await response.json();


            normalizePokemons(pokemon.name, responseJson);
        }
    }
    catch(error) {
        console.log(error);
    }
}

const normalizePokemons = (name, responseJson) => {
    const img = responseJson.sprites.other['official-artwork'].front_default;
    const pokemon = {
        name: name,
        img: img,
        type:responseJson.types

    };
    // console.log(pokemon.type);
    globalPokemon.push(pokemon);
}



const renderPokemonCard = (responseJson) => {
      let types = responseJson.type.map(
        (type)=> `<p>${type.type.name}</p>`
    );
    types = types.join("");
    // console.log(types);

    const cardPokemonDiv = document.createElement('div');
    cardPokemonDiv.classList = 'card';
    cardPokemonDiv.innerHTML = `
                    <h2>${responseJson.name}</h2>
                    <img src='${responseJson.img}' />
                    <div>${ types}</div>
                    `;
    mainContainer.appendChild(cardPokemonDiv);
}


const renderPokemons = (array) => {
   
    for (let i = 0; i < array.length; i++) { 
        renderPokemonCard(array[i]);
    }
}

(async () => {
    await getPokemons();
    renderPokemons(globalPokemon);
})();

 //intento de paginacion
        // const pagination = (responseJson) => {
        //     let prev = responseJson.previous ? <a href="${obj.previous}">&laquo;</a> : "";
        //     let next = responseJson.next ? <a href="${obj.next}">&raquo;</a> : "";
        //     return ${prev} ${next};
        //   };
        
// Llamar a la API
const requestAPI = async (id) => {
        const BaseURL = `https://pokeapi.co/api/v2/pokemon/`;
        const query = `${id}`
        
        const response = await fetch(BaseURL + query)
        .then(response => response.json())
        .catch(reject => console.error(reject))
        
        return response;
}

// Elementos de HTML
const form = document.getElementById("form");
const input = document.getElementById("input");
const card = document.querySelector(".cardContainer");
const msgError = document.querySelector(".msgError");

let pokemones = JSON.parse(localStorage.getItem("pokemones")) || [];

const saveLocalStorage = (pokemonList) =>{
    localStorage.setItem("pokemones", JSON.stringify(pokemonList))
}




const getPokemon = async e => {
  e.preventDefault();
  const inputPokemon = input.value;
  const fetchedPokemon = await requestAPI(inputPokemon);

  if(!fetchedPokemon){
    msgError.textContent = "No existe ese Pokemon"
    return;
  }



  if(!inputPokemon){
    msgError.textContent = "Ingresa un número de Pokemon"
    return;
  }else if(pokemones.some(pokemon => pokemon.id === fetchedPokemon.id)){
    msgError.textContent = "Ya estas viendo este Pokemon"
    return;
  }

  // if (pokemones.some(pokemon => pokemon.types[0].type.name === fetchedPokemon.types[0].type.name)){
  //   poke.style.background = "#3C9950";
  // }

  pokemones = [fetchedPokemon, ... pokemones];
  msgError.textContent = "";
  renderCard(pokemones);
  saveLocalStorage(pokemones);
  form.reset();
}


const renderCard = pokemonList => {
    card.innerHTML = pokemonList.map(pokemon => createHTML(pokemon)).join("");
}


// Funciones para convertir peso y altura
const convertHeight = metro =>{
    let altura = metro / 10;
    return altura;
}

const convertWeight = kilos =>{
    let peso = kilos / 10;
    return peso;
}

let colorPokemon = {
  electric: "#FFEA70",
  normal: "#B09398",
  fire: "#FF675C",
  water: "#0596C7",
  ice: "#AFEAFD",
  rock: "#999799",
  flying: "#7AE7C7",
  grass: "#4A9681",
  psychic: "#FFC6D9",
  ghost: "#561D25",
  bug: "#A2FAA3",
  poison: "#795663",
  ground: "#D2B074",
  dragon: "#DA627D",
  steel: "#1D8A99",
  fighting: "#2F2F2F",
  fairy: "#da625d",
  dark: "#808080",
  default: "#2A1A1F",
}


const createHTML = pokemon =>{
    const imgPokemon = pokemon.sprites.front_default;
    const typePokemon = pokemon.types[0].type.name;
    return `
    <div class="cardPokemon" style="background-color: ${colorPokemon[typePokemon]}">
    <p class="numero">${pokemon.id}</p>
    <img src="${imgPokemon}" class="img-pokemon" alt="Pokemon"/>
    <h2 class="pkmName">${pokemon.name}</h2>
    <p class="type">Tipo: ${pokemon.types[0].type.name}</p>
    <p class="altura">Altura: ${convertHeight(pokemon.height)} Mts</p>
    <p class="peso">Peso: ${convertWeight(pokemon.weight)} Kgs</p>
    </div>`
}

const init = () => {
  renderCard(pokemones); 
  form.addEventListener("submit", getPokemon);
}

init();
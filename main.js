// Llamar a la API
const requestAPI = async (id) => {
        const BaseURL = `https://pokeapi.co/api/v2/pokemon/`;
        const query = `${id}`
        
        const response = await fetch(BaseURL + query);
    
        const data = await response.json();
        return data;
}

// Elementos de HTML
const form = document.getElementById("form");
const input = document.getElementById("input");
const card = document.querySelector(".cardContainer");
const msgError = document.querySelector(".msgError")

let pokemones = JSON.parse(localStorage.getItem("pokemones")) || [];

const saveLocalStorage = (pokemonList) =>{
    localStorage.setItem("pokemones", JSON.stringify(pokemonList))
}




const getPokemon = async e => {
  e.preventDefault();
  const inputPokemon = input.value;
  const fetchedPokemon = await requestAPI(inputPokemon);

  if(fetchedPokemon === ""){
    alert("No existe ese Pokemon");
  }



  if(!inputPokemon){
    msgError.textContent = "Ingresa un número de Pokemon"
    return;
  }else if(pokemones.some(pokemon => pokemon.id === fetchedPokemon.id)){
    msgError.textContent = "Ya estas viendo este Pokemon"
    return;
  }
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


const createHTML = pokemon =>{
    const imgPokemon = pokemon.sprites.other.dream_world.front_default
    return `
    <div class="cardPokemon">
    <img src="${imgPokemon}" alt="Pokemon" />
    <h2 class="pkmName">${pokemon.name}</h2>
    <p class="type">Tipo: ${pokemon.types[0].type.name}</p>
    <p>Altura: ${convertHeight(pokemon.height)}</p>
    <p>Peso: ${convertWeight(pokemon.weight)}</p>
    </div>`
}

const init = () => {
  renderCard(pokemones); 
  form.addEventListener("submit", getPokemon);
}

init();
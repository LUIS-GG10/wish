const URL_B= 'https://pokeapi.co/api/v2/'


const FetchPoke= async(pokemon)=>{
    try{
        const response = await fetch(`${URL_B}pokemon/${pokemon}`)
        const ParsedResponse= await response.json()
        return ParsedResponse
    }catch (e){
        console.log(`Ingrese un pokemon valido ${e}`)
    }
}

document.getElementById('Get-P')
    .addEventListener('click',async()=>{
        const text= document.getElementById("inputPoke").value
        const MinText=text.toLowerCase()
        const pokemon = await FetchPoke(MinText)
        localStorage.setItem("pokemonId", pokemon.id)
        console.log(pokemon)
    })

document.addEventListener('DOMcontentLoaded',async()=>{
    const StoredID=localStorage.getItem("pokemonId")
    const initialId= StoredID? parseInt(StoredID) : 1
    const pokemon = await FetchPoke(initialId)
    console.log(pokemon.name)
})


document.getElementById('GET-N')
    .addEventListener('click', async()=>{
        const CurrentPI= parseInt(localStorage.getItem("pokemonId"))
        const Newid=Math.max(1,CurrentPI +1)
        const pokemon = await FetchPoke(Newid)
        localStorage.setItem("pokemonId", Newid)
        console.log(pokemon.name)
    })

    document.getElementById('GET-A')
    .addEventListener('click', async()=>{
        const CurrentPI= parseInt(localStorage.getItem("pokemonId"))
        const Newid=Math.max(1,CurrentPI -1)
        const pokemon = await FetchPoke(Newid)
        localStorage.setItem("pokemonId", Newid)
        console.log(pokemon.name)
    })




    const CARD_SECTION = document.getElementById('profiles');


    const createCard = () => {
        const card = document.createElement('div');
        card.classList.add('profile', 'container');
        return card;
    }
    
    
    const createDescription = () => {
        const userElements = {
            id: document.createElement('h2'),
            name: document.createElement('h3'),
            height: document.createElement('h4'),
            weight: document.createElement('h4'),
        }
        return userElements;
    }
    
    const populateElements = (pokemon, pokeElements) => {
        pokeElements.id.textContent = `ID: ${pokemon.id}`;
        pokeElements.name.textContent = `Nombre: ${pokemon.name}`;
        pokeElements.height.textContent = `Altura: ${pokemon.height}`;
        pokeElements.weight.textContent = `Peso: ${pokemon.weight}`;
    
        return pokeElements;
    }
    
    const createAndDisplayPokemonCard = async () => {
        const storedPokemonId = localStorage.getItem("pokemonId");
    
            const pokemon = await FetchPoke(storedPokemonId); 
    
                const card = createCard();
                const pokeElements = createDescription();
    
                const elementsWithData = populateElements(pokemon, pokeElements);
    
                // Agregar elementos a la tarjeta
                card.append(elementsWithData.id, elementsWithData.name, elementsWithData.height, elementsWithData.weight);
    
                // Agregar la tarjeta al contenedor de perfiles
                CARD_SECTION.append(card);
            }
    

    document.addEventListener('DOMContentLoaded', () => {
        createAndDisplayPokemonCard();
    });
    document.getElementById('CPC')
    .addEventListener('click', async () => {
        createAndDisplayPokemonCard();
    });
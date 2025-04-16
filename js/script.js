//Fetch Pokemon Data
const fetchPokeData = async (pokemonName) => {
    //Error Handling
    try {
        // Ensure input isn't case sensitive
        const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        const pokeData = await pokeResponse.json();
        return pokeData;
    } catch (error) {
        console.error(`Failed to capture...`, error);
    }
};

//Allows Interactivity with HTML Page
document.addEventListener("DOMContentLoaded", () => {
    const pokeInputEle = document.getElementById("pokeInput");
    const pokeInfoEle = document.getElementById("pokeInfo");
    const searchButton = document.getElementById("PokeInfoBtn");
    //Responding to the Button
    searchButton.addEventListener("click", async () => {
        //Removes the whitespaces in the str
        const pokemonName = pokeInputEle.value.trim();
        if (!pokemonName) {
            //Display a Window to Alert User
            alert("Please enter a Pokémon name!");
        }

        const pDataFetcher = await fetchPokeData(pokemonName);

        try{
            //Display Pokémon Data from API data
            pokeInfoEle.innerHTML = `
                <h2>${pDataFetcher.name}</h2>
                <h3>Sprites</h3>
                <img src="${pDataFetcher.sprites.front_default}" alt="${pDataFetcher.name}">
                <img src="${pDataFetcher.sprites.front_shiny}" alt="${pDataFetcher.name}">
                <h3>Type</h3>
                <p>${pDataFetcher.types.map(type => type.type.name).join(", ")}</p>
                <h3>Abilities</h3>
                <ul>
                    ${pDataFetcher.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
                </ul>
                <h3>Base Experience</h3>
                <p>${pDataFetcher.base_experience}</p>
                <h3>Base Stats</h3>
                 <ul>
                    ${pDataFetcher.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                </ul>
            `;
        }catch(error){
            pokeInfoEle.innerHTML = `<p>That Pokemon doesn't exist... Please try again!</p>`;
        }
    });
});
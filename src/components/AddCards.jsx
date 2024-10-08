

async function addCards(search, setNewCards, setIsLoading, setSearchSubmitted, setSearch) {

    console.log(search);

    const regex = /^[a-zA-Z0-9 '-]*$/; // Accepted characters

    // Fetching Pokemon Cards from user input text - "search"
    if (regex.test(search) && search != ""){ // Testing to make sure only regex characters are being used

        // Set loading state to true
        setIsLoading(true); 

        let response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${search}`);
        let data = await response.json();

        // Set the new cards data to the state
        setNewCards(data.data);  
        // Set the input field (search) to empty
        setSearch("");
        // Set loading state to false after the fetch is completed
        setIsLoading(false);
    } else {
        console.log("Invalid characters being used...");
    }

    setSearchSubmitted(true); 
}

export default addCards;
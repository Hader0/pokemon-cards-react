import { useState } from "react";
import '../styles/searchCard.css';

import CardList from './CardList';

function SearchCard() {

    const [search, setSearch] = useState("");
    const [newCards, setNewCards] = useState([]);
    const [searchSubmitted, setSearchSubmitted] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);


    function handleInputChange(event) {
        setSearch(event.target.value);
    }

    async function addCards() {

        console.log(search);

        const regex = /^[a-zA-Z0-9]*$/; // Alphanumeric characters


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
        console.log(newCards);
    }

    return (
        <>
            {/* Page title */}
            <div className="titleCard">
                <h1 className="titleCardText">Pokemon Trading Cards</h1>
            </div>
            <div className="inputButtonSection">

                {/* Input field */}
                <input
                    className="inputField"
                    type="text" 
                    placeholder="Enter a Pokemon..." 
                    value={search}
                    onChange={handleInputChange}
                />
                {/* Submit button */}
                <button className="buttonSubmit" onClick={addCards}>Search</button>
            </div>
                
            
            {/* Display the loading spinner when loading */}
            {isLoading && <div className="loading">Loading...</div>}

            <div className="cardResults">

                {searchSubmitted && <CardList newCards={newCards} />}
            </div>
        </>
    )
}

export default SearchCard;
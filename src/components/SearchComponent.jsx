import { useEffect, useState } from "react";
import '../styles/searchCard.css';

import CardList from './CardList';

function SearchCard() {

    const [search, setSearch] = useState("");
    const [newCards, setNewCards] = useState([]);
    const [searchSubmitted, setSearchSubmitted] = useState(false); 
    const [isLoading, setIsLoading] = useState(false); // Add loading state 
    const [filter, setFilter] = useState("");  // Add filter state
    const [filteredCards, setFilteredCards] = useState([]);  // Filtered cards state


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

    // Handle Enter key press on input field
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            addCards();  // Call addCards function when Enter is pressed
        }
    }

    // Handle filter selection change
    function handleFilterChange(event) {
        setFilter(event.target.value);  // Update the filter value
    }

    // Effect to apply the filter on newCards whenever filter changes
    useEffect(() => {
        if (newCards.length > 0) {
            let sortedCards = [...newCards];  // Make a copy of the cards array

            if (filter === "price") {
                // Sort by price in descending order
                sortedCards.sort((a, b) => {
                    const priceA = a.cardmarket?.prices?.averageSellPrice || 0;
                    const priceB = b.cardmarket?.prices?.averageSellPrice || 0;
                    return priceB - priceA;
                });
            } else if (filter === "alphabetical") {
                // Sort alphabetically by name
                sortedCards.sort((a, b) => a.name.localeCompare(b.name));
            } else if (filter === "rarity") {
                // Sort by rarity alphabetically
                sortedCards.sort((a, b) => a.rarity.localeCompare(b.rarity));
            }

            setFilteredCards(sortedCards);  // Set the sorted cards
        }
    }, [filter, newCards]);  // Run effect when filter or newCards change

    return (
        <>
            <div className="titleSearchComponent">
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
                        onKeyPress={handleKeyPress} // Detect Enter key press
                        onChange={handleInputChange}
                    />
                    <div className="submitFilterButtons">
                        {/* Submit button */}
                        <button className="buttonSubmit" onClick={addCards}>Search</button>

                        {/* Filter dropdown */}
                        <select className="filterSelect" value={filter} onChange={handleFilterChange}>
                            <option value="">Filter</option>
                            <option value="price">Price</option>
                            <option value="alphabetical">Name</option>
                            <option value="rarity">Rarity</option>
                        </select>
                    </div>
                </div>
            </div>
                
            
            {/* Display the loading text when loading */}
            {isLoading && <div className="loading">Loading...</div>}

            <div className="cardResults">

                {searchSubmitted && <CardList newCards={filteredCards} />}
            </div>
        </>
    )
}

export default SearchCard;
import { useEffect, useState } from "react";
import '../styles/searchCard.css';

import CardList from './CardList';
import addCards from "./AddCards";

function SearchCard() {
    const [search, setSearch] = useState("");
    const [newCards, setNewCards] = useState([]); // Initialize as an empty array
    const [searchSubmitted, setSearchSubmitted] = useState(false); 
    const [isLoading, setIsLoading] = useState(false); 
    const [filter, setFilter] = useState("");  
    const [filteredCards, setFilteredCards] = useState([]);  

    function handleInputChange(event) {
        setSearch(event.target.value);
    }

    // Handle Enter key press on input field
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            addCards(search, setNewCards, setIsLoading, setSearchSubmitted, setSearch);
        }
    }

    // Handle filter selection change
    function handleFilterChange(event) {
        setFilter(event.target.value);
    }

    // Effect to apply the filter on newCards whenever filter changes
    useEffect(() => {
        if (Array.isArray(newCards) && newCards.length > 0) { // Check if newCards is an array
            let sortedCards = [...newCards];  

            if (filter === "price") {
                sortedCards.sort((a, b) => {
                    const priceA = a.cardmarket?.prices?.averageSellPrice || 0;
                    const priceB = b.cardmarket?.prices?.averageSellPrice || 0;
                    return priceB - priceA;
                });
            } else if (filter === "alphabetical") {
                sortedCards.sort((a, b) => a.name.localeCompare(b.name));
            } else if (filter === "rarity") {
                sortedCards.sort((a, b) => a.rarity.localeCompare(b.rarity));
            }

            setFilteredCards(sortedCards);  
        }
    }, [filter, newCards]); 

    return (
        <>
            <div className="titleSearchComponent">
                <div className="titleCard">
                    <h1 className="titleCardText">Pokemon Trading Cards</h1>
                </div>
                <div className="inputButtonSection">
                    <input
                        className="inputField"
                        type="text" 
                        placeholder="Enter a Pokemon..." 
                        value={search}
                        onKeyPress={handleKeyPress}
                        onChange={handleInputChange}
                    />
                    <div className="submitFilterButtons">
                        <button className="buttonSubmit" onClick={() => addCards(search, setNewCards, setIsLoading, setSearchSubmitted, setSearch)}>Search</button>
                        <select className="filterSelect" value={filter} onChange={handleFilterChange}>
                            <option value="">Filter</option>
                            <option value="price">Price</option>
                            <option value="alphabetical">Name</option>
                            <option value="rarity">Rarity</option>
                        </select>
                    </div>
                </div>
            </div>

            {isLoading && <div className="loading">Loading...</div>}

            <div className="cardResults">
                {searchSubmitted && <CardList newCards={filteredCards} />} {/* Pass filtered cards */}
            </div>
        </>
    )
}

export default SearchCard;

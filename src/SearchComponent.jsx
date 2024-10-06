import { useState } from "react";
import './styles/searchCard.css';

function SearchCard() {

    const [search, setSearch] = useState("");
    const [newCards, setNewCards] = useState([]);

    function handleInputChange(event) {
        setSearch(event.target.value);
    }

    async function addCards() {

        console.log(search);

        let response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${search}`);
        let data = await response.json();

        // Set the new cards data to the state
        setNewCards(data.data);  
        // Set the input field (search) to empty
        setSearch("");

        console.log(newCards);

    }

    return (
        <>
            <h1 className="title">Pokemon Trading Cards</h1>
            <div className="inputButtonSection">
                <input
                    className="inputField"
                    type="text" 
                    placeholder="Enter a Pokemon..." 
                    value={search}
                    onChange={handleInputChange}
                />
                <button className="buttonSubmit" onClick={addCards}>Search</button>
            </div>
                

            <div className="cardResults">
                {newCards.length > 0 && newCards.map((card, index) => (
                    <div key={index} className="cardSingle">
                        <h3 className="cardTitle">{card.name}</h3>
                        <h5 className="rarity">{card.rarity}</h5>
                        {/* Displaying the image of the card */}
                        <img src={card.images.small} alt={card.name} />
                        {/* Displaying the card price, multiplied by 1.61 */}
                        {card.cardmarket && card.cardmarket.prices ? (
                            <h4 className="price">Price: ${(card.cardmarket.prices.averageSellPrice * 1.61).toFixed(2)}</h4>
                        ) : (
                            <h4 className="price">Price: Not available</h4>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

export default SearchCard;
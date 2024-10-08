import { useState } from 'react';
import starIcon from '../assets/star.png';
import starIcon2 from '../assets/star2.png';

function CardList({ newCards }) {
    // State to track which card is being hovered
    const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

    if (newCards.length > 0) {
        return newCards.map((card, index) => (
            <div
                key={index}
                className="cardSingle"
                onMouseOver={() => setHoveredCardIndex(index)} // Set hover state to this card's index
                onMouseOut={() => setHoveredCardIndex(null)}   // Reset hover state when not hovering
            >
                {/* Displaying the Card's Pokemon name */}
                <h3 className="cardTitle">{card.name}</h3>

                {/* Displaying the Card's Pokemon rarity */}
                <h5 className="rarity">{card.rarity}</h5>

                {/* Displaying the image of the card */}
                <img src={card.images.small} alt={card.name} />

                <div className="priceFavourite">
                    {/* Displaying the card price, multiplied by 1.61 */}
                    {card.cardmarket && card.cardmarket.prices ? (
                        <>
                            <h4 className="price">
                                Price: ${(card.cardmarket.prices.averageSellPrice * 1.61).toFixed(2)}
                            </h4>
                            {/* Display different star icon depending on hover state */}
                            <img
                                src={hoveredCardIndex === index ? starIcon2 : starIcon} // Check if the current card is being hovered
                                alt="Favourite"
                                className="favouriteIcon"
                            />
                        </>
                    ) : (
                        <>
                            <h4 className="priceNull">Price Not Available</h4>
                            {/* Display different star icon depending on hover state */}
                            <img
                            src={hoveredCardIndex === index ? starIcon2 : starIcon} // Check if the current card is being hovered
                            alt="Favourite"
                            className="favouriteIcon"
                            />
                        </>
                    )}
                </div>
            </div>
        ));
    } else {
        // For when there are no objects in the newCards (state) array
        return (
            <h4 className="invalidEntry">
                TIP: You have not entered a valid Pokémon, please make sure that only alphanumeric characters are being used...
            </h4>
        );
    }
}

export default CardList;

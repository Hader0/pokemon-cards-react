import { useState } from 'react';
import starIcon from '../assets/star.png';
import starIcon2 from '../assets/star2.png';

function CardList({ newCards }) {
    const [mouseOver, setMouseOver] = useState(null);  // To track hovered card
    const [favouriteCards, setFavouriteCards] = useState([]); // State for favourite cards

    // Function to handle adding/removing favourites
    const handlefavouriteClick = (card) => {
        setFavouriteCards((prevfavourites) => {
            // Check if the card is already in the favourites
            const isfavourite = prevfavourites.some(favCard => favCard.id === card.id);

            // If already favourite, remove it, otherwise, add it
            if (isfavourite) {
                console.log(favouriteCards);
                return prevfavourites.filter(favCard => favCard.id !== card.id);
            } else {
                console.log(favouriteCards);
                return [...prevfavourites, card];
            }
        });
    };

    if (newCards.length > 0) {
        return newCards.map((card, index) => {
            // Check if the current card is a favourite inside the map
            const isFavourite = favouriteCards.some(favCard => favCard.id === card.id);

            return (
                <div key={index} className="cardSingle">
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

                                <button
                                    className={`favouriteButton ${isFavourite ? 'favouriteActive' : ''}`}
                                    onMouseOver={() => setMouseOver(index)} 
                                    onMouseOut={() => setMouseOver(null)}
                                    onClick={() => handlefavouriteClick(card)} // Click to toggle favourite
                                >
                                    <img 
                                        src={mouseOver === index ? starIcon : (isFavourite ? starIcon2 : starIcon)}
                                        className="favouriteIcon"
                                        alt="Favourite Icon" // Added alt for accessibility
                                    />
                                </button>

                            </>
                        ) : (
                            <h4 className="priceNull">Price Not Available</h4>
                        )}
                    </div>
                </div>
            );
        });
    } else {
        return (
            <h4 className="invalidEntry">
                TIP: You have not entered a valid Pokémon, please make sure that only alphanumeric characters are being used...
            </h4>
        );
    }
}

export default CardList;
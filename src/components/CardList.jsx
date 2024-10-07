function CardList({ newCards }) {
    if (newCards.length > 0) {
        return newCards.map((card, index) => (
            <div key={index} className="cardSingle">
                {/* Displaying the Card's Pokemon name */}
                <h3 className="cardTitle">{card.name}</h3>

                {/* Displaying the Card's Pokemon rarity */}
                <h5 className="rarity">{card.rarity}</h5>

                {/* Displaying the image of the card */}
                <img src={card.images.small} alt={card.name} />

                {/* Displaying the card price, multiplied by 1.61 */}
                {card.cardmarket && card.cardmarket.prices ? (
                    <h4 className="price">Price: ${(card.cardmarket.prices.averageSellPrice * 1.61).toFixed(2)}</h4>
                ) : (
                    <h4 className="priceNull">Price Not Available</h4>
                )}
            </div>
        ));
    } else { // For when  there are no objects in the newCards (state) array
        return (
            <h4 className="invalidEntry">
                TIP: You have not entered a valid Pokémon, please make sure that only alphanumeric characters are being used...
            </h4>
        );
    }
}

export default CardList;
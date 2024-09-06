
function getImageURL(card: string) {
    return new URL(`../assets/cards/${card}.png`, import.meta.url).toString();
}

function loadCardImages(cards: string[]) {
    return Promise.all(cards.map(getImageURL));
}

export { getImageURL, loadCardImages };
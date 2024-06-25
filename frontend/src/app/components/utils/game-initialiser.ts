import { Suit } from '../card/card_enums';
import { Card } from '../card/card_objects';

export function initializeRandomHands(): {
  topPlayerHand: Card[];
  bottomPlayerHand: Card[];
  deck: Card[];
} {
  const validRanks = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
  const suits = Object.values(Suit);
  const allCards: Card[] = [];

  // Create all possible cards
  validRanks.forEach((rank) => {
    suits.forEach((suit) => {
      allCards.push({ rank, suit, selected: false });
    });
  });

  // Shuffle the cards
  for (let i = allCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
  }

  // Deal the hands
  const topPlayerHand = allCards.slice(0, 4);
  const bottomPlayerHand = allCards.slice(4, 8);
  const deck = allCards.slice(8);

  return { topPlayerHand, bottomPlayerHand, deck };
}

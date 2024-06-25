import { Suit } from './card_enums';

export interface Card {
  rank: number;
  suit: Suit;
  selected: boolean;
}

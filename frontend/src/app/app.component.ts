import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Suit } from './components/card/card_enums';
import { Card } from './components/card/card_objects';
import { HandComponent } from './components/hand/hand.component';
import { NgIf } from '@angular/common';
import { initializeRandomHands } from './components/utils/game-initialiser';
import { DeckComponent } from './components/deck/deck.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DeckComponent, RouterOutlet, HandComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  topPlayerHand: Card[] = [];
  bottomPlayerHand: Card[] = [];
  deck: Card[] = [];
  discarded: Card[] = [];

  topPlayerHidden: boolean = true;
  bottomPlayerHidden: boolean = false;
  switchingPlayers: boolean = false;
  areCardsSelectableForMus: boolean = false;

  get bottomPlayerSelectable() {
    return this.areCardsSelectableForMus && !this.bottomPlayerHidden;
  }

  get topPlayerSelectable() {
    return this.areCardsSelectableForMus && !this.topPlayerHidden;
  }

  ngOnInit(): void {
    const { topPlayerHand, bottomPlayerHand, deck } = initializeRandomHands();
    this.topPlayerHand = topPlayerHand;
    this.bottomPlayerHand = bottomPlayerHand;
    this.deck = deck;
  }

  async switchHands() {
    this.switchingPlayers = true;
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 3000);
    });
    this.topPlayerHidden = !this.topPlayerHidden;
    this.bottomPlayerHidden = !this.bottomPlayerHidden;
    this.switchingPlayers = false;
  }

  acceptMus() {
    this.areCardsSelectableForMus = true;
  }

  discard() {
    this.discardCards(this.bottomPlayerHidden);
    this.areCardsSelectableForMus = false;
  }

  updateSelectedCardsForDiscard(selectedCards: Card[]) {}

  discardCards(topPlayer: boolean = true) {
    const cards = topPlayer
      ? this.topPlayerHand.filter((card) => card.selected)
      : this.bottomPlayerHand.filter((card) => card.selected);
    const discardedCards = new Set(cards);

    this.discarded.push(...cards);
    const newCards = this.deck.splice(0, cards.length);

    if (topPlayer) {
      this.topPlayerHand = this.updateHand(
        this.topPlayerHand,
        discardedCards,
        newCards
      );
    } else {
      this.bottomPlayerHand = this.updateHand(
        this.bottomPlayerHand,
        discardedCards,
        newCards
      );
    }
  }

  updateHand(
    hand: Card[],
    discardedCards: Set<Card>,
    newCards: Card[]
  ): Card[] {
    return [...hand.filter((card) => !discardedCards.has(card)), ...newCards];
  }

  printCards(cards: Card[]) {
    cards.forEach((c) =>
      console.log(`rank ${c.rank} - suit ${c.suit} - selected ${c.selected}`)
    );
  }
}

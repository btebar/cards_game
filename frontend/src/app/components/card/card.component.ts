import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Suit } from './card_enums';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() suit: Suit = Suit.oro;
  @Input() rank: number = 1;
  @Input() hidden: boolean = false;
  @Input() selectable: boolean = false;

  @Output() selectedChange = new EventEmitter<boolean>();

  selected: boolean = false;

  get canBeDiscarded() {
    return this.selectable;
  }

  get suitImage(): string {
    const imagePath = '../../../assets/'; // Adjust this path if needed
    switch (this.suit) {
      case Suit.oro:
        return imagePath + 'gold.png';
      case Suit.copa:
        return imagePath + 'cups.png';
      case Suit.espada:
        return imagePath + 'spades.png';
      case Suit.basto:
        return imagePath + 'clubs.png';
      default:
        return ''; // Handle the case where the suit is invalid
    }
  }

  selectForDiscard() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }
}

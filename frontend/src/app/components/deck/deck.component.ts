import { Component, Input } from '@angular/core';
import { Card } from '../card/card_objects';
import { CardComponent } from '../card/card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [CardComponent, NgFor],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css',
})
export class DeckComponent {
  @Input() cards: Card[] = [];

  calculateTransform(index: number, totalCards: number): string {
    const px = (-180 / totalCards) * (index < 10 ? index : 10);
    return `translate(${px}px, ${px}px)`;
  }
}

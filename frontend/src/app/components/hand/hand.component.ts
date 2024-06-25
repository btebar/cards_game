import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Card } from '../card/card_objects';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-hand',
  standalone: true,
  imports: [CardComponent, NgFor],
  templateUrl: './hand.component.html',
  styleUrl: './hand.component.css',
})
export class HandComponent {
  @Input() cards: Card[] = [];

  @Input() isHidden: boolean = false;

  @Input() selectable: boolean = false;

  @Output() selectedCardsChange = new EventEmitter<Card[]>();

  onCardSelectedChange(card: Card, isSelected: boolean) {
    card.selected = isSelected;
    this.selectedCardsChange.emit(this.cards.filter((c) => c.selected));
  }
}

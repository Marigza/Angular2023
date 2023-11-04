import { Component, Input } from '@angular/core';

import { SearchItem } from '../../models/search-item.model';

@Component({
  selector: 'yta-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() public card!: SearchItem;
}

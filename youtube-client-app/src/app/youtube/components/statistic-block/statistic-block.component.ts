import { Component, Input } from '@angular/core';

import { SearchItem } from '../../models/search-item.model';

@Component({
  selector: 'yta-statistic-block',
  templateUrl: './statistic-block.component.html',
  styleUrls: ['./statistic-block.component.scss'],
})
export class StatisticBlockComponent {
  @Input() public card!: SearchItem;
}

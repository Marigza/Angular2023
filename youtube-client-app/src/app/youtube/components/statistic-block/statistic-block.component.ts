import { Component, Input, OnInit } from '@angular/core';

import { SearchItem } from '../../models/search-item.model';
import { StatisticView } from '../../models/statistic-view.model';

@Component({
  selector: 'yta-statistic-block',
  templateUrl: './statistic-block.component.html',
  styleUrls: ['./statistic-block.component.scss'],
})
export class StatisticBlockComponent implements OnInit {
  @Input() public card!: SearchItem;

  public arrayStatistic: StatisticView[] = [];

  public ngOnInit(): void {
    if (this.card) {
      this.createArr();
    }
  }

  public createArr(): void {
    this.arrayStatistic = [
      {
        view: this.card.statistics.viewCount,
        color: 'primary',
        icon: 'visibility',
      },
      {
        view: this.card.statistics.likeCount,
        color: 'warn',
        icon: 'thumb_up',
      },
      {
        view: this.card.statistics.dislikeCount,
        color: 'accent',
        icon: 'thumb_down',
      },
      {
        view: this.card.statistics.commentCount,
        color: '',
        icon: 'forum',
      },
    ];
  }

  /* eslint-disable class-methods-use-this */

  public trackByIndex(index: number): number {
    return index;
  }

  /* eslint-enable class-methods-use-this */
}

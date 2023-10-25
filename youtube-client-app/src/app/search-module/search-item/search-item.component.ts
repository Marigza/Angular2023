import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ButtonComponent } from '../../shared/components/button/button.component';
import { SearchItem } from '../search-item.model';

@Component({
  selector: 'yta-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatIconModule, ButtonComponent],
})
export class SearchItemComponent {
  @Input() public title: SearchItem['snippet']['title'] = '';

  @Input() public image: SearchItem['snippet']['thumbnails']['medium']['url'] = '';

  @Input() public publishedAt: SearchItem['snippet']['publishedAt'] = '';

  @Input() public statistics: SearchItem['statistics'] = {
    viewCount: '',
    likeCount: '',
    dislikeCount: '',
    favoriteCount: '',
    commentCount: '',
  };
}

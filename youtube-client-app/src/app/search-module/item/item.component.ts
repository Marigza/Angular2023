import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ButtonComponent } from '../../shared/components/button/button.component';
import { ColoringDirective } from '../../shared/directives/coloring.directive';
import { SearchItem } from '../../shared/models/search-item.model';

@Component({
  selector: 'yta-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, ButtonComponent, ColoringDirective],
})
export class ItemComponent {
  @Input() public card!: SearchItem;
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '../shared/components/button/button.component';
import { ItemComponent } from './components/item/item.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { StatisticBlockComponent } from './components/statistic-block/statistic-block.component';
import { ColoringDirective } from './directives/coloring.directive';
import { MaterialModule } from './material.module';
import { AdminComponent } from './pages/admin/admin.component';
import { DetailedInfoPageComponent } from './pages/detailed-info-page/detailed-info-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { YoutubeRoutingModule } from './youtube-routing.module';

@NgModule({
  declarations: [
    MainPageComponent,
    SearchResultsComponent,
    ItemComponent,
    DetailedInfoPageComponent,
    StatisticBlockComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    MaterialModule,
    YoutubeRoutingModule,
    ColoringDirective,
  ],
})
export class YoutubeModule {}

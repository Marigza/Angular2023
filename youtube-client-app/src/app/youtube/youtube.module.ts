import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ItemComponent } from './components/item/item.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { MainPageComponent } from './main-page/main-page.component';
import { YoutubeRoutingModule } from './youtube-routing.module';

@NgModule({
  declarations: [MainPageComponent, SearchResultsComponent],
  imports: [CommonModule, ItemComponent, YoutubeRoutingModule],
})
export class YoutubeModule {}

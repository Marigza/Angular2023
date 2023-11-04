import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MainPageComponent } from './main-page/main-page.component';
import { YoutubeRoutingModule } from './youtube-routing.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, YoutubeRoutingModule],
})
export class YoutubeModule {}

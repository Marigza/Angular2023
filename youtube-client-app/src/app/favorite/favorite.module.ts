import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from '../shared/components/button/button.component';
import { FavoriteComponent } from './component/favorite/favorite.component';
import { FavoriteRoutingModule } from './favorite-routing.module';
import { MatetialModule } from './material.module';

@NgModule({
  declarations: [FavoriteComponent],
  imports: [CommonModule, MatetialModule, FavoriteRoutingModule, ButtonComponent],
})
export class FavoriteModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { cardsFeatureKey, customCardReducer } from '../redux/reducers/cards.reducer';
import { ButtonComponent } from '../shared/components/button/button.component';
import { CoreRoutingModule } from './core-routing.module';
import { FilterBlockComponent } from './filter-block/filter-block.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent, FilterBlockComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreRoutingModule,
    ButtonComponent,
    StoreModule.forFeature(cardsFeatureKey, customCardReducer),
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '../shared/components/button/button.component';
import { CoreRoutingModule } from './core-routing.module';
import { FilterBlockComponent } from './filter-block/filter-block.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent, FilterBlockComponent],
  imports: [CommonModule, ReactiveFormsModule, CoreRoutingModule, ButtonComponent],
  exports: [HeaderComponent],
})
export class CoreModule {}

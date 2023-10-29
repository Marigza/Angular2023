import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from '../shared/components/button/button.component';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, CoreRoutingModule, ButtonComponent],
  exports: [HeaderComponent],
})
export class CoreModule {}

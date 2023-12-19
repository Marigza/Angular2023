import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, CoreRoutingModule, MaterialModule],
  exports: [HeaderComponent],
})
export class CoreModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from '../shared/components/button/button.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatetialModule } from './matetial.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, MatetialModule, AuthRoutingModule, ButtonComponent],
})
export class AuthModule {}

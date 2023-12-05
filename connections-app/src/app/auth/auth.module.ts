import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from './material.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [SignupComponent, SigninComponent],
  exports: [SignupComponent, SigninComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule, MaterialModule],
})
export class AuthModule {}

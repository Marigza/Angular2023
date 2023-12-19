import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpConnectionsInterceptor } from './core/interceptors/http-connections.interceptor';
import { SharedModule } from './shared/shared.module';
import { GroupsEffects } from './store/effects/groups.effects';
import { PeopleEffects } from './store/effects/people.effects';
import { ProfileEffects } from './store/effects/profile.effects';
import { profileReducer } from './store/reducers/profile.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot({ connectionStore: profileReducer }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([ProfileEffects, GroupsEffects, PeopleEffects]),
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConnectionsInterceptor,
      multi: true,
    },
    MatSnackBarModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

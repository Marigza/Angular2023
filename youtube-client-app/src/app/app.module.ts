import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ButtonComponent } from './shared/components/button/button.component';
import { ItemComponent } from './youtube-module/item/item.component';
import { SearchResultsComponent } from './youtube-module/search-results/search-results.component';

@NgModule({
  declarations: [AppComponent, SearchResultsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ItemComponent,
    ButtonComponent,
    HttpClientModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

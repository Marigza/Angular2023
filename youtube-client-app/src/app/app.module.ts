import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { SearchItemComponent } from './search-module/search-item/search-item.component';
import { SearchResultsComponent } from './search-module/search-results/search-results.component';
import { ButtonComponent } from './shared/components/button/button.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SearchResultsComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SearchItemComponent, ButtonComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

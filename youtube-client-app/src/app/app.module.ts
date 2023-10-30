import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ItemComponent } from './search-module/item/item.component';
import { SearchResultsComponent } from './search-module/search-results/search-results.component';
import { ButtonComponent } from './shared/components/button/button.component';

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

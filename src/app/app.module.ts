import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokeListComponent } from './poke-list/poke-list.component';
import { PokeTileComponent } from './poke-tile/poke-tile.component';
import { PokeDetailsComponent } from './poke-details/poke-details.component';

@NgModule({
  declarations: [AppComponent, PokeListComponent, PokeTileComponent, PokeDetailsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokeDetailsComponent } from './poke-details/poke-details.component';
import { PokeListComponent } from './poke-list/poke-list.component';

const routes: Routes = [
  { path: '', component: PokeListComponent },
  { path: 'detail/:id', component: PokeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

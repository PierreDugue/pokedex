import { Component, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { PokemonList } from '../pokemon.model';
import { PokedexService } from '../services/pokedex.service';

const LIMIT = 20;

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  $pokemonList: Observable<PokemonList> = of();

  constructor(private pokeService: PokedexService) {}

  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList(): void {
    this.$pokemonList = this.pokeService.getPokemonList();
  }

  pageChange(next: string): void {
    console.log('event', event);
    this.$pokemonList = this.pokeService.getPokemonList(next);
  }
}

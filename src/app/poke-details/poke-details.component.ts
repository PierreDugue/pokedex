import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { MoveDetails, PokemonDetails } from '../pokemon.model';
import { PokedexService } from '../services/pokedex.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.scss'],
})
export class PokeDetailsComponent implements OnInit {
  constructor(
    private pokeService: PokedexService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  pokemonDetails: PokemonDetails = {
    id: 0,
    name: '',
    base_experience: 0,
    height: 0,
    is_default: false,
    order: 0,
    weight: 0,
    moves: [],
    stats: [],
  };
  moveDetails: MoveDetails[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.getDetails(param['id']);
    });
  }

  getDetails(id: string): void {
    this.pokeService
      .getPokemonDetails(id)
      .pipe(take(1))
      .subscribe((res: PokemonDetails) => {
        this.pokemonDetails = res;
      });
  }

  getMoveDetails(url: string): Observable<MoveDetails> {
    return this.pokeService.getMove(this.parseId(url));
  }

  parseId(url: string): string {
    return url.split('/')[6];
  }

  goBackToList(): void {
    this.location.back();
  }
}

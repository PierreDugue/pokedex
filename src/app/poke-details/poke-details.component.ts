import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap, tap } from 'rxjs';
import { MoveDetails, PokemonDetails } from '../pokemon.model';
import { PokedexService } from '../services/pokedex.service';

@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.scss'],
})
export class PokeDetailsComponent implements OnInit {
  constructor(
    private pokeService: PokedexService,
    private route: ActivatedRoute
  ) {}
  $pokemonDetails: Observable<PokemonDetails> = of();
  $moveDetails: Observable<MoveDetails> = of();

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.getDetails(param['id']);
    });
  }

  getDetails(id: string): void {
    this.$pokemonDetails = this.pokeService.getPokemonDetails(id);

    this.pokeService
      .getPokemonDetails(id)
      .subscribe((x) => console.log('x', x));
  }

  getMoveDetails(url: string): Observable<MoveDetails> {
    return this.pokeService.getMove(this.parseId(url));
  }

  parseId(url: string): string {
    return url.split('/')[6];
  }
}

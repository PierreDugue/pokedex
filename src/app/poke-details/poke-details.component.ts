import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Move, PokemonDetails, Stats } from '../pokemon.model';
import { PokedexService } from '../services/pokedex.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeDetailsComponent implements OnInit {
  constructor(
    private pokeService: PokedexService,
    private route: ActivatedRoute,
    private location: Location,
    private cdr: ChangeDetectorRef
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

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.getDetails(param['id']);
    });
  }

  getDetails(id: string): void {
    this.pokeService
      .getPokemonDetails(id)
      .pipe(take(1))
      .subscribe({
        next: (pokeDetails: PokemonDetails) => {
          this.pokemonDetails = pokeDetails;
          this.cdr.detectChanges();
        },
        error: (error) => console.log(error),
      });
  }

  goBackToList(): void {
    this.location.back();
  }

  trackByMove(index: number, item: Move): string {
    return item.move.name;
  }

  trackByStat(index: number, item: Stats): string {
    return item.stat.name;
  }
}

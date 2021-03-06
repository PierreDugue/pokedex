import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BehaviorSubject, take } from 'rxjs';
import { PokemonList, PokemonResult } from '../pokemon.model';
import { PokedexService } from '../services/pokedex.service';

const LIMIT = 20;
const CATCH_LIST_KEY = 'catchList';
@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeListComponent implements OnInit {
  $pokemonList: BehaviorSubject<PokemonResult[]> = new BehaviorSubject<
    PokemonResult[]
  >([]);
  pokemonList: PokemonList = { count: 0, next: '', previous: '', results: [] };
  $catchList = this.pokeService.$catchList;
  isShowCatchList: boolean = false;

  constructor(private pokeService: PokedexService) {}

  ngOnInit(): void {
    const catchList = this.getCatchList();
    if (catchList) {
      this.pokeService.$catchList.next(
        JSON.parse(catchList) as PokemonResult[]
      );
    }
    this.getPokemonList();
  }

  getPokemonList(): void {
    this.pageChange();
  }

  pageChange(event?: PageChangedEvent): void {
    this.pokeService
      .getPokemonList(event ? event.page * LIMIT - LIMIT : undefined)
      .pipe(take(1))
      .subscribe({
        next: (pokemonList: PokemonList) => {
          this.setIsCatch(pokemonList);
          this.$pokemonList.next(pokemonList.results);
          this.pokemonList = pokemonList;
        },
        error: (error) => console.log(error),
      });
  }

  getCatchList(): string | null {
    return localStorage.getItem(CATCH_LIST_KEY);
  }

  clearCatchList(): void {
    localStorage.removeItem(CATCH_LIST_KEY);
    this.reloadPage();
  }

  reloadPage(): void {
    // Easier way (for the time I have for this test) to manage the clear.
    window.location.reload();
  }

  showCatchList(): void {
    this.isShowCatchList = true;
  }

  togglePokemonList(): void {
    this.isShowCatchList = false;
  }

  setIsCatch(pokemonList: PokemonList): void {
    pokemonList.results.map((res) => {
      if (
        this.$catchList
          .getValue()
          .some((catchPokemon) => catchPokemon.name === res.name)
      )
        res.isInCatchList = true;
    });
  }

  trackByName(index: number, item: PokemonResult): string {
    return item.name;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { PokemonResult } from '../pokemon.model';
import { PokedexService } from '../services/pokedex.service';

@Component({
  selector: 'app-poke-tile',
  templateUrl: './poke-tile.component.html',
  styleUrls: ['./poke-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeTileComponent implements OnInit {
  @Input() pokemon: PokemonResult = {
    name: '',
    url: '',
    isInCatchList: false,
  };

  get detailLink(): string {
    return `detail/${this.parseId(this.pokemon.url)}`;
  }

  constructor(private pokeService: PokedexService) {}

  ngOnInit(): void {}

  parseId(url: string): string {
    return url.split('/')[6];
  }

  toggleToCatchList(pokemon: PokemonResult, event: any): void {
    if (event.target.checked) {
      pokemon.isInCatchList = true;
      this.addToCatchList(pokemon);
    } else {
      pokemon.isInCatchList = false;
      this.removeFromCatchList(pokemon);
    }

    this.setCatchListLocalStorage();
  }

  addToCatchList(pokemon: PokemonResult): void {
    this.pokeService.$catchList.next([
      ...this.pokeService.$catchList.getValue(),
      pokemon,
    ]);
  }

  removeFromCatchList(pokemon: PokemonResult): void {
    const newCatchList = this.pokeService.$catchList
      .getValue()
      .filter((pokemonList) => {
        return pokemon.url.toString() !== pokemonList.url.toString();
      });

    this.pokeService.$catchList.next(newCatchList);
  }

  setCatchListLocalStorage(): void {
    localStorage.setItem(
      'catchList',
      JSON.stringify(this.pokeService.$catchList.getValue())
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { PokemonResult } from '../pokemon.model';

@Component({
  selector: 'app-poke-tile',
  templateUrl: './poke-tile.component.html',
  styleUrls: ['./poke-tile.component.scss'],
})
export class PokeTileComponent implements OnInit {
  @Input() pokemon: PokemonResult = {
    name: '',
    url: '',
  };

  get detailLink(): string {
    return `detail/${this.parseId(this.pokemon.url)}`;
  }

  constructor() {}

  ngOnInit(): void {}

  parseId(url: string): string {
    return url.split('/')[6];
  }
}

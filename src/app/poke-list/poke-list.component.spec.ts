import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokeListComponent } from './poke-list.component';
import { PokedexService } from '../services/pokedex.service';
import { of } from 'rxjs';
import { PokemonList, PokemonResult } from '../pokemon.model';

describe('PokeListComponent', () => {
  let component: PokeListComponent;
  let fixture: ComponentFixture<PokeListComponent>;
  let pokeResult: PokemonResult[] = [
    {
      name: 'poke1',
      url: 'ulr1',
      isInCatchList: false,
    },
    {
      name: 'poke2',
      url: 'ulr1',
      isInCatchList: false,
    },
    {
      name: 'poke3',
      url: 'ulr1',
      isInCatchList: false,
    },
  ];
  let pokemonList: PokemonList = {
    count: 0,
    next: '',
    previous: '',
    results: pokeResult,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [PokeListComponent],
      providers: [
        {
          provide: PokedexService,
          useValue: {
            getPokemonList: () => of(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return list of entities value', () => {
    const pokeService = fixture.debugElement.injector.get(PokedexService);
    fixture.detectChanges();

    pokeService.getPokemonList().subscribe((poke) => {
      expect(poke).toEqual(pokemonList);
    });
  });
});

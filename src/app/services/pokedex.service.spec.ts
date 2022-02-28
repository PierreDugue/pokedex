import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { PokemonResult, PokemonList, PokemonDetails } from '../pokemon.model';

import { PokedexService } from './pokedex.service';
let injector: TestBed;

describe('PokdexService', () => {
  let service: PokedexService;
  let httpMock: HttpTestingController;
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

  let pokeDetails: PokemonDetails = {
    id: 1,
    name: 'name',
    base_experience: 1,
    height: 1,
    is_default: false,
    order: 0,
    weight: 0,
    moves: [],
    stats: [],
  };
  let url = 'https://pokeapi.co/api/v2/pokemon/2';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PokedexService);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse the ID', () => {
    expect(service.parseId(url)).toEqual('2');
  });

  describe('[Http requests]', () => {
    it('should return a 200 when getting pokemon list', () => {
      service.getPokemonList().subscribe((res) => {
        expect(res).toBe(pokemonList);
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon');
      expect(req.request.method).toBe('GET');
      req.flush(pokemonList, { status: 200, statusText: 'Success' });
    });

    it('should return a 200 when getting pokemon details', () => {
      service.getPokemonDetails('1').subscribe((res) => {
        expect(res).toBe(pokeDetails);
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
      expect(req.request.method).toBe('GET');
      req.flush(pokeDetails, { status: 200, statusText: 'Success' });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

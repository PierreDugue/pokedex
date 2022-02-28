import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokeListComponent } from './poke-list.component';
import { PokedexService } from '../services/pokedex.service';
import { async, BehaviorSubject, Observable, of } from 'rxjs';
import { PokemonList, PokemonResult } from '../pokemon.model';
import { By } from '@angular/platform-browser';

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
  let catchList = `{
    name: 'poke3',
    url: 'ulr1',
    isInCatchList: false,
  },`;
  const CATCH_LIST_KEY = 'catchList';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, HttpClientTestingModule],
        declarations: [PokeListComponent],
        providers: [
          {
            provide: PokedexService,
            useValue: {
              getPokemonList: () => of(pokemonList),
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let store: any = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  describe('[Component]', () => {
    it('should render buttons', () => {
      expect(fixture.debugElement.query(By.css('.btn-primary'))).not.toBeNull();
      expect(
        fixture.debugElement.query(By.css('.btn-secondary'))
      ).not.toBeNull();
      expect(fixture.debugElement.query(By.css('.btn-warning'))).not.toBeNull();
    });

    it('should render pagination', () => {
      expect(fixture.debugElement.query(By.css('.pagination'))).not.toBeNull();
    });

    it('should trigger showcatchlist', () => {
      spyOn(component, 'showCatchList');

      const button = fixture.debugElement.query(
        By.css('.btn-secondary')
      ).nativeElement;
      button.click();

      expect(component.showCatchList).toHaveBeenCalled();
    });

    it('should render catchlist', () => {
      const button = fixture.debugElement.query(
        By.css('.btn-secondary')
      ).nativeElement;
      button.click();

      const element = fixture.debugElement.query(
        By.css('.pokemons')
      ).nativeElement;
      expect(element).toBeTruthy();
    });

    it('should render pokemon list', () => {
      component.$pokemonList.next(pokeResult);
      fixture.detectChanges();

      const element = fixture.debugElement.query(
        By.css('.pokemons')
      ).nativeElement;
      expect(element).toBeTruthy();
    });

    it('should show the correct number of elements', () => {
      component.$pokemonList.next(pokeResult);
      fixture.detectChanges();

      const element = fixture.debugElement.queryAll(By.css('.pokemon-tiles'));
      expect(element.length).toEqual(3);
    });
  });

  describe('[Local storage]', () => {
    it('should return stored value from localStorage', () => {
      localStorage.setItem(CATCH_LIST_KEY, catchList);
      expect(component.getCatchList()).toEqual(catchList);
    });

    it('should return stored value from localStorage', () => {
      component.reloadPage = function () {};
      component.clearCatchList();
      expect(component.getCatchList()).toEqual(null);
    });
  });
});

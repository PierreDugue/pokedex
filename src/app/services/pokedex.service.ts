import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonDetails, PokemonList, PokemonResult } from '../pokemon.model';

const BASE_URL = 'https://pokeapi.co/api/v2';
const HEADER = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'Accept',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  constructor(private http: HttpClient) {}
  $catchList: BehaviorSubject<PokemonResult[]> = new BehaviorSubject<
    PokemonResult[]
  >([]);

  getPokemonList(offset?: number): Observable<PokemonList> {
    return this.http.get<PokemonList>(
      offset
        ? `${BASE_URL}/pokemon?limit=20&offset=${offset}`
        : `${BASE_URL}/pokemon`,
      HEADER
    );
  }

  getPokemonDetails(id: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${BASE_URL}/pokemon/${id}`);
  }
}

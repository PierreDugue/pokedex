import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoveDetails, PokemonDetails, PokemonList } from '../pokemon.model';

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

  getPokemonList(next?: string): Observable<PokemonList> {
    return this.http.get<PokemonList>(
      next ? next : `${BASE_URL}/pokemon`,
      HEADER
    );
  }

  getPokemonDetails(id: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${BASE_URL}/pokemon/${id}`);
  }

  getMove(id: string): Observable<MoveDetails> {
    return this.http.get<MoveDetails>(`${BASE_URL}/move/${id}`);
  }
}

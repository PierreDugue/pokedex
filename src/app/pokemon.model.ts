export interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  moves: Move[];
}

export interface Move {
  moves: Moves;
}

export interface Moves {
  name: string;
  url: string;
}

export interface MoveDetails {
  id: number;
  name: string;
  accuracy: number;
  effect_chance: number;
  pp: number;
  priority: number;
  power: number;
}

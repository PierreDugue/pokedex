export interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
  isInCatchList: boolean;
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
  stats: Stats[];
}

export interface Move {
  move: Moves;
}

export interface Moves {
  name: string;
  url: string;
}

export interface Stats {
  base_stat: number;
  effot: number;
  stat: Stat;
}

export interface Stat {
  name: string;
  url: string;
}

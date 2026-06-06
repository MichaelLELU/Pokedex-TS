export interface TyradexType {
  name: string;
  image: string;
}

export interface TyradexPokemon {
  pokedex_id: number;

  name: {
    fr: string;
    en?: string;
    jp?: string;
  };

  generation: number;

  sprites?: {
    regular?: string;
    shiny?: string;
  };

  types?: TyradexType[];
}

export interface TyradexEvolution {
  name: string;
  pokedex_id: number;
}
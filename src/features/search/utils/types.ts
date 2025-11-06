export interface IRecentSearch {
  mapboxId: string;
  type: string;
  name: string;
  pt: [number, number];
}

export interface IPopularBoundary {
  name: string;
  id: string;
  postal_code: string;
  children: IPopularBoundary[];
}

export interface IFilterPayload {
  withinId?: string[];
  type?: number[];
  rentType?: string[];
  rent?: [number, number];
}

export enum RentType {
  RENT = "rent",
  BUY = "buy",
}

export interface IHistogram {
  range: [number, number];
  histogram: number[];
}

export interface ITenementCount {
  count: number;
}

export interface ICategory {
  id: number;
  name: string;
  icon?: string;
}

export interface IMapboxSuggestion {
  mapbox_id: string;
  name: string;
  full_address?: string;
  place_formatted?: string;
  feature_type: string;
  geometry: IGeometry;
}

export interface IGeometry {
  type: string;
  coordinates: [number, number];
}

export interface IMapboxSearchResponse {
  suggestions: IMapboxSuggestion[];
}

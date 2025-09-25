export interface CatBreed {
  adaptability: number;
  affection_level: number;
  alt_names: string;
  cfa_url?: string;
  child_friendly: number;
  country_code: string;
  country_codes: string;
  description: string;
  dog_friendly: number;
  energy_level: number;
  experimental: number;
  grooming: number;
  hairless: number;
  health_issues: number;
  hypoallergenic: number;
  id: string;
  indoor: number;
  intelligence: number;
  lap?: number;
  life_span: string;
  name: string;
  natural: number;
  origin: string;
  rare: number;
  reference_image_id?: string;
  rex: number;
  shedding_level: number;
  short_legs: number;
  social_needs: number;
  stranger_friendly: number;
  suppressed_tail: number;
  temperament: string;
  vcahospitals_url?: string;
  vetstreet_url?: string;
  vocalisation: number;
  weight: Weight;
  wikipedia_url?: string;
}

interface Weight {
  imperial: string;
  metric: string;
}

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface VoteRequest {
  image_id: string;
  value: 1 | 0;
  sub_id?: string;
}

export interface VoteResponse {
  id: number;
  image_id: string;
  value: number;
  created_at: string;
}

export interface Cat {
  id: string;
  name: string;
  imageUrl: string;
  temperament: string;
  age: string;
}

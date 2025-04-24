export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  genre: string;
  director: string;
  rating: number; 
  duration: number; 
  language: string;
  trailer_url?: string;
  posterUrl: string; 
}

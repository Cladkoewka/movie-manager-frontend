import axios from "axios";
import { Movie } from "../types/Movie";
import { Review } from "../types/Review";

const BASE_URL = "https://movie-manager-production-de61.up.railway.app/movies";



export const fetchReviewsByMovieId = async (movieId: number) => {
  try {
    const response = await axios.get<Review[]>(`https://movie-manager-production-de61.up.railway.app/reviews/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const fetchMovies = async (params: Record<string, any>) => {
  try {
    const response = await axios.get<{ movies: Movie[]; total: number }>(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error; 
  }
};


export const fetchMovieById = async (id: number) => {
  try {
    const response = await axios.get<Movie>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie with id ${id}:`, error);
    throw error; 
  }
};

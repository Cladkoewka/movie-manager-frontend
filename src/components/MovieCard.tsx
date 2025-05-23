import { Movie } from "../types/Movie";
import { Link } from "react-router-dom";
import "./MovieCard.css"; 

interface Props {
  movie: Movie;
}

const fallbackPoster = "https://movie-manager-production-de61.up.railway.app/movies/999/poster"; 

export default function MovieCard({ movie }: Props) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; 
    target.src = fallbackPoster; 
  };

  return (
    <Link to={`/movie/${movie.id}`} className="text-decoration-none text-dark">
      <div className="movie-card card h-100 border-0 rounded-4 transition-all">
        <img
          src={`https://movie-manager-production-de61.up.railway.app/movies/${movie.id}/poster`}
          onError={handleError} 
          className="card-img-top rounded-top-4 object-fit-cover"
          alt={movie.title}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <div className="card-body d-flex justify-content-between">
          <div>
            <h5 className="card-title fw-bold">{movie.title}</h5>
            <p className="card-text text-muted mb-0">• {movie.genre}</p>
            <p className="card-text text-muted mb-0">• {movie.language}</p>
          </div>
          <div>
            <h5 className="card-title fw-bold">{movie.rating}</h5>
          </div>
        </div>
      </div>
    </Link>
  );
}

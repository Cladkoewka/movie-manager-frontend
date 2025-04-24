import { Movie } from "../types/Movie";
import { Link } from "react-router-dom";
import "./MovieCard.css"; // добавим стили отдельно

interface Props {
  movie: Movie;
}

const fallbackPoster = "../../public/fallback-poster.jpg";

export default function MovieCard({ movie }: Props) {
  return (
    <Link to={`/movie/${movie.id}`} className="text-decoration-none text-dark">
      <div className="movie-card card h-100 border-0 rounded-4 transition-all">
        <img
          src={`http://localhost:8080/movies/${movie.id}/poster`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = fallbackPoster;
          }}
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

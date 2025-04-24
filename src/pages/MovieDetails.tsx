import { useParams, Link } from "react-router-dom";  // Импортируем Link для навигации
import { useEffect, useState } from "react";
import { fetchMovieById } from "../api/movies";
import { fetchReviewsByMovieId } from "../api/movies";
import { Movie } from "../types/Movie";
import { Review } from "../types/Review";
import axios from "axios";

const fallbackPoster = "../../public/fallback-poster.jpg";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);


  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    fetchMovieById(Number(id))
      .then((res) => {
        setMovie(res);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching movie details");
        setLoading(false);
      });
      
    fetchReviewsByMovieId(Number(id))
      .then(setReviews)
      .catch((err) => console.error("Error loading reviews:", err));
    

    axios
      .get(`http://localhost:8080/movies/${id}/poster`, { responseType: "blob" })
      .then((response) => {
        const imageUrl = URL.createObjectURL(response.data);
        setPosterUrl(imageUrl);
      })
      .catch((err) => {
        console.error("Poster not found:", err);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Movie not found</div>;

  function getYouTubeEmbedUrl(url: string): string | null {
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regExp);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  }

  return (
    <div className="container py-5">
      <div className="mb-4">
        <Link to="/" className="btn bg-light fw-bolder">
          &lt; Назад на главную
        </Link>
      </div>

      <div className="row mb-5">
        <div className="col-md-4 d-flex flex-column justify-content-start mb-4 mb-md-0">
          <img
            src={posterUrl || fallbackPoster}
            alt={movie.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />

          <p className="mt-2">{movie.description}</p>

          <div className="mt-2">
            <h4>Отзывы</h4>
            {reviews.length === 0 ? (
              <p className="text-muted">Пока нет отзывов.</p>
            ) : (
              <ul className="list-group">
                {reviews.map((review) => (
                  <li key={review.id} className="list-group-item mb-2">
                    {review.comment}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-baseline mb-3">
            <h1 className="fw-bold">{movie.title}</h1>
            <div className="p-2 bg-light rounded shadow-sm"><strong>Рейтинг: </strong>{movie.rating}</div>
          </div>
          <div className="row g-3 mb-4">
            <div className="col-sm-6">
              <div className="p-3 bg-light rounded shadow-sm">
                <strong>Жанр:</strong> <span className="text-muted">{movie.genre}</span>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="p-3 bg-light rounded shadow-sm">
                <strong>Язык:</strong> <span className="text-muted">{movie.language}</span>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="p-3 bg-light rounded shadow-sm">
                <strong>Режиссёр:</strong> <span className="text-muted">{movie.director}</span>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="p-3 bg-light rounded shadow-sm">
                <strong>Длительность:</strong> <span className="text-muted">{movie.duration} мин.</span>
              </div>
            </div>
          </div>

          {movie.trailer_url && (
            <div className="mt-4">
              {getYouTubeEmbedUrl(movie.trailer_url) ? (
                <div className="ratio ratio-16x9 w-100 rounded shadow">
                  <iframe
                    src={getYouTubeEmbedUrl(movie.trailer_url)!}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded shadow"
                  ></iframe>
                </div>
              ) : (
                <video controls className="w-100 rounded shadow">
                  <source src={movie.trailer_url} type="video/mp4" />
                </video>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

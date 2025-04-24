import { useEffect, useState } from "react";
import { fetchMovies } from "../api/movies";
import { Movie } from "../types/Movie";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filters, setFilters] = useState({
    page: 1,
    genre: "",
    language: "",
    rating: "",
    search: "", 
    sort_by: "title", 
    order: "asc", 
  });
  
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMovies(filters)
      .then((data) => {
        setMovies(data.movies);
        setTotal(data.total);
      })
      .catch(() => {
        setError("Error fetching movies");
      });
  }, [filters]);

  const totalPages = Math.ceil(total / 10);

  if (error) {
    return <div className="container py-4">{error}</div>;
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sort_by, order] = e.target.value.split("-");
    setFilters((prev) => ({
      ...prev,
      sort_by,
      order,
    }));
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="m-0">ВыборКино</h1>
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onChangePage={(page) => setFilters((f) => ({ ...f, page }))}
        />
      </div>

      <div className="d-flex mb-4">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Поиск по названию"
          className="form-control me-2"
        />
        <input
          type="text"
          name="genre"
          value={filters.genre}
          onChange={handleFilterChange}
          placeholder="Фильтр по жанру"
          className="form-control me-2"
        />
        <input
          type="text"
          name="language"
          value={filters.language}
          onChange={handleFilterChange}
          placeholder="Фильтр по языку"
          className="form-control me-2"
        />
        <input
          type="number"
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange}
          placeholder="Минимальный рейтинг"
          className="form-control me-2"
        />
        <select onChange={handleSortChange} className="form-select">
          <option value="title-asc">Сортировать по названию (A-Z)</option>
          <option value="title-desc">Сортировать по названию (Z-A)</option>
          <option value="rating-asc">Сортировать по рейтингу (по возрастанию)</option>
          <option value="rating-desc">Сортировать по рейтингу (по убыванию)</option>
        </select>
      </div>

      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="col">
              <MovieCard movie={movie} />
            </div>
          ))
        ) : (
          <div>No movies available</div>
        )}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onChangePage={(page) => setFilters((f) => ({ ...f, page }))}
        />
      </div>
    </div>
  );
}

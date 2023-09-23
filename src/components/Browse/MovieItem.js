import './MovieItem.css';

// Base url cho hình ảnh phim từ TMDb
const base_url = 'https://image.tmdb.org/t/p/original';

export default function MovieItem({ movie, onClick, isVertical = false}) {
  return (
    <img
      onClick={onClick}
      className={`row_poster ${isVertical ? 'row_posterLarge' : ''}`}
      src={`${base_url}${isVertical ? movie.poster_path : movie.backdrop_path}`}
      alt={movie.name}
    />
  );
}

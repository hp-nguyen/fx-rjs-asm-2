import { useEffect, useState } from 'react';
import './ResultList.css';
import { fetchData, requests } from '../../api';
import MovieItem from '../Browse/MovieItem';

export default function ResultList({ query }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    // Kiểm tra có từ khóa hay không
    if (!query) return setMovies([]);
    // Nếu có từ khóa thì tiến hành search
    fetchData(requests.fetchSearch(query))
      .then(respone => setMovies(respone.data.results))
      .catch(err => console.error('Error fetching search results:', err));
  }, [query]);

  return (
    <div className="result-list">
      <h2 className="result-list-title">Search Results</h2>
      <ul className="movies-list">
        {movies.map(movie => (
          <MovieItem key={movie.id} movie={movie} isVertical={true} />
        ))}
      </ul>
    </div>
  );
}

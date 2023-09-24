import movieTrailer from 'movie-trailer';
import { useEffect, useRef, useState } from 'react';
import { fetchData, requests } from '../../api';
import MovieDetail from '../Browse/MovieDetail';
import MovieItem from '../Browse/MovieItem';
import './ResultList.css';

export default function ResultList({ query }) {
  // State lưu trữ danh sách các bộ phim
  const [movies, setMovies] = useState([]);
  // State lưu trữ kết quả có tìm thấy bộ phim nào hay không
  const [hasResults, setHasResults] = useState(true);
  // State lưu trữ phim được chọn
  const [selectedMovie, setSelectedMovie] = useState(null);
  // State lưu trữ key của trailer hoặc teaser của phim được chọn
  const [trailerKey, setTrailerKey] = useState('');
  // State lưu trữ backdrop của phim được chọn
  const [backdrop, setBackdrop] = useState('');
  useEffect(() => {
    // Kiểm tra có từ khóa hay không
    if (!query) return setMovies([]);
    // Nếu có từ khóa thì tiến hành search
    fetchData(requests.fetchSearch(query))
      .then(respone => setMovies(respone.data.results))
      .catch(err => {
        setMovies([]);
        console.error('Error fetching search results:', err);
      })
      .finally(() => setHasResults(movies.length > 0)); // Update hasResults sau khi search xong movies
    // Reset selected movie khi search phim mới
    setSelectedMovie(null);
  }, [query, movies.length]);

  // Xử lý sự kiện khi click vào một phim
  const handleClick = movie => {
    // Đóng phần detail khi click thêm lần nữa vào phim đang chọn
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null);
    } else {
      // Hiển thị phần detail khi chọn 1 phim
      setSelectedMovie(movie);
      // Lấy key của trailer hoặc teaser
      movieTrailer(movie?.title || '')
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerKey(urlParams.get('v'));
        })
        .catch(error => {
          // Xử lý lỗi khi không lấy được key của trailer
          console.error(error);
          setTrailerKey('');
          // Lấy backdrop thay thế cho trailer
          setBackdrop(movie['backdrop_path']);
        });
    }
  };
  // Scroll tới MovieDetail khi chọn 1 phim
  const detailPosition = useRef(null);
  useEffect(() => {
    detailPosition.current.scrollIntoView({ behavior: 'smooth' });
  }, [selectedMovie]);
  return (
    <div className="result-list">
      <h2 ref={detailPosition} className="result-list-title">
        Search Results
      </h2>
      {selectedMovie && (
        <MovieDetail
          movieData={selectedMovie}
          movieTrailer={trailerKey}
          backdropImage={backdrop}
        />
      )}
      {hasResults ? (
        <ul className="movies-list">
          {movies.map(movie => (
            <li key={movie.id}>
              <MovieItem
                movie={movie}
                isVertical={true}
                onClick={() => handleClick(movie)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No films found</p>
      )}
    </div>
  );
}

import movieTrailer from 'movie-trailer';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../api';
import MovieDetail from './MovieDetail';
import './MovieList.css';
import MovieItem from './MovieItem';

const movies_limit = 10;

export default function MovieList({ title, fetchUrl, isVertical = false }) {
  // State lưu trữ danh sách các bộ phim
  const [movies, setMovies] = useState([]);
  // State lưu trữ phim được chọn
  const [selectedMovie, setSelectedMovie] = useState(null);
  // State lưu trữ key của trailer hoặc teaser của phim được chọn
  const [trailerKey, setTrailerKey] = useState('');
  // State lưu trữ backdrop của phim được chọn
  const [backdrop, setBackdrop] = useState('');

  // Sử dụng useEffect để gọi API và lấy danh sách phim
  useEffect(() => {
    // Hàm fetchDataMovieList dùng để gọi API và cập nhật state
    const fetchDataMovieList = async () => {
      try {
        const request = await fetchData(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataMovieList();
  }, [fetchUrl]);

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

  // Sắp xếp danh sách phim theo độ phổ biến
  movies.sort((a, b) => b.popularity - a.popularity);
  movies.splice(movies_limit);

  return (
    <div className="row">
      <h2 className="movie-list-title">{title}</h2>
      <div className="row_posters sc2">
        {movies.map(movie => (
          <MovieItem
            key={movie.id}
            movie={movie}
            onClick={() => handleClick(movie)}
            isVertical={isVertical}
          />
        ))}
      </div>
      {selectedMovie && (
        <MovieDetail
          movieData={selectedMovie}
          movieTrailer={trailerKey}
          backdropImage={backdrop}
        />
      )}
    </div>
  );
}

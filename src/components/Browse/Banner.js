import React, { useEffect, useState } from 'react';
import { fetchData, requests } from '../../api';
import './Banner.css';

export default function Banner() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchDataFromApi() {
      try {
        // Gửi request để lấy danh sách các bộ phim Netflix Originals
        const request = await fetchData(requests.fetchNetflixOriginals);

        // Lấy một bộ phim ngẫu nhiên từ danh sách
        const randomMovie = request.data.results[Math.floor(Math.random() * request.data.results.length)];
        // Set thông tin bộ phim vào state
        setMovie(randomMovie);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDataFromApi();
  }, []);

  // Hàm xử lý phần description
  const truncate = (str, n) => {
    if (!str) return 'No description available'
    // Cắt description nếu quá dài
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h3 className="banner_description">{truncate(movie?.overview, 150)}</h3>
      </div>
    </header>
  );
}

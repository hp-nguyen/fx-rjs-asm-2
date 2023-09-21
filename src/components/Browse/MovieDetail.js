import React from 'react';
import YouTube from 'react-youtube';

import './MovieDetail.css';

const base_url = 'https://image.tmdb.org/t/p/original';

// Setting cho video YouTube
const opts = {
  height: '400',
  width: '100%',
  playerVars: {
    autoplay: 0,
  },
};

// Component MovieDetail
export default function MovieDetail({ movieTrailer, movieData, backdropImage }) {
  // Destructuring các thuộc tính từ object movieData
  const { release_date, title, name, overview, vote_average } = movieData;

  return (
    <div className="movie_detail">
      <div className="movie_detail_data">
        <h2>{title || name}</h2>
        <hr></hr>

        <h3>Release Date: {release_date}</h3>
        <h3>Vote: {vote_average} / 10</h3>
        <br></br>
        <p>{overview || 'No overview available'}</p>
      </div>
      {movieTrailer ? (
        // Hiển thị video Trailer hoặc Teaser nếu có
        <div className="movie_detail_trailer">
          {/* Sử dụng thư viện react-youtube để hiển thị trailer */}
          <YouTube
            videoId={movieTrailer}
            opts={opts} />
        </div>
      ) : backdropImage ? (
        // Hiển thị backdrop nếu không có video Trailer hoặc Teaser
        <div className="movie_detail_backdrop">
          <img
            src={`${base_url}${backdropImage}`} // Sử dụng backdropImage để tạo URL hình ảnh backdrop
            alt="Backdrop"
            className="backdrop-image" />
        </div>
      ) : (
        // Nếu không có cả video Trailer hoặc ảnh Backdrop thì hiện thông báo thay thế
        <div className="movie_detail_no_content">
          <p>No Trailer or Backdrop Available</p>
        </div>
      )}
    </div>
  );
}


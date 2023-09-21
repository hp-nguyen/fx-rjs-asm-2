import React from 'react';
import Navbar from '../../components/Browse/Navbar';
import Banner from '../../components/Browse/Banner';
import MovieList from '../../components/Browse/MovieList';
import { requests } from '../../api';

const movieCategories = {
  'Xu hướng': requests.fetchTrending,
  'Xếp hạng cao': requests.fetchTopRated,
  'Hành động': requests.fetchActionMovies,
  'Hài': requests.fetchComedyMovies,
  'Kinh dị': requests.fetchHorrorMovies,
  'Lãng mạn': requests.fetchRomanceMovies,
  'Tài liệu': requests.fetchDocumentaries
}
const movieListTitles = Object.keys(movieCategories)
function Browse() {
  return (
    <div className="app">
      <Navbar />
      <Banner />
      {/* Danh sách phim Netflix Original */}
      <MovieList fetchUrl={requests.fetchNetflixOriginals} isVertical={true} />
      {/* Các danh sách phim của các thể loại còn lại  */}
      {movieListTitles.map(title => <MovieList key={title} title={title} fetchUrl={movieCategories[title]}/>)}
    </div>
  );
}

export default Browse;

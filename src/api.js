import axios from 'axios';
export const API_KEY = '504b85f6fe0a10a9c7f35945e14e7ddf';

// const API_KEY = '96fdb83a0dd8bd095526e86d6d9c9bed';

// Tạo một phiên bản Axios với baseURL của API TMDb
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

// Các url path
export const requests = {
  // Path cho các phim nổi bật trong tuần
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,

  // Path cho các bộ phim của Netflix
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,

  // Path cho các bộ phim có đánh giá cao nhất
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,

  // Path cho các bộ phim hành động
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,

  // Path cho các bộ phim hài kịch
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,

  // Path cho các bộ phim kinh dị
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,

  // Path cho các bộ phim lãng mạn
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,

  // Path cho các bộ phim tài liệu
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,

  // Path cho tìm kiếm phim dựa trên từ khóa
  fetchSearch: query => `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`,
};

// Hàm fetchData dùng để gửi yêu cầu API và nhận dữ liệu từ phản hồi
export const fetchData = async request => {
  try {
    // Gửi yêu cầu API bằng Axios và nhận phản hồi
    const response = await instance.get(request);
    // Trả về dữ liệu từ phản hồi
    return response;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error(error);
  }
};
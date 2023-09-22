import React from 'react';
import Navbar from '../../components/Browse/Navbar';
import SearchForm from '../../components/Search/SearchForm';
import ResultList from '../../components/Search/ResultList';
import { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  // const handleSearch = searchKeyword => setQuery(searchKeyword);
  return (
    <div className="app">
      <Navbar />
      <SearchForm onSearch={setQuery} />
      <ResultList query={query} />
    </div>
  );
};

export default Search;

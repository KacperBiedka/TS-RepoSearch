import React, { FC } from "react";
import SearchResults from '../containers/SearchResults/SearchResults';

const SearchPage: FC = () => {
  return (
    <div className="search-page">
      <SearchResults />
    </div>
  );
};

export default SearchPage;

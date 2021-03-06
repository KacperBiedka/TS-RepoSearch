/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ISearchResultsProps,
         IRepoData,
         ICachedResults,
         FilterType,
         IDisplayDataObject,
} from './SearchResultsTypes';

import { updateSearchError } from "../../actions";

import GithubApi from "../../../../api/GithubApi";
import Input from "../../../../components/Input/Input";
import Loader from "../../../../components/Loader/Loader";
import StatusHero from "../../components/StatusHero/StatusHero";
import ResultsTable from "../../components/ResultsTable/ResultsTable";
import {
  sortByField,
  getCacheValue,
  updateCacheValue,
} from "../../../../helpers/index";
import { useQueryParams, StringParam } from 'use-query-params';
import classes from "./SearchResults.module.scss";

const SearchResults: FC<ISearchResultsProps> = () => {
  const [searchResults, setSearchResults] = useState<IDisplayDataObject[]>([]);
  const [prevSearchResults, setPrevSearchResults] = useState<ICachedResults[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [lastSearch, setLastSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationNumbers, setPaginationNumbers] = useState<number[]>([]);
  const [perPage, setPerPage] = useState<number>(10);
  const [rowNumber, setRowNumber] = useState(10);
  const [urlParams, setUrlParams] = useQueryParams({
    query: StringParam,
    field: StringParam,
    order: StringParam
  });

  const [filters, setFilters] = useState([
    {
      name: "Name",
      field: "name",
      order: "asc",
      active: true,
    },
    {
      name: "Owner",
      field: "owner",
      order: "asc",
      active: false,
    },
    {
      name: "Stars",
      field: "stars",
      order: "asc",
      active: false,
    },
    {
      name: "Created at",
      field: "created_at",
      order: "asc",
      active: false,
    },
  ]);

  const dispatch = useDispatch();

  const getCachedValues = () => {
    getCacheValue("perPage", (number) => setPerPage(number));
    getCacheValue("prevResults", (results) => setPrevSearchResults(results));
    getCacheValue("currentPage", (page) => setCurrentPage(page));
  };

  const retrieveUrlValues = () => {
    if (urlParams.query) {
      setSearchQuery(urlParams.query);
      setIsLoading(true);
    }
    if (urlParams.field && urlParams.order) {
      updateActiveFilter(urlParams.field, urlParams.order);
    }
  };

  useEffect(() => {
    getCachedValues();
    retrieveUrlValues();
  }, []);


  const fetchData = async (cachedResults: ICachedResults | null = null) => {
    setIsLoading(true);
    if (cachedResults) {
      dispatch(updateSearchError(null));
      addSearchEntry(searchQuery, cachedResults.data);
      extractListData(cachedResults.data);
    } else {
      const githubApi = new GithubApi(
        "https://api.github.com/search/repositories?q="
      );
      const results: IRepoData = await githubApi.getSearchResults(searchQuery);
      if (results.data) {
        addSearchEntry(searchQuery, results.data);
        extractListData(results.data);
      }
      dispatch(updateSearchError(results.error));
      updateCurrentPage(1);
    }
    setIsLoading(false);
  };

  const updateCurrentPage = (number: number) => {
    setCurrentPage(number);
    updateCacheValue("currentPage", number);
  };

  const updatePaginationNumber = (number: number) => {
    setPerPage(number);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery) {
        const cachedResult: ICachedResults | undefined = prevSearchResults.find(
          (result: ICachedResults) => result.query === searchQuery
        );
        if (cachedResult) {
          fetchData(cachedResult);
        } else {
          fetchData();
        }
      }
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const extractListData = (data: IDisplayDataObject[]) => {
    let displayData = data;
    if (data) {
      if (data.length > 0) {
        const activeFilter: FilterType = filters.find((filter) => filter.active);
        if (activeFilter) {
          displayData = sortByField(
            displayData,
            activeFilter.field,
            activeFilter.order
          );
          updateActiveFilter(activeFilter.field, activeFilter.order);
        }
      }
    }
    setSearchResults(displayData);
    calculatePaginationNumbers(displayData, perPage);
  };

  const sortData = (index: number) => {
    const updatedFilters = [...filters];
    const filter = updatedFilters[index];
    const sortedArray = sortByField(searchResults, filter.field, filter.order);
    setSearchResults([...sortedArray]);
    updatedFilters.map((filter) => {
      return (filter.active = false);
    });
    setFilters(updatedFilters);
    if (filter.order === "asc") {
      filter.order = "desc";
    } else {
      filter.order = "asc";
    }
    filter.active = true;
    updatedFilters[index] = filter;
    setFilters(updatedFilters);
    setUrlParams({
      query: searchQuery,
      field: filter.field,
      order: filter.order
    });
  };

  const updateActiveFilter = (field: string, order: string) => {
    const updatedFilters = [...filters];
    const activeIndex = filters.findIndex((filter) => filter.field === field);
    const newFilter = updatedFilters[activeIndex];
    newFilter.order = order;
    updatedFilters.map((filter) => {
      return (filter.active = false);
    });
    newFilter.active = true;
    if (order === "asc") {
      newFilter.order = "desc";
    } else {
      newFilter.order = "asc";
    }
    updatedFilters[activeIndex] = newFilter;
    setFilters(updatedFilters);
    setUrlParams({
      query: searchQuery,
      field: newFilter.field,
      order: newFilter.order
    });
  };

  const calculatePaginationNumbers = (array: any[], perPageNumber: number) => {
    const newPagination = [];
    if (array) {
      for (let i = 1; i <= Math.ceil(array.length / perPageNumber); i++) {
        newPagination.push(i);
      }
      setPaginationNumbers(newPagination);
    }
  };

  const addSearchEntry = (query: string, data: IDisplayDataObject[]) => {
    setLastSearch(query);
    updateCacheValue("lastSearch", query);
    const activeFilter: FilterType = filters.find((filter) => filter.active);
    if (activeFilter) {
      setUrlParams({
        query: searchQuery,
        field: activeFilter.field,
        order: activeFilter.order
      });
    }
    const prevResults: ICachedResults[]= [...prevSearchResults];
    setPrevSearchResults(prevResults);
    const matchingField = prevResults.find((result) => result.query === query);
    if (!matchingField) {
      prevResults.push({
        query,
        data,
      });
    }
    setPrevSearchResults(prevResults);
    updateCacheValue("prevResults", prevResults);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const parsedNumber = perPage;
      if (parsedNumber > 0) {
        calculatePaginationNumbers(searchResults, parsedNumber);
        updateCacheValue("perPage", parsedNumber);
        if (searchResults) {
          if (Math.ceil(searchResults.length / parsedNumber) < currentPage) {
            updateCurrentPage(1);
          }
        }
        setRowNumber(parsedNumber);
      }
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [perPage]);

  return (
    <div data-test="search-results" className={classes.searchResults}>
      <StatusHero value={lastSearch} />
      <Input
        value={searchQuery}
        data-test="repo-search-input"
        changeCallback={(keyword: string) => setSearchQuery(keyword)}
      />
      {isLoading ? (
        <Loader data-test="search-results-loader" />
      ) : (
        <ResultsTable
          repoData={searchResults}
          filters={filters}
          sortData={sortData}
          perPage={perPage}
          rowNumber={rowNumber}
          currentPage={currentPage}
          perPageCallback={updatePaginationNumber}
          paginationNumbers={paginationNumbers}
          updateCurrentPage={updateCurrentPage}
        />
      )}
    </div>
  );
};

export default withRouter(SearchResults);

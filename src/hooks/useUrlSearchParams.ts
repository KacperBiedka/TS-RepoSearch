import { useLocation } from "react-router-dom";
import { useMemo } from "react";

/**
 * Helper hook for retrieving url parameter values
 * checks if the parameter is contained in the search parameters and returns it's value if it's present
 * @param {String} searchEntry
 */

interface ISearchParams {
  [key: string]: any
}

const useUrlSearchParams = (searchEntry: string) => {
  const location = useLocation();
  return useMemo(() => {
    const searchParams: ISearchParams = new URLSearchParams(location.search);
    let paramValue = null;
    for (const [key, value] of searchParams.entries()) {
      if (searchEntry === key) {
        paramValue = value;
      }
    }
    return paramValue;
  }, [location.search, searchEntry]);
};

export default useUrlSearchParams;

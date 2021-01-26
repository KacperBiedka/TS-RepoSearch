import { RepositoryInfo, IDisplayDataObject } from "./types";

/**
 * helper GithubApi class with basic validation
 * the flexible structure allows for easy usage outside of the search module
 * custom url, options and query values can be provided to suit your needs :)
 */

 interface IKeywordStatus {
     query: null | string,
     error: null | string
 }

 interface IResults {
     data: IDisplayDataObject[] | null,
     error: string | null
 }

export default class GithubApi {
    private readonly url: string;
    private readonly options: {}; 
    constructor(url: string, options = {}) {
      this.url = url;
      this.options = options;
    }
    _validateKeyword(query: string): IKeywordStatus {
      if (query.length > 20) {
        return {
          query: null,
          error: "Please use a shorter word",
        };
      } else if (query.trim().length > 0) {
        return {
          query,
          error: null,
        };
      } else {
        return {
          query: null,
          error: "Empty search parameter",
        };
      }
    }
  
    async getSearchResults(query: string): Promise<IResults> {
      const searchValue: IKeywordStatus = this._validateKeyword(query);
      if (searchValue.error) {
        return {
          data: null,
          error: searchValue.error,
        };
      } else {
        const url: string = this.url + searchValue.query;
        const res = await fetch(url, this.options);
        return res
          .json()
          .then((res) => {
            const displayData: IDisplayDataObject[] = [];
            res.items.forEach((item: RepositoryInfo) => {
              const displayObject: IDisplayDataObject = {
                name: item.name,
                owner: item.owner.login,
                stars: item.stargazers_count,
                created_at: item.created_at,
                id: item.id
              }
              displayData.push(displayObject);
            });
            return {
              data: displayData,
              error: null,
            };
          })
          .catch((error) => {
            return {
              data: null,
              error: error.message,
            };
          });
      }
    }
  }
  
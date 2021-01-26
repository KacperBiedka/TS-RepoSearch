import GithubApi, { IRepoData } from '../../../src/api/GithubApi';

export const statusMessages = {
    default: "Search for anything :)",
    empty: "Empty search parameter",
    long: "Please use a shorter word"
};

export const getRepoSearchResults = async (searchQuery: string) => {
    const githubApi = new GithubApi(
        "https://api.github.com/search/repositories?q="
      );
    const results: IRepoData = await githubApi.getSearchResults(searchQuery);
    return results.data;
}
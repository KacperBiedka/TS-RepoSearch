import { History } from 'history';
import { SearchRepositoriesResponse, RepositoryInfo } from '../../../../api/GithubApi';

export interface ISearchResultsProps {
    history: History
}

export interface IDisplayDataObject {
    owner: string;
    name: string;
    stars: number;
    created_at: string;
    id: string | number;
}

export interface ICachedResults {
    query: string,
    data: RepositoryInfo[]
}

export interface IFilter {
    name: string,    
    field: string,
    order: string,
    active: boolean
}

export type FilterType = IFilter | undefined;


export interface IRepoData {
    error: string | null,
    data: SearchRepositoriesResponse | null
}


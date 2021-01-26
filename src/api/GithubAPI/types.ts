export interface RepositoryInfo {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    owner: OwnerInfo;
    private: false;
    html_url: string;
    description: string;
    fork: false;
    url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    stars: number;
    watchers_count: number;
    language: string;
    forks_count: number;
    open_issues_count: number;
    master_branch: string;
    default_branch: string;
    score: number;
}

export interface OwnerInfo {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    received_events_url: string;
    type: string;
}

export interface SearchRepositoriesResponse {
    total_count: number;
    incomplete_results: boolean;
    items: RepositoryInfo[];
}

export interface IDisplayDataObject {
    owner: string;
    name: string;
    stars: number;
    created_at: string;
    id: string | number;
}
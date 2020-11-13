export interface RepositoryObject {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    owner: OwnerInfo;
    private: boolean;
    html_url: string;
    description: string | null;
    fork: boolean;
    url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    homepage: string | null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string | null;
    forks_count: number;
    open_issues_count: number;
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

export interface MockResponse {
    total_count: number;
    incomplete_results: boolean;
    items: RepositoryObject[];
}
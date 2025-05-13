export const GITHUB_BASE_URL = "https://api.github.com"
export function GITHUB_REPO_SEARCH_URL(repoName) { return GITHUB_BASE_URL + `/search/repositories?q=${repoName}`}
export const PAGINATION_AMOUNT=100 
export function GITHUB_ISSUES_URL(owner, repoName, page=1) { return GITHUB_BASE_URL + `/repos/${owner}/${repoName}/issues?per_page=${PAGINATION_AMOUNT}&page=${page}`}
export const GITHUB_PERSONAL_ACCESS_TOKEN =  import.meta.env.GITHUB_PERSONAL_ACCESS_TOKEN
export const WEEK_DELTA = 10
export const CHART_DIMENSIONS = {
    "width": 720,
    "height": 320
}

import { getApiParams } from './imdb_endpoint'
import type { Movie, Person, SearchResults, TV } from './tmdb_models'

export async function searchMulti(searchParams: URLSearchParams) {
  const query = searchParams.get('query')
  if (!query) return { page: 0, total_results: 0, total_pages: 0, results: [] }
  const aipParams = getApiParams('search', 'Multi', searchParams)

  return search<Movie | TV | Person>(aipParams)
}

export async function searchMovie(searchParams: URLSearchParams) {
  const query = searchParams.get('query')
  if (!query) return { page: 0, total_results: 0, total_pages: 0, results: [] }
  const aipParams = getApiParams('search', 'Movie', searchParams)

  return search<Movie>(aipParams)
}

export async function searchTv(searchParams: URLSearchParams) {
  const query = searchParams.get('query')
  if (!query) return { page: 0, total_results: 0, total_pages: 0, results: [] }
  const aipParams = getApiParams('search', 'Tv', searchParams)

  return search<TV>(aipParams)
}

async function search<T>(apiParams: {
  url: string
  method: string
}): Promise<SearchResults<T>> {
  console.log(apiParams.url)
  const response = await fetch(apiParams.url, { method: apiParams.method })
  const data = await response.json()

  return data
}

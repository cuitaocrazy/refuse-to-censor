export type Movie = {
  id: number
  poster_path?: string
  adult?: boolean
  overview?: string
  release_date?: string
  original_title?: string
  genre_ids?: number[]
  media_type: 'movie'
  original_language?: string
  title?: string
  backdrop_path?: string
  popularity?: number
  vote_count?: number
  video?: boolean
  vote_average?: number
}

export type TV = {
  id: number
  poster_path?: string
  popularity?: number
  overview?: string
  backdrop_path?: string
  vote_average?: number
  media_type: 'tv'
  first_air_date?: string
  origin_country?: string[]
  genre_ids?: number[]
  original_language?: string
  vote_count?: number
  name?: string
  original_name?: string
}

export type Person = {
  id: number
  profile_path?: string
  adult?: boolean
  media_type: 'person'
  known_for?: (Movie | TV)[]
  name?: string
  popularity?: number
}

export type SearchResults<T> = {
  page: number
  total_results: number
  total_pages: number
  results: T[]
}

export function getMediaProp<T>(
  item: Movie | TV | Person,
  propName: keyof Movie | keyof TV | keyof Person,
): T {
  return (item as any)[propName]
}

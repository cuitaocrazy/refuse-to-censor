import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'

import Grid from '~/components/Grid'
import SearchCard from '~/components/SearchCard'
import useIntersection from '~/hook/useIntersection'
import useTmdbQuery from '~/hook/useTmdbQuery'
import { searchMovie, searchMulti } from '~/services/tmdb.server'
import { searchTv } from '~/services/tmdb.server'
import type { Movie, Person, SearchResults, TV } from '~/services/tmdb_models'

function getCtg(ctg: string | null) {
  return (ctg || 'multi') as 'multi' | 'movie' | 'tv'
}

export async function loader(args: LoaderArgs) {
  const searchParams = new URL(args.request.url).searchParams
  const ctg = getCtg(searchParams.get('ctg'))
  searchParams.delete('ctg')
  searchParams.delete('_data')

  let results: SearchResults<TV | Movie | Person>

  if (ctg === 'tv') {
    results = await searchTv(searchParams)
  } else if (ctg === 'movie') {
    results = await searchMovie(searchParams)
  } else {
    results = await searchMulti(searchParams)
  }

  return json(results)
}

export const meta: MetaFunction = () => {
  return {
    title: 'Search',
  }
}

export default function Search() {
  const [searchParams] = useSearchParams()
  const ctg = getCtg(searchParams.get('ctg'))
  const { fetchMore, results, isLoading, hasMore } = useTmdbQuery<
    TV | Movie | Person
  >()
  const ref = useIntersection(fetchMore, isLoading, hasMore)
  const cards = results.map((result, idx) => {
    return (
      <SearchCard
        ref={idx === results.length - 1 ? ref : undefined}
        key={result.id}
        ctg={ctg}
        item={result}
      />
    )
  })

  return (
    <div className="m-8">
      <Grid>{cards}</Grid>
      {!hasMore && <h2 className="h-16 text-center">no more</h2>}
      {isLoading && <h2 className="h-16 text-center">loading...</h2>}
    </div>
  )
}

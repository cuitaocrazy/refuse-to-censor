import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { getMovieDetails } from '~/services/tmdb.server'
import type { MovieDetails } from '~/services/tmdb_models'

export async function loader({ params }: LoaderArgs) {
  const { id } = params
  const numberId = Number(id)

  if (isNaN(numberId)) {
    return json({ error: 'id error' }, { status: 404 })
  }

  const data = await getMovieDetails(numberId)

  return json(data)
}

export default function Movie() {
  const data = useLoaderData<MovieDetails>()
  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={data.title}
      ></img>
      <h1>{data.title}</h1>
      {data.genres &&
        data.genres.map((genre) => <span key={genre.id}>{genre.name}</span>)}
      <p>{data.overview}</p>
      <p>{data.release_date}</p>
      <p>{data.vote_average}</p>
    </div>
  )
}

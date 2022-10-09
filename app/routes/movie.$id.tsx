import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import Grid from '~/components/Grid'
import LinkCard from '~/components/LinkCard'
import { getMovieCredits, getMovieDetails } from '~/services/tmdb.server'
import { getImageUrl } from '~/utils'

export async function loader({ params }: LoaderArgs) {
  const { id } = params
  const numberId = Number(id)

  if (isNaN(numberId)) {
    throw json({ error: 'id error' }, { status: 404 })
  }

  const [movie, credits] = await Promise.all([
    getMovieDetails(numberId),
    getMovieCredits(numberId),
  ])

  credits.cast = credits.cast.reduce((s, e) => {
    const f = s.find((v) => v.id === e.id)

    if (f) {
      f.character += ` / ${e.character}`
    } else {
      s.push(e)
    }
    return s
  }, [] as typeof credits.cast)

  credits.crew = credits.crew.reduce((s, e) => {
    const f = s.find((v) => v.id === e.id)

    if (f) {
      f.job += ` / ${e.job}`
    } else {
      s.push(e)
    }
    return s
  }, [] as typeof credits.crew)

  return json({ movie, credits })
}

export default function Movie() {
  const data = useLoaderData<typeof loader>()
  return (
    <div>
      <img
        src={getImageUrl(data.movie.poster_path, 200)}
        alt={data.movie.title}
      ></img>
      <h1>{data.movie.title}</h1>
      {data.movie.genres &&
        data.movie.genres.map((genre) => (
          <span key={genre.id}>{genre.name}</span>
        ))}
      <p>{data.movie.overview}</p>
      <p>{data.movie.release_date}</p>
      <p>{data.movie.vote_average}</p>
      <p>参演</p>
      <Grid>
        {data.credits.cast.map((cast) => {
          return (
            <LinkCard
              id={cast.id}
              key={cast.id}
              alt={cast.name || ''}
              img={getImageUrl(cast.profile_path, 200)}
              adult={cast.adult || false}
              type="person"
            >
              <div className="m-2">
                <h5 className="text-sm text-gray-900">{cast.name}</h5>
                <p className="text-xs text-gray-600">{cast.character}</p>
              </div>
            </LinkCard>
          )
        })}
      </Grid>
      <p>剧组</p>
      <Grid>
        {data.credits.crew.map((crew) => {
          return (
            <LinkCard
              id={crew.id}
              key={crew.id}
              alt={crew.name || ''}
              img={getImageUrl(crew.profile_path, 200)}
              adult={crew.adult || false}
              type="person"
            >
              <div className="m-2">
                <h5 className="text-sm text-gray-900">{crew.name}</h5>
                <p className="text-xs text-gray-600">{crew.job}</p>
              </div>
            </LinkCard>
          )
        })}
      </Grid>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  )
}

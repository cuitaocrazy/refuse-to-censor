import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'

import Grid from '~/components/Grid'
import LinkCard from '~/components/LinkCard'
import { getTvCredits, getTvDetails } from '~/services/tmdb.server'
import { getImageUrl } from '~/utils'

export async function loader({ params }: LoaderArgs) {
  const { id } = params
  const numberId = Number(id)

  if (isNaN(numberId)) {
    throw json({ error: 'id error' }, { status: 404 })
  }

  const [tv, credits] = await Promise.all([
    getTvDetails(numberId),
    getTvCredits(numberId),
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

  return json({ tv, credits })
}

export default function TV() {
  const data = useLoaderData<typeof loader>()
  return (
    <div>
      <img src={getImageUrl(data.tv.poster_path, 200)} alt={data.tv.name}></img>
      <h1>{data.tv.name}</h1>
      {data.tv.genres &&
        data.tv.genres.map((genre) => <span key={genre.id}>{genre.name}</span>)}
      <p>{data.tv.overview}</p>
      <p>{data.tv.first_air_date}</p>
      <p>{data.tv.vote_average}</p>
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

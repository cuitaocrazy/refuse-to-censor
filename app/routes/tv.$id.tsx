import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'

import Grid from '~/components/Grid'
import LinkCard from '~/components/LinkCard'
import { getTvCredits, getTvDetails } from '~/services/tmdb.server'
import { aggObj, getImageUrl } from '~/utils'

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

  credits.cast = aggObj(credits.cast, 'character')
  credits.crew = credits.crew.filter((item) => item.job === 'Director')
  credits.crew = aggObj(credits.crew, 'job')

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
      <Grid min={96}>
        {data.credits.cast.map((cast) => {
          return (
            <LinkCard
              id={cast.id}
              key={cast.id}
              alt={cast.name || ''}
              img={getImageUrl(cast.profile_path, 92)}
              adult={cast.adult || false}
              type="person"
              cardWidth="w-24"
              imgHeight="h-32"
            >
              <div className="m-1">
                <h5 className="text-xs text-gray-900">{cast.name}</h5>
                <p className="text-xs text-gray-600">{cast.character}</p>
              </div>
            </LinkCard>
          )
        })}
      </Grid>
      <p>剧组</p>
      <Grid min={96}>
        {data.credits.crew.map((crew) => {
          return (
            <LinkCard
              id={crew.id}
              key={crew.id}
              alt={crew.name || ''}
              img={getImageUrl(crew.profile_path, 92)}
              adult={crew.adult || false}
              type="person"
              cardWidth="w-24"
              imgHeight="h-32"
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

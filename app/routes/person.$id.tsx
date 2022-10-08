import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'

import {
  getMovieCreditsByPersonId,
  getPersonDetails,
  getTvCreditsByPersonId,
} from '~/services/tmdb.server'
import type { PersonDetails } from '~/services/tmdb_models'

export async function loader({ params }: LoaderArgs) {
  const { id } = params
  const numberId = Number(id)

  if (isNaN(numberId)) {
    return json({ error: 'id error' }, { status: 404 })
  }

  const person = await getPersonDetails(numberId)
  const movieCredits = await getMovieCreditsByPersonId(numberId)
  const tvCredits = await getTvCreditsByPersonId(numberId)

  return json({
    person,
    movieCredits,
    tvCredits,
  })
}

export default function Person() {
  const data = useLoaderData<PersonDetails>()

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

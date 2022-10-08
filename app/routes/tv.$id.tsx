import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'

import { getTvDetails } from '~/services/tmdb.server'
import type { TVDetails } from '~/services/tmdb_models'

export async function loader({ params }: LoaderArgs) {
  const { id } = params
  const numberId = Number(id)

  if (isNaN(numberId)) {
    return json({ error: 'id error' }, { status: 404 })
  }

  const data = await getTvDetails(numberId)

  return json(data)
}

export default function TV() {
  const data = useLoaderData<TVDetails>()
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

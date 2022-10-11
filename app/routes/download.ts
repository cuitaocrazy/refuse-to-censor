import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import fetch from 'node-fetch'

const baseUrl = 'http://localhost:8080/api/v2'
const loginUrl = `${baseUrl}/auth/login`
const logoutUrl = `${baseUrl}/auth/logout`
const getTorrenListUrl = `${baseUrl}/torrents/info`
const addTorrentUrl = `${baseUrl}/torrents/add`

export async function loader({ request }: LoaderArgs) {
  const magnet = new URL(request.url).searchParams.get('magnet')

  if (!magnet) {
    throw json({ error: 'Missing magnet' }, { status: 400 })
  }

  let res = await fetch(loginUrl, {
    method: 'POST',
    body: 'username=admin&password=adminadmin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  const cookies = res.headers.get('set-cookie')

  // res = await fetch(getTorrenListUrl, {
  //   headers: {
  //     Cookie: cookies!,
  //   },
  // })
  // const results = await res.json()

  // console.log(results)

  res = await fetch(logoutUrl, {
    method: 'POST',
    headers: {
      Cookie: cookies!,
    },
  })

  const formData = new FormData()
  formData.append('urls', magnet)
  formData.append('savepath', '/downloads/test')
  formData.append('category', 'movies')

  res = await fetch(addTorrentUrl, {
    method: 'POST',
    body: formData,
    headers: {
      Cookie: cookies!,
    },
  })

  console.log(await res.text())

  // console.log(magnet)

  return json(await res.text(), { status: 200 })
}

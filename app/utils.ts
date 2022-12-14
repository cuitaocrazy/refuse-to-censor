import { useMatches } from '@remix-run/react'
import { useMemo } from 'react'

import type { User } from '~/models/user.server'

const DEFAULT_REDIRECT = '/'

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT,
) {
  if (!to || typeof to !== 'string') {
    return defaultRedirect
  }

  if (!to.startsWith('/') || to.startsWith('//')) {
    return defaultRedirect
  }

  return to
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string,
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches()
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id],
  )
  return route?.data
}

function isUser(user: any): user is User {
  return user && typeof user === 'object' && typeof user.email === 'string'
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData('root')
  if (!data || !isUser(data.user)) {
    return undefined
  }
  return data.user
}

export function useUser(): User {
  const maybeUser = useOptionalUser()
  if (!maybeUser) {
    throw new Error(
      'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.',
    )
  }
  return maybeUser
}

export function validateEmail(email: unknown): email is string {
  return typeof email === 'string' && email.length > 3 && email.includes('@')
}

export function getImageUrl(path: string | undefined, width: number): string {
  if (!path) return '/1665px-No-Image-Placeholder.png'
  return `https://image.tmdb.org/t/p/w${width}${path}`
}

export const genres = {
  28: '??????',
  12: '??????',
  16: '??????',
  35: '??????',
  80: '??????',
  99: '?????????',
  18: '??????',
  10751: '??????',
  14: '??????',
  36: '??????',
  27: '??????',
  10402: '??????',
  9648: '??????',
  10749: '??????',
  878: '??????',
  10770: '????????????',
  53: '??????',
  10752: '??????',
  37: '??????',
}

export function aggObj<T extends { id: number }, K extends keyof T>(
  arr: T[],
  key: K,
) {
  return arr.reduce((acc, cur) => {
    const f = acc.find((item) => item.id === cur.id)
    if (f) {
      f[key] = (f[key] + ' / ' + cur[key]) as T[K]
    } else {
      acc.push(cur)
    }
    return acc
  }, [] as T[])
}

export function getSizeDisplay(size: number) {
  if (size < 1024) {
    return size + ' B'
  }
  if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  }
  if (size < 1024 * 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + ' MB'
  }
  return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
}

export function generateMagnetLink(
  hash: string,
  name: string,
  trackers: string[] = [],
) {
  const trackersStr = trackers.map((tracker) => `&tr=${tracker}`).join('')
  return `magnet:?xt=urn:btih:${hash}&dn=${name}${trackersStr}`
}

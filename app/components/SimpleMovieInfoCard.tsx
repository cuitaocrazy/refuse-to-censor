import { Link } from '@remix-run/react'
import clsx from 'clsx'
import React from 'react'

import type { Movie, Person, TV } from '~/services/tmdb_models'
import { getMediaProp } from '~/services/tmdb_models'
import { getImageUrl } from '~/utils'

interface SimpleMovieInfoCardProps {
  item: Movie | TV | Person
  ctg: 'movie' | 'tv' | 'multi'
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  )
}

function MovieIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
      />
    </svg>
  )
}

function TVIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
      />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  )
}
//  rounded-lg transition duration-150 ease-in-out hover:scale-105 hover:shadow-lg
export default React.forwardRef<HTMLElement, SimpleMovieInfoCardProps>(
  function SimpleMovieInfoCard({ item, ctg }, ref) {
    const title: string | undefined =
      getMediaProp(item, 'title') || getMediaProp(item, 'name')
    const imagePath: string | undefined = getMediaProp(item, 'poster_path')
    const itemType = ctg === 'multi' ? item.media_type : ctg
    const voteAverage: number = getMediaProp(item, 'vote_average') || 0
    const releaseDate: string | undefined =
      getMediaProp(item, 'release_date') || getMediaProp(item, 'first_air_date')
    const adult: boolean = getMediaProp(item, 'adult')

    const icon = React.useMemo(() => {
      const cls = clsx(
        'h-8 w-8',
        'absolute right-2 top-2 rounded-full border-2 bg-gray-400 p-1 bg-opacity-50 text-gray-700',
        {
          'border-yellow-300': adult,
          'border-transparent': !adult,
        },
      )

      switch (itemType) {
        case 'movie':
          return <MovieIcon className={cls} />
        case 'tv':
          return <TVIcon className={cls} />
        case 'person':
          return <PersonIcon className={cls} />
        default:
          return <MovieIcon className={cls} />
      }
    }, [adult, itemType])

    const transitionCls = clsx('transition-all duration-200 ease-in-out')

    return (
      <Link
        className={clsx(
          'group relative w-48 overflow-auto rounded-lg border border-gray-200 focus-within:shadow-lg hover:shadow-lg',
          transitionCls,
        )}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        to={`/${itemType}/${item.id}`}
      >
        <img
          className={clsx(
            'h-72 w-48 object-cover group-hover:brightness-90',
            transitionCls,
          )}
          src={
            imagePath
              ? getImageUrl(imagePath, 200)
              : '/1665px-No-Image-Placeholder.png'
          }
          alt={title}
        />
        <div className="m-2">
          <h5 className="text-sm text-gray-900">{title}</h5>
          <p className="text-xs text-gray-600">{releaseDate}</p>
          <p className="flex items-center gap-1 text-xs text-gray-600">
            <StarIcon className="h-4 w-4" />
            {voteAverage}
          </p>
        </div>
        {icon}
      </Link>
    )
  },
)

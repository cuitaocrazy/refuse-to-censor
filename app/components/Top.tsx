import { Form, useSearchParams, useTransition } from '@remix-run/react'
import clsx from 'clsx'
export default function Top() {
  const [searchParams] = useSearchParams()
  const searchKeyWord = searchParams.get('query') || ''
  const ctg = searchParams.get('ctg') || undefined
  const language = searchParams.get('language') || undefined
  const includeAdult = searchParams.get('include_adult') === 'true'
  const { state } = useTransition()

  return (
    <div>
      <div className="w-full">
        <div
          className={clsx('h-[2px] w-0 bg-indigo-400', {
            'load-req-at': state !== 'idle',
            'load-res-at': state === 'idle',
          })}
        ></div>
      </div>
      <Form action="/search">
        <select name="language" defaultValue={language}>
          <option value="zh-CN">zh-CN</option>
          <option value="en-US">en-US</option>
          <option value="ja-JP">ja-JP</option>
        </select>
        <select name="ctg" defaultValue={ctg}>
          <option value="multi">Multi</option>
          <option value="movie">Movie</option>
          <option value="tv">TV</option>
        </select>
        <input
          type="checkbox"
          name="include_adult"
          defaultChecked={includeAdult}
          value="true"
        />
        <input
          type="text"
          name="query"
          placeholder="input search word"
          defaultValue={searchKeyWord}
        />
        <button type="submit">Search</button>
      </Form>
    </div>
  )
}

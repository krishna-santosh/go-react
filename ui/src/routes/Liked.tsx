import { useEffect, useState } from 'react'
import type { Joke } from '../types/Joke'
import { Link } from 'react-router-dom'

const LikedJokes = () => {
  const [jokes, setJokes] = useState<Joke[]>()

  const fetchJokes = async () => {
    const resp = (await (
      await fetch('http://localhost:9000/api/jokes/')
    ).json()) as Joke[]
    setJokes(resp.reverse())
  }

  const deleteJoke = async (id: string) => {
    fetch(`http://localhost:9000/api/jokes/${id}/delete`, {
      method: 'DELETE',
    })
    setJokes(jokes?.filter((joke) => joke.id !== id))
  }

  useEffect(() => {
    fetchJokes()
  }, [])

  return (
    <div className="mx-auto my-10 flex w-4/5 flex-col items-center justify-start gap-y-3">
      <Link className="link-accent link place-self-start" to={'/'}>
        Home
      </Link>

      <div className="flex flex-col gap-y-3">
        {jokes?.map((joke) => (
          <div
            key={joke.id}
            className="grid grid-cols-6 gap-0.5 rounded-xl border px-2 py-1 sm:gap-1"
          >
            <p className="col-span-4 sm:col-span-5">{joke.joke} </p>
            <button
              onClick={() => deleteJoke(joke.id)}
              className="btn btn-neutral col-span-2 place-self-end sm:col-span-1 sm:place-self-auto "
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LikedJokes

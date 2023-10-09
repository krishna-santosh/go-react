import { Link } from 'react-router-dom'
import type { Joke } from '../types/Joke'
import { useEffect, useState } from 'react'

const Home = () => {
  const [joke, setJoke] = useState<Joke>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getNewJoke = async () => {
    setIsLoading(true)
    const resp = await (
      await fetch('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      })
    ).json()
    setIsLoading(false)
    setJoke(resp)
  }

  const likeJoke = async (joke: Joke) => {
    const resp = fetch(`http://localhost:9000/api/jokes/${joke.id}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ joke: joke.joke }),
    })

    if ((await resp).ok) {
      alert('Liked')
    } else {
      alert('Something went wrong :/')
    }
  }

  useEffect(() => {
    getNewJoke()
  }, [])

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-y-5">
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <h1 className="mx-3 text-xl">{joke?.joke}</h1>
      )}

      <div className="flex items-center justify-center gap-x-3">
        <button onClick={() => likeJoke(joke!)} className="btn btn-secondary">
          Like
        </button>
        <button onClick={() => getNewJoke()} className="btn btn-primary">
          Get New Joke
        </button>
      </div>

      <Link className="link-accent link" to={'/liked'}>
        Liked
      </Link>
    </div>
  )
}

export default Home

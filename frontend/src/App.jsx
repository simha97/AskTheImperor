import { useState } from 'react'
import './index.css'

function App() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const apiUrl = import.meta.env.VITE_API_URL


  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setAnswer("")

    fetch(`${apiUrl}/ask?query=${encodeURIComponent(question)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server error")
        }
        return res.json()
      })
      .then((data) => setAnswer(data.answer))
      .catch((err) => {
        console.error('Fetch error:', err)
        setError("Something went wrong. Please try again.")
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="min-h-screen  bg-opacity-70 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header with Roman styling */}
        <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-6">
        <h1 className="text-4xl font-serif font-bold text-amber-900 mb-2 tracking-wide">
            MARCUS. AURELIUS ANTONIUS
          </h1>


          </div>
          <p className="text-lg font-serif text-amber-800 italic">
            Words of wisdom from the Philosopher Emperor, based on his reflections in <span className='not-italic bold'>Meditations</span>.
          </p>
          <div className="mt-6 h-1 bg-amber-700 w-24 mx-auto"></div>
        </div>

        {/* Question form */}
        <form onSubmit={handleSubmit} className="mb-12">
          <div className="flex shadow-lg rounded-lg overflow-hidden border border-amber-300">
            <input
              className="flex-grow px-6 py-4 font-serif text-amber-900 bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Ask your question to the Emperor..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-4 bg-amber-700 text-black font-serif hover:bg-amber-800 transition-colors duration-200"
              disabled={loading}
            >
              {loading ? 'Consulting...' : 'Seek Wisdom'}
            </button>
          </div>
        </form>

        {/* Answer section */}
        <div className="bg-white bg-opacity-80 border-l-4 border-amber-600 p-8 shadow-md mb-8 min-h-[200px] flex items-center justify-center">
          {loading ? (
            <svg
              className="animate-spin h-8 w-8 text-amber-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0H4z"
              ></path>
            </svg>
          ) : error ? (
            <p className="text-red-500 font-serif">{error}</p>
          ) : answer ? (
            <div className="w-full">
              <div className="flex items-start">
                <p className="text-lg font-serif text-gray-800 italic">{answer}</p>
              </div>
              <div className="mt-4 text-right text-amber-700 font-serif">
                — Marcus Aurelius
              </div>
            </div>
          ) : (
            <p className="font-serif text-amber-700 italic">Your answer will appear here...</p>
          )}
        </div>

        {/* Decorative elements */}
          
          <div className="text-lg text-center font-serif text-amber-700 italic mb-5">
            Wisdom · Justice · Fortitude · Temperance
          </div>
          <p className="text-sm text-center font-serif text-amber-700 italic mt-4">
  A website by Simon Hallak ·{" "}
  <a
    href="https://github.com/simha97"
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-amber-900"
  >
    GitHub
  </a>{" "}
  ·{" "}
  <a
    href="https://www.simonhallak.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-amber-900"
  >
    Portfolio
  </a>
</p>
          
      </div>
    </div>
  )
}

export default App
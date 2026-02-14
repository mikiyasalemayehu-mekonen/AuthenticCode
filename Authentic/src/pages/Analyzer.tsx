import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { analyzeRepo } from '../services/github'

export default function Analyze() {
  const loc = useLocation()
  const data = (loc.state ?? {}) as any
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (data?.repoUrl) {
      setLoading(true)
      analyzeRepo(data.repoUrl)
        .then((r) => setResult(r))
        .catch((e) => setError(String(e)))
        .finally(() => setLoading(false))
    }
  }, [data])

  return (
    <section>
      <h2>Analysis</h2>
      {data ? (
        <div>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
          <p><strong>Tech:</strong> {data.tech}</p>
          <p><strong>GitHub:</strong> {data.repoUrl ?? '—'}</p>

          {loading && <p>Analyzing repository…</p>}
          {error && <p style={{ color: 'crimson' }}>{error}</p>}

          {result && (
            <div>
              <h4>Repo Summary</h4>
              <p><strong>Name:</strong> {result.full_name}</p>
              <p><strong>Stars:</strong> {result.stargazers_count}</p>
              <p><strong>Languages:</strong> {Object.keys(result.languages || {}).join(', ')}</p>

              <h4>Feedback</h4>
              <ul>
                {result.stargazers_count > 0 ? (
                  <li>Repository has community interest (stars).</li>
                ) : (
                  <li>Consider adding a README and examples to attract users.</li>
                )}
                {result.languages && result.languages['TypeScript'] && (
                  <li>TypeScript detected — good for maintainability.</li>
                )}
                {result.open_issues_count > 10 && (
                  <li>There are many open issues — consider triage.</li>
                )}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>No submission data found. Go back to Home and submit the form.</p>
      )}
    </section>
  )
}

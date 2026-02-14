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
    <section className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Analysis Results</h2>
      {data ? (
        <div className="space-y-6">
          <div className="bg-card border rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">{data.title}</h3>
            <p className="text-muted-foreground mb-4">{data.description}</p>
            <div className="flex gap-6 text-sm">
              <p><span className="font-medium">Tech:</span> {data.tech}</p>
              <p><span className="font-medium">GitHub:</span> {data.repoUrl ?? '—'}</p>
            </div>
          </div>

          {loading && <div className="bg-card border rounded-lg p-6 text-center">Analyzing repository…</div>}
          {error && <div className="bg-destructive/10 border border-destructive rounded-lg p-6 text-destructive">{error}</div>}

          {result && (
            <div className="bg-card border rounded-lg p-6 shadow-lg space-y-6">
              <div>
                <h4 className="text-xl font-semibold mb-4">Repository Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p><span className="font-medium">Name:</span> {result.full_name}</p>
                  <p><span className="font-medium">Stars:</span> {result.stargazers_count}</p>
                  <p className="col-span-2"><span className="font-medium">Languages:</span> {Object.keys(result.languages || {}).join(', ')}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">Feedback</h4>
                <ul className="space-y-2">
                  {result.stargazers_count > 0 ? (
                    <li className="flex items-start gap-2"><span className="text-primary">✓</span> Repository has community interest (stars).</li>
                  ) : (
                    <li className="flex items-start gap-2"><span className="text-muted-foreground">•</span> Consider adding a README and examples to attract users.</li>
                  )}
                  {result.languages && result.languages['TypeScript'] && (
                    <li className="flex items-start gap-2"><span className="text-primary">✓</span> TypeScript detected — good for maintainability.</li>
                  )}
                  {result.open_issues_count > 10 && (
                    <li className="flex items-start gap-2"><span className="text-muted-foreground">•</span> There are many open issues — consider triage.</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-card border rounded-lg p-12 text-center">
          <p className="text-muted-foreground">No submission data found. Go back to Home and submit the form.</p>
        </div>
      )}
    </section>
  )
}

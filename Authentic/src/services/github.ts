// Service: GitHub repository analyzer
// Exports `analyzeRepo(repoUrl)` which fetches repository metadata
// and languages from the public GitHub API.

type RepoResult = {
  full_name: string
  stargazers_count: number
  open_issues_count: number
  languages?: Record<string, number>
  [key: string]: any
}

function parseOwnerRepo(repoUrl: string) {
  // Accept formats like:
  // - https://github.com/owner/repo
  // - git@github.com:owner/repo.git
  // - owner/repo
  const githubMatch = repoUrl.match(/github\.com[:/]+([^/\s]+)\/([^/\s]+)(?:\.git)?/i)
  if (githubMatch) {
    return { owner: githubMatch[1], repo: githubMatch[2].replace(/\.git$/i, '') }
  }

  const parts = repoUrl.split('/').filter(Boolean)
  if (parts.length === 2) {
    return { owner: parts[0], repo: parts[1].replace(/\.git$/i, '') }
  }

  throw new Error('Invalid GitHub repository URL or "owner/repo" string')
}

export async function analyzeRepo(repoUrl: string): Promise<RepoResult> {
  const { owner, repo } = parseOwnerRepo(repoUrl)

  const repoResp = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
  if (!repoResp.ok) {
    const text = await repoResp.text().catch(() => '')
    throw new Error(`Failed to fetch repository: ${repoResp.status} ${repoResp.statusText} ${text}`)
  }

  const repoJson = (await repoResp.json()) as any

  // Fetch languages (separate endpoint)
  const langResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`)
  let languages: Record<string, number> | undefined = undefined
  if (langResp.ok) {
    languages = (await langResp.json()) as Record<string, number>
  }

  const result: RepoResult = {
    full_name: repoJson.full_name,
    stargazers_count: repoJson.stargazers_count ?? 0,
    open_issues_count: repoJson.open_issues_count ?? 0,
    languages,
    ...repoJson,
  }

  return result
}

export default analyzeRepo

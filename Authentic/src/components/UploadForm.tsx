import { useState } from 'react'

type Props = {
  onDone: (data: any) => void
}

export default function UploadForm({ onDone }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tech, setTech] = useState('')
  const [repoUrl, setRepoUrl] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    onDone({ title, description, tech, repoUrl })
  }

  return (
    <div>
    <form onSubmit={submit} className="upload-form">
      <label>
         Job title
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>



      <label>
        Short description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>

      <label>
        Tech stack (comma separated)
        <input value={tech} onChange={(e) => setTech(e.target.value)} />
      </label>

      <label>
        GitHub repo URL
        <input value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} placeholder="https://github.com/owner/repo" />
      </label>

      <div>
        <button type="submit">Analyze</button>
      </div>
    </form>
    </div>
  )
}

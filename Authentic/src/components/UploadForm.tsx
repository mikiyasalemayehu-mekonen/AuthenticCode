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
    <form onSubmit={submit} className="bg-card border rounded-lg p-8 shadow-lg space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Job Title
        </label>
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Short Description
        </label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          rows={4}
          className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Tech Stack (comma separated)
        </label>
        <input 
          value={tech} 
          onChange={(e) => setTech(e.target.value)} 
          className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          GitHub Repo URL
        </label>
        <input 
          value={repoUrl} 
          onChange={(e) => setRepoUrl(e.target.value)} 
          placeholder="https://github.com/owner/repo" 
          className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Analyze Project
      </button>
    </form>
  )
}

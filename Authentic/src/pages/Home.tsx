import { useNavigate } from 'react-router-dom'
import UploadForm from '../components/UploadForm'

export default function Home() {
  const navigate = useNavigate()

  return (
    <section className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Share Your Project</h2>
        <p className="text-muted-foreground text-lg">Upload a description, tech stack, job title and a GitHub repo URL for feedback.</p>
      </div>
      <UploadForm onDone={(data) => navigate('/analyze', { state: data })} />
    </section>
  )
}

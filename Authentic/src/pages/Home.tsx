import { useNavigate } from 'react-router-dom'
import UploadForm from '../components/UploadForm'

export default function Home() {
  const navigate = useNavigate()

  return (
    <section>
      <h2>Share your project</h2>
      <p>Upload a description, tech stack, job title and a GitHub repo URL for feedback.</p>
      <UploadForm onDone={(data) => navigate('/analyze', { state: data })} />
    </section>
  )
}

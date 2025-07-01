
import { redirect } from '@/components/navigation'

const ProjectPage = () => {
  redirect({ href: '/app/projects/grid', locale: 'fr' })
  return null
}

export default ProjectPage
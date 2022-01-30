//Components
import Admin from '../components/roles/admin/admin'

const privateRoutes = [
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin,
    exact: true,
  },
]

export default privateRoutes

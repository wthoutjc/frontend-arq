//Components
import SessionExpired from '../components/errors/sessionExpired'

const publicRoutes = [
  {
    path: '/error',
    name: 'Error',
    component: SessionExpired,
    exact: true,
  },
]

export default publicRoutes

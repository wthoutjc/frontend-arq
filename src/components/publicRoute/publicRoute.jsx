import { Route, Redirect } from 'react-router-dom'

//Hook
import useUser from '../../hooks/useUser'

const PublicRoute = ({ render: Component, ...rest }) => {
  const { jwt } = useUser()

  let renderStatus = false
  let renderErrorStatus = false

  if (!jwt) {
    renderStatus = false
    renderErrorStatus = true
  } else {
    renderStatus = true
  }

  return (
    <Route {...rest}>
      {!renderStatus ? (
        <Component />
      ) : renderErrorStatus ? (
        <Redirect to="/error" />
      ) : (
        <Redirect to="/" />
      )}
    </Route>
  )
}

export default PublicRoute

import sessionContext from '../context/loginContext'
import { useHistory } from 'react-router-dom'
import { useState, useCallback, useContext, useRef } from 'react'

//Services
import loginService from '../services/loginService'
import logoutService from '../services/logoutService'

//URL States
import urlStates from './urlStates'

const useUser = () => {
  // Administración de JWT
  const { jwt, setJwt } = useContext(sessionContext)
  const [loginStatus, setLoginStatus] = useState({
    itsLogged: null,
    message: null,
  })

  // Estado global de URL de backend: prod or dev stage
  const urlGeneral = useRef(urlStates)

  // Redireccionamientos
  const history = useHistory()

  const login = useCallback(
    async ({ username, password, setLoading }) => {
      const url = `${urlGeneral.current}/log-in`
      try {
        setLoading(true)
        const data = await loginService({ username, password, url })
        if (data) {
          setLoading(false)
          if (data[1]) {
            setJwt(data[0])
            localStorage.setItem('jwt', data[0])
          } else {
            setJwt(null)
            localStorage.removeItem('jwt')
          }
          setLoginStatus({
            itsLogged: data[1],
            message: data[0],
          })
          return
        }
      } catch (error) {
        console.error(error)
        setJwt(null)
        localStorage.removeItem('jwt')
      }
    },
    [setJwt]
  )

  const logout = useCallback(
    async ({ setRender }) => {
      const url = `${urlGeneral.current}/revokeToken`
      try {
        setRender(true)
        const data = await logoutService(localStorage.getItem('jwt'), url)
        if (data) {
          setRender(false)
          localStorage.removeItem('jwt')
          setJwt(null)
        }
      } catch (error) {
        console.error(error)
        setJwt(null)
        localStorage.removeItem('jwt')
      }
    },
    [setJwt]
  )

  return {
    jwt,
    loginStatus,
    login,
    logout,
  }
}

export default useUser

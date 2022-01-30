import sessionContext from '../context/loginContext'
import { useHistory } from 'react-router-dom'
import { useState, useCallback, useContext, useRef } from 'react'

//Services
import loginService from '../services/loginService'

//URL States
import urlStates from './urlStates'

const useUser = () => {
  // Administración de JWT
  const { jwt, setJwt } = useContext(sessionContext)
  const [infoUser, setInfoUser] = useState({
    logged: null,
    message: null,
  })

  // Estado global de URL de backend: prod or dev stage
  const urlGeneral = useRef(urlStates)

  // Redireccionamientos
  const history = useHistory()

  const login = useCallback(
    async ({ username, password, setLoading }) => {
      const url = `${urlGeneral.current}/log-in`
      console.log('LOGIN')
      try {
        setLoading(true)
        const data = await loginService({ username, password, url })
        if (data) {
          setLoading(false)
          if (data[1]) {
            setJwt(await data[0])
            localStorage.setItem('jwt', data[0])
          } else {
            setJwt(null)
            localStorage.removeItem('jwt')
          }
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
    infoUser,
    login,
  }
}

export default useUser

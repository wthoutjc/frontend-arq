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

  const logout = useCallback(
    async ({ setRender, setRenderError }) => {
      const url = `${urlGeneral.current}/revokeToken`
      try {
        setRender(true)
        const data = await logoutService(localStorage.getItem('jwt'), url)
        if (data) {
          setRender(false)
          localStorage.removeItem('jwt')
          setJwt(null)
        } else {
          setRenderError(true)
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
    login,
    logout,
  }
}

export default useUser

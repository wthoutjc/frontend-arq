import { useRef, useCallback } from 'react'

// Services
import getService from '../services/getService'
import postService from '../services/postService'

//URL States
import urlStates from './urlStates'

const useAlert = () => {
  // Estado global de URL de backend: prod or dev stage
  const urlGeneral = useRef(urlStates)

  const getAlerts = useCallback(async ({ setRender }) => {
    const url = `${urlGeneral.current}/getalerts`
    try {
      setRender(true)
      const data = await getService({ url })
      if (data) {
        setRender(false)
        return data
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  const configDateAlert = useCallback(
    async ({ setRender, idDispositivo, startDate, endDate }) => {
      const url = `${urlGeneral.current}/setdate`
      try {
        setRender(true)
        const params = { idDispositivo, startDate, endDate }
        const data = await postService({ url, params })
        if (data) {
          setRender(false)
          return data
        }
      } catch (error) {
        console.error(error)
      }
    },
    []
  )

  const getDateAlert = useCallback(async ({ setRender, idDispositivo }) => {
    const url = `${urlGeneral.current}/getdate/${idDispositivo}`
    try {
      setRender(true)
      const data = await getService({ url })
      if (data) {
        setRender(false)
        return data
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  return { getAlerts, configDateAlert, getDateAlert }
}

export default useAlert

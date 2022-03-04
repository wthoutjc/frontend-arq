import { useRef, useCallback } from 'react'

// Services
import getService from '../services/getService'

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

  return { getAlerts }
}

export default useAlert

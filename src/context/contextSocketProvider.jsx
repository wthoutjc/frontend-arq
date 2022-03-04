import { createContext, useState, useEffect, useRef } from 'react'
import client from 'socket.io-client'

const SocketContext = createContext({})

import urlStates from '../hooks/urlStates'

export function ContextSocketProvider({ children }) {
  const urlGeneral = useRef(urlStates)

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socketClient = client(
      `${urlGeneral.current}`
      // {
      //   transports: ['websocket'], // forces websockets only
      //   withCredentials: true,
      //   extraHeaders: {
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Credentials': true,
      //   },
      // }
    ) //client(`${urlGeneral.current}`)
    console.log(socketClient)
    setSocket(socketClient)
  }, [])
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContext

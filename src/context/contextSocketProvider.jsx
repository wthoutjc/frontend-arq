import { createContext, useState, useEffect, useRef } from 'react'
import client from 'socket.io-client'

const SocketContext = createContext({})

import urlStates from '../hooks/urlStates'

export function ContextSocketProvider({ children }) {
  const urlGeneral = useRef(urlStates)

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socketClient = client(
      `wss://4dytxurnu4.execute-api.sa-east-1.amazonaws.com/dev`,
      // {
      //   path: '/dev/socket.io/',
      //   withCredentials: true,
      //   extraHeaders: {
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Credentials': true,
      //   },
      //   // ContentType: 'application/json',
      //   // 'Access-Control-Allow-Credentials': true,
      // }
      {
        path: '/dev/socket.io/',
        transports: ['websocket'], // forces websockets only
      }
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

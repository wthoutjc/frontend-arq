import { createContext, useState, useEffect, useRef } from 'react'
import client from 'socket.io-client'

const SocketContext = createContext({})

import urlStates from '../hooks/urlStates'

export function ContextSocketProvider({ children }) {
  const urlGeneral = useRef(urlStates)

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const SOCKET_URI = urlGeneral.current // process.env.REACT_APP_SOCKET
    const socketClient = client(SOCKET_URI)
    setSocket(socketClient)
  }, [])
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContext

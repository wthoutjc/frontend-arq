import { createContext, useState, useEffect } from 'react'
import client from 'socket.io-client'

const SocketContext = createContext({})

export function ContextSocketProvider({ children }) {
  const [socket, setSocket] = useState(null)
  useEffect(() => {
    const SOCKET_URI = 'http://127.0.0.1:5000/' // process.env.REACT_APP_SOCKET https://uzefv11poj.execute-api.sa-east-1.amazonaws.com/prod
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

import { useState, createContext } from 'react'

const sessionContext = createContext({})

export function UserContextProvider({ children }) {
  const [jwt, setJwt] = useState(() => localStorage.getItem('jwt'))

  return (
    <sessionContext.Provider value={{ jwt, setJwt }}>
      {children}
    </sessionContext.Provider>
  )
}

export default sessionContext

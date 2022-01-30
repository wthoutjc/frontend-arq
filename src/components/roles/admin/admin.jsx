import { useState } from 'react'

// Components
import Navbar from '../../layout/Navbar'
import Test from '../../Tests/test'
import LoadingServer from '../../loaders/loadingServer'

// Socket: Context
import { ContextSocketProvider } from '../../../context/contextSocketProvider'

const Admin = () => {
  const [render, setRender] = useState(false)
  return (
    <>
      <ContextSocketProvider>
        <LoadingServer render={render} />
        <div className="admin">
          <Navbar setRender={setRender} />
          <div className="content-app">
            <h1>ADMIN</h1>
            <div className="app">
              <h1> Security Web App </h1>
              <Test />
            </div>
          </div>
        </div>
      </ContextSocketProvider>
    </>
  )
}

export default Admin

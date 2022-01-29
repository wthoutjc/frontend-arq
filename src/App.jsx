import { ContextSocketProvider } from './context/contextSocketProvider'

//Components
import Test from './components/Tests/test'

const App = () => {
  return (
    <ContextSocketProvider>
      <div className="app">
        <h1> Security Web App </h1>
        <Test />
      </div>
    </ContextSocketProvider>
  )
}

export default App

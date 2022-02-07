import { useContext, useState } from 'react'
import SocketContext from '../../context/contextSocketProvider'
const Test = () => {
  const [globalState, setGlobalState] = useState(null)
  const { socket } = useContext(SocketContext)

  const handleSendMessage = () => {
    socket.emit(
      'messages',
      JSON.stringify({
        payload: null,
        message: 'Testeo desde Front',
      })
    )
  }

  if (socket) {
    socket.on('new_number', (res) => {
      console.log(res)
    })

    // socket.onopen = (e) => {
    //   console.log(`Connected!`)
    // }

    socket.on('message', (res) => {
      const { message } = res || null
      console.log(res)
      console.log(message)
      setGlobalState(message)
    })
  }

  return (
    <>
      <button onClick={handleSendMessage}>INTERACTION</button>
      <h3>State: {globalState} </h3>
    </>
  )
}

export default Test

import { useContext } from 'react'
import SocketContext from '../../context/contextSocketProvider'
const Test = () => {
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

  return <button onClick={handleSendMessage}>INTERACTION</button>
}

export default Test

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

  if (socket) {
    socket.on('new_number', (res) => {
      console.log(res)
    })

    // socket.onopen = (e) => {
    //   console.log(`Connected!`)
    // }

    socket.on('message', (res) => {
      console.log(res)
    })
  }

  return <button onClick={handleSendMessage}>INTERACTION</button>
}

export default Test

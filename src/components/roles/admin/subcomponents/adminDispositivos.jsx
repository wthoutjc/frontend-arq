import { useContext, useState, useEffect } from 'react'
import SocketContext from '../../../../context/contextSocketProvider'
import '../../../../styles/admin/dispositivos.css'

// Components
import AdminAlert from './adminAlert'

// Icons
import * as MdIcons from 'react-icons/md'

// Helpers
import _arrayBufferToBase64 from '../../../../services/helpers/arrayBufferToBase64'

const imgWebcam = require('../../../../images/webcam.png')

const AdminDispositivos = () => {
  const [deviceStatus, setDeviceStatus] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  const { socket } = useContext(SocketContext)

  const [renderAlert, setRenderAlert] = useState(false)

  useEffect(() => {
    if (socket) {
      socket.on('alert', (res) => {
        setDeviceStatus(true)
        setCurrentImage(
          `data:image/png;base64,${_arrayBufferToBase64(res.image)}`
        )
      })
    }
  }, [socket])

  if (renderAlert)
    return <AdminAlert img={currentImage} setRenderAlert={setRenderAlert} />

  return (
    <>
      <div className="dispositivo">
        <div className="settings-container">
          <button className="settings">
            <MdIcons.MdSettings />
          </button>
        </div>
        <div className="card">
          <div className={deviceStatus ? 'img-device danger' : 'img-device'}>
            <img src={imgWebcam} alt="security-device" />
          </div>
          <div className="status-device">
            <h4>
              ID: <p>camESP-@admin-nX745</p>
            </h4>
            <h4>
              Estado:
              <p
                className={
                  deviceStatus ? 'status-active danger' : 'status-active'
                }
              >
                ACTIVO {deviceStatus ? 'ALERTA' : 'OK'}
              </p>
            </h4>
          </div>
        </div>
        <div className="device-options">
          <button
            className={
              deviceStatus
                ? 'status-active danger danger-background'
                : 'status-active'
            }
            onClick={() => setRenderAlert(true)}
          >
            ENTRAR
          </button>
        </div>
      </div>
    </>
  )
}

export default AdminDispositivos

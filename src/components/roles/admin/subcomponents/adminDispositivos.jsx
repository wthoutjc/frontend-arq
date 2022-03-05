import { useContext, useState, useEffect, useRef } from 'react'
import SocketContext from '../../../../context/contextSocketProvider'
import '../../../../styles/admin/dispositivos.css'
import '../../../../styles/configFecha/configFecha.css'

// Components
import AdminAlert from './adminAlert'
import FechaModal from '../../../modal/fechaModal'
import LoadingServer from '../../../loaders/loadingServer'

// Hooks
import useModal from '../../../../hooks/useModal'
import useAlert from '../../../../hooks/useAlert'

// Icons
import * as MdIcons from 'react-icons/md'

// Helpers
import _arrayBufferToBase64 from '../../../../services/helpers/arrayBufferToBase64'
import { manageInputDate } from '../../../../services/helpers/dates'

const imgWebcam = require('../../../../images/webcam.png')

const ConfigFecha = ({ idDispositivo, setRenderFechaModal }) => {
  const [render, setRender] = useState(false)

  const { configDateAlert, getDateAlert } = useAlert()

  const [interval, setInterval] = useState({
    start: null,
    end: null,
  })

  const [renderNota, setRenderNota] = useState(false)

  const startInput = useRef()
  const endInput = useRef()

  useEffect(() => {
    getDateAlert({ setRender, idDispositivo }).then((res) => {
      if (res[1]) {
        startInput.current.value = manageInputDate(res[0][0])
        endInput.current.value = manageInputDate(res[0][1])
      } else {
        setRenderNota('Este dispositivo aún no tiene un intervalo configurado.')
      }
    })
  }, [getDateAlert, idDispositivo])

  const handleInterval = () => {
    if (interval.start > interval.end || !interval.start || !interval.end) {
      startInput.current.value = ''
      endInput.current.value = ''
      setInterval({
        start: null,
        end: null,
      })
      return alert('INTERVALO NO VÁLIDO')
    }
    const { start: startDate, end: endDate } = interval

    configDateAlert({ setRender, idDispositivo, startDate, endDate }).then(
      (res) => {
        alert(res[0])
        setRenderFechaModal(false)
      }
    )
  }

  return (
    <>
      <LoadingServer render={render} />
      <div className="config-fecha">
        <div className="config-fecha-container">
          <p>
            Configure la zona horaria en la que desea que el laser verifique
            actividad sospechosa en el lugar de su instalación.
          </p>
          {renderNota && (
            <p className="note">
              <i>{renderNota}</i>
            </p>
          )}
          <h3>Rango - INICIO</h3>
          <input
            type="date"
            name="start-date"
            id="start-date"
            ref={startInput}
            onChange={(e) =>
              setInterval({ ...interval, start: e.target.value })
            }
          />
          <h3>Rango - FIN</h3>
          <input
            type="date"
            name="end-date"
            id="end-date"
            ref={endInput}
            onChange={(e) => setInterval({ ...interval, end: e.target.value })}
          />
          <button onClick={handleInterval}>GUARDAR CAMBIOS</button>
        </div>
      </div>
    </>
  )
}

const AdminDispositivos = () => {
  const {
    renderFechaModal,
    childrenFechaModal,
    setRenderFechaModal,
    setChildrenFechaModal,
  } = useModal()

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

  const handleFechaDispositivo = () => {
    setChildrenFechaModal({
      title: `Configurar fecha dispositivo`,
      body: (
        <ConfigFecha
          idDispositivo={'camESP-@admin-nX745'}
          setRenderFechaModal={setRenderFechaModal}
        />
      ),
    })
    setRenderFechaModal(true)
  }

  if (renderAlert)
    return <AdminAlert img={currentImage} setRenderAlert={setRenderAlert} />

  return (
    <>
      {renderFechaModal && (
        <FechaModal
          renderFechaModal={renderFechaModal}
          childrenFechaModal={childrenFechaModal}
          onClose={() => setRenderFechaModal(false)}
        />
      )}
      <div className="dispositivo">
        <div className="settings-container">
          <button className="settings" onClick={() => handleFechaDispositivo()}>
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

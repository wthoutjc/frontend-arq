import '../../../../styles/admin/dispositivos.css'

const imgWebcam = require('../../../../images/webcam.png')

const AdminDispositivos = () => {
  return (
    <>
      <div className="dispositivos">
        <div className="card">
          <div className="img-device">
            <img src={imgWebcam} alt="security-device" />
          </div>
          <div className="status-device">
            <h4>
              ID: <p>camESP-@admin-nX745</p>
            </h4>
            <h4>
              Estado: <p className="status-active">ACTIVO</p>
            </h4>
            <h4>
              Alertas: <p>0</p>
            </h4>
          </div>
        </div>
        <div className="device-options">
          <button>CONFIGURAR</button>
          <button>ENTRAR</button>
        </div>
      </div>
      <button className="add-device">AGREGAR NUEVO DISPOSITIVO</button>
    </>
  )
}

export default AdminDispositivos

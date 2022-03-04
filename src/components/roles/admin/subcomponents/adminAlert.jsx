import '../../../../styles/admin/adminAlert.css'

// Icons
import * as MdIcons from 'react-icons/md'
import * as HiIcons from 'react-icons/hi'

const AdminAlert = ({ img, setRenderAlert }) => {
  return (
    <>
      <div className="alert-container">
        <div className="settings-container">
          <button className="settings" onClick={() => setRenderAlert(false)}>
            <MdIcons.MdClose />
          </button>
        </div>
        {img ? <h2>ALERTA RECIENTE DETECTADA</h2> : <h2>TODO OK</h2>}
        <div className="img-alert">
          {img ? <img src={img} /> : 'Sin alertas recientes'}
        </div>
        {img && (
          <button className="download">
            DESCARGAR
            <HiIcons.HiDownload />
          </button>
        )}
      </div>
    </>
  )
}

export default AdminAlert

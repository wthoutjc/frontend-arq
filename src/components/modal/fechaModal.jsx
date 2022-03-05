import ReactDOM from 'react-dom'
import '../../styles/modal/fechaModal.css'

//Icons
import * as AiIcons from 'react-icons/ai'

const FechaModal = ({ renderFechaModal, childrenFechaModal, onClose }) => {
  const { title, body } = childrenFechaModal
  return ReactDOM.createPortal(
    <>
      {renderFechaModal && (
        <div className="fecha-modal">
          <div className="fecha-modal-content">
            <div className="fecha-modal-title">
              <h1>{title} </h1>
              <button onClick={() => onClose()}>
                <AiIcons.AiFillCloseCircle />
              </button>
            </div>
            <div className="fecha-modal-body">{body}</div>
          </div>
        </div>
      )}{' '}
    </>,
    document.getElementById('portal')
  )
}

export default FechaModal

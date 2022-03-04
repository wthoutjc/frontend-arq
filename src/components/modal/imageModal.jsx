import ReactDOM from 'react-dom'
import '../../styles/modal/imageModal.css'

//Icons
import * as AiIcons from 'react-icons/ai'

const ImageModal = ({ renderModal, childrenModal, onClose }) => {
  const { title, body } = childrenModal
  return ReactDOM.createPortal(
    <>
      {renderModal && (
        <div className="image-modal">
          <div className="img-modal-content">
            <div className="img-modal-title">
              <h1>{title} </h1>
              <button onClick={() => onClose()}>
                <AiIcons.AiFillCloseCircle />
              </button>
            </div>
            <div className="img-modal-body">{body}</div>
          </div>
        </div>
      )}{' '}
    </>,
    document.getElementById('portal')
  )
}

export default ImageModal

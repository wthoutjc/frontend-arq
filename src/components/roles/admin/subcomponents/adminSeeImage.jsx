// Icons
import * as BsIcons from 'react-icons/bs'

// Components
import ImageModal from '../../../modal/imageModal'

// Hooks
import useModal from '../../../../hooks/useModal'

//Helpers
import _arrayBufferToBase64erToBase64 from '../../../../services/helpers/arrayBufferToBase64'
import manageDate from '../../../../services/helpers/dates'

const ImageAlert = ({ img }) => {
  return (
    <>
      <div className="image-container">
        <img src={`data:image/png;base64,${img}`} alt="Security APP" />
      </div>
    </>
  )
}

const AdminSeeImage = ({ infoAlert }) => {
  const { renderModal, childrenModal, setRenderModal, setChildrenModal } =
    useModal()

  const handleImageModal = () => {
    setChildrenModal({
      title: `Alerta ${infoAlert[0]} - ${manageDate(infoAlert[1])} `,
      body: <ImageAlert img={infoAlert[2]} />,
    })
    setRenderModal(true)
  }

  return (
    <>
      {renderModal && (
        <ImageModal
          renderModal={renderModal}
          childrenModal={childrenModal}
          onClose={() => setRenderModal(false)}
        />
      )}
      <button className="see-image" onClick={() => handleImageModal()}>
        <BsIcons.BsImages />
      </button>
    </>
  )
}

export default AdminSeeImage

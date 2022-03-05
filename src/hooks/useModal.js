import { useState, useCallback } from 'react'

const useModal = () => {
  const [renderModal, setRenderModal] = useState(false)
  const [childrenModal, setChildrenModal] = useState({ title: '', body: null })

  const [renderFechaModal, setRenderFechaModal] = useState(false)
  const [childrenFechaModal, setChildrenFechaModal] = useState({
    title: '',
    body: null,
  })

  return {
    renderModal,
    childrenModal,
    setRenderModal,
    setChildrenModal,
    /**
     * FECHA
     */
    renderFechaModal,
    childrenFechaModal,
    setRenderFechaModal,
    setChildrenFechaModal,
  }
}

export default useModal

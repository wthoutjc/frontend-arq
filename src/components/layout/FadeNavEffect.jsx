import { useEffect } from 'react'
import PropTypes from 'prop-types'

const FadeNavEffect = ({ show, setShow }) => {
  useEffect(() => {
    const toggleLeftNav = () => setShow(false)
    const fadeEffect$ = document.querySelector('.fadeEffectNav')
    fadeEffect$?.addEventListener('click', toggleLeftNav)
  }, [setShow])
  return <div className={show ? 'fadeEffectNav active' : 'fadeEffectNav'}></div>
}

FadeNavEffect.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
}

export default FadeNavEffect

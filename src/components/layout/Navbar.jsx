import '../../styles/layout/layout.css'

import { useState } from 'react'

//Layout components
import NavHeader from './NavHeader'
import LeftNav from './LeftNav'
import FadeNavEffect from './FadeNavEffect'

const Navbar = ({ setRender }) => {
  const [show, setShow] = useState(false)
  return (
    <>
      <FadeNavEffect show={show} setShow={setShow} />
      <LeftNav show={show} setShow={setShow} setRender={setRender} />
      <NavHeader show={show} setShow={setShow} setRender={setRender} />
    </>
  )
}

export default Navbar

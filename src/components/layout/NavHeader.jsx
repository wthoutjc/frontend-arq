import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

//ICONS
import * as IoIcons from 'react-icons/io'

const NavHeader = ({ show, setShow }) => {
  return (
    <>
      <header className="header">
        <div className="nav-header-bars">
          <Link to="#">
            <IoIcons.IoMdMenu onClick={() => setShow(!show)} />
          </Link>
        </div>
        <div className="nav-header-logo">
          <Link to="/">
            <h1>SECURITY</h1>
          </Link>
        </div>
      </header>
    </>
  )
}

NavHeader.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  setRender: PropTypes.func.isRequired,
}

export default NavHeader

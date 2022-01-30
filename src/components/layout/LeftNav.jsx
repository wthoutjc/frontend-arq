import { Link, useHistory } from 'react-router-dom'
import { useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

//ICONS
import * as CgIcons from 'react-icons/cg'
import * as FiIcons from 'react-icons/fi'
import * as IoIcons from 'react-icons/io'

//Hook
import useUser from '../../hooks/useUser'

//Lectura de token
import decode from 'jwt-decode'

import { RoleContexts } from '../../context/roleContext'

const LeftNav = ({ show, setShow, setRender }) => {
  const infoUser = useRef(decode(localStorage.getItem('jwt')))
  const { jwt, logout } = useUser()
  const history = useHistory()

  const { leftNavData } = useContext(RoleContexts)

  useEffect(() => {
    if (!jwt) {
      history.push('/')
    }
  }, [history, jwt, logout])

  return (
    <>
      <div className={show ? 'left-nav active' : 'left-nav'}>
        <div className="left-nav-header">
          <Link to="#" className="nav-header-bars">
            <IoIcons.IoMdMenu onClick={() => setShow(!show)} />
          </Link>
          <Link to="/" className="nav-header-logo">
            <h1>SECURITY</h1>
          </Link>
        </div>
        <div className="left-nav-footer">
          <Link
            to={`/${infoUser.current.sub.categoria}/account`}
            className="left-footer-options"
          >
            <CgIcons.CgProfile /> <p>Perfil</p>
            {/* <p>Perfil</p> */}
          </Link>
          <Link
            to="#"
            className="left-footer-options"
            onClick={(e) => {
              e.preventDefault()
              logout({ setRender })
            }}
          >
            <FiIcons.FiLogOut />
            <p>Cerrar sesión</p>
            {/* <p>Cerrar sesión</p> */}
          </Link>
        </div>
        <div className="left-nav-content">
          {leftNavData?.map((data, index) => {
            return (
              <Link to={data.path} key={index} className={data.cName}>
                {data.icon}
                <p>{data.title}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

LeftNav.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
}

export default LeftNav

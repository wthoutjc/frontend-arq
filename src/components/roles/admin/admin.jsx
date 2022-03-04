import '../../../styles/admin/admin.css'
import { useState, useEffect, useRef } from 'react'

// Components
import Navbar from '../../layout/Navbar'
import LoadingServer from '../../loaders/loadingServer'

//Subcomponents
import AdminDispositivos from './subcomponents/adminDispositivos'
import AdminAlertas from './subcomponents/adminAlertas'
import AdminCuenta from './subcomponents/adminCuenta'
import AdminOthers from './subcomponents/adminOthers'
import AdminAddDispositivo from './subcomponents/adminAddDispositivo'

// Socket: Context
import { ContextSocketProvider } from '../../../context/contextSocketProvider'

//Decode JWT
import decode from 'jwt-decode'

//Icons
import * as MdIcons from 'react-icons/md'

//Helpers
import manageDate from '../../../services/helpers/dates'

const Admin = () => {
  const [render, setRender] = useState(false)
  const [renderOption, setRenderOption] = useState({
    name: 'Dispositivos',
    option: (
      <>
        <div className="flex-container">
          <AdminDispositivos />
          <AdminAddDispositivo />
        </div>
      </>
    ),
  })

  const [infoUser, setInfoUser] = useState(false)
  const optionsDate = useRef({
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
  const todayDate = useRef(
    manageDate(
      new Date(Date.now()).toLocaleString('es-CO', optionsDate.current)
    )
  )

  const navOptions = useRef([
    {
      id: 'option1',
      name: 'Dispositivos',
      render: (
        <>
          <div className="flex-container">
            <AdminDispositivos />
            <AdminAddDispositivo />
          </div>
        </>
      ),
      icon: <MdIcons.MdSecurity />,
    },
    {
      id: 'option2',
      name: 'Alertas',
      render: <AdminAlertas />,
      icon: <MdIcons.MdOutlineSystemSecurityUpdateWarning />,
    },
    {
      id: 'option3',
      name: 'Cuenta',
      render: <AdminCuenta />,
      icon: <MdIcons.MdSwitchAccount />,
    },
    {
      id: 'option4',
      name: 'Opción',
      render: <AdminOthers />,
      icon: <MdIcons.MdSettings />,
    },
    {
      id: 'option5',
      name: 'Opción',
      render: <AdminOthers />,
      icon: <MdIcons.MdSettings />,
    },
    {
      id: 'option6',
      name: 'Opción',
      render: <AdminOthers />,
      icon: <MdIcons.MdSettings />,
    },
  ])

  const activeOption = useRef()

  const handleUpdateOption = (option) => {
    if (activeOption.current !== option) {
      const ACTIVE_STATE = 'option-card active'
      const PASIVE_STATE = 'option-card'
      option.setAttribute('class', ACTIVE_STATE)
      if (activeOption.current.hasAttribute('class')) {
        activeOption.current.setAttribute('class', PASIVE_STATE)
      }
      activeOption.current = option
    }
  }

  useEffect(() => {
    setInfoUser(decode(localStorage.getItem('jwt')).sub)
    activeOption.current = document.getElementById('option1')
  }, [])

  /**
   * Aca se verificaria todos los dispositivos y por
   * cada dispositivo se crearia un nuevo adminDispositivo
   */

  return (
    <>
      <ContextSocketProvider>
        <LoadingServer render={render} />
        <div className="admin">
          <Navbar setRender={setRender} />
          <div className="content-app">
            <h1>
              Hola,<div className="name-user">{`${infoUser.name}`}</div>
            </h1>
            <p className="date">{todayDate.current}</p>
            <div className="app">
              <div className="options-carousel">
                {navOptions.current?.map((option, index) => (
                  <div
                    key={option.id}
                    id={option.id}
                    className={
                      index === 0 ? 'option-card active' : 'option-card'
                    }
                    onClick={() => {
                      const { name } = option
                      const { render } = option
                      handleUpdateOption(document.getElementById(option.id))
                      setRenderOption({
                        name,
                        option: render,
                      })
                    }}
                  >
                    <div className="option-icon">{option.icon}</div>
                    <p>{option.name}</p>
                  </div>
                ))}
              </div>
              <div className="app-show">
                <h4>{renderOption.name}</h4>
                {renderOption.option}
              </div>
            </div>
          </div>
        </div>
      </ContextSocketProvider>
    </>
  )
}

export default Admin

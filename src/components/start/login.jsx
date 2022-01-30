import '../../styles/start/start.css'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

//Components
import LoaderComponent from '../loaders/loaderComponent'

//Hooks
import useUser from '../../hooks/useUser'

//Icons
import * as FaIcons from 'react-icons/fa'
import * as RiIcons from 'react-icons/ri'
import * as BsIcons from 'react-icons/bs'

//Decode JWT
import decode from 'jwt-decode'

const Login = () => {
  // history Hook
  const history = useHistory()

  //Proceso LogIn
  const { jwt, loginStatus, login } = useUser()

  // LoginInfo
  const [infoLogin, setInfoLogin] = useState({
    username: null,
    password: null,
  })

  // Estado de type:input
  const [showPassword, setShowPassword] = useState(false)

  // Estado: proceso de LogIn
  const [status, setStatus] = useState({
    ok: false,
    message: null,
    render: false,
  })

  // Estado para laoders
  const [loading, setLoading] = useState(false)

  const handleLogIn = async () => {
    if (loading) return
    const { username, password } = infoLogin
    if (!username || !password)
      setStatus({
        ...status,
        message: 'Datos incorrectos',
        render: true,
      })
    else await login({ username, password, setLoading })
    setTimeout(() => {
      setStatus({
        ok: false,
        message: null,
        render: false,
      })
    }, 2500)
  }

  useEffect(() => {
    if (jwt) {
      const { sub } = decode(jwt)
      const { categoria } = sub
      history.push(`/${categoria}`)
    }
  }, [jwt, history])

  useEffect(() => {
    if (loginStatus.itsLogged === false) {
      setStatus({
        ok: loginStatus.itsLogged,
        message: loginStatus.message,
        render: true,
      })
    }
  }, [loginStatus])

  return (
    <div className="login">
      <div className="title">
        <h1>SECURITY WEB APP</h1>
      </div>
      <div className="subtitle">
        <h2>Iniciar Sesión</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleLogIn()
        }}
      >
        <div className="input-user">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Usuario"
            autoComplete="on"
            onChange={(e) =>
              setInfoLogin({
                ...infoLogin,
                username: e.target.value,
              })
            }
          />
          <div className="icon" id="user-icon">
            <FaIcons.FaUser></FaIcons.FaUser>
          </div>
        </div>
        <div className="input-password">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            placeholder="Contraseña"
            autoComplete="off"
            onChange={(e) =>
              setInfoLogin({
                ...infoLogin,
                password: e.target.value,
              })
            }
          />
          <div
            className="show-password"
            onClick={(e) => {
              e.preventDefault()
              setShowPassword(!showPassword)
            }}
          >
            {showPassword ? <BsIcons.BsEyeSlashFill /> : <BsIcons.BsEyeFill />}
          </div>
          <div className="icon" id="user-icon">
            <RiIcons.RiLockPasswordFill></RiIcons.RiLockPasswordFill>
          </div>
        </div>
        {status.render && (
          <span className="status" id="status">
            <p className={status.ok ? 'ok' : 'error'}>{status.message}</p>
          </span>
        )}
        <div className="button">
          <button type="submit">
            {loading ? <LoaderComponent /> : 'CONECTAR'}
          </button>
        </div>
      </form>
      <div className="forgot-password">
        <a href="#">
          <i>¿Has olvidado la contraseña?</i>
        </a>
      </div>
    </div>
  )
}

export default Login

import '../../styles/start/start.css'

const backgroundImage = require('../../images/background-start.jpg')

//Components
import Login from './login'

const Start = () => {
  return (
    <>
      <div className="start-page">
        <div className="start-left">
          <img src={backgroundImage} alt="Security App" />
        </div>
        <div className="start-right">
          <Login />
        </div>
      </div>
    </>
  )
}

export default Start

import { observer } from 'mobx-react-lite'
import LoginForm from '../LoginForm/LoginForm'
import './HorizontalNavbar.css'
import Logo from '../UI/Logo/Logo'
import AuthInfo from '../AuthInfo/AuthInfo'

const HorizontalNavbar = () => { 
  return(
    <div className="horizontalNavbar">
      <Logo/>
      <AuthInfo/>
      <LoginForm/>
    </div>
  )
}

export default observer(HorizontalNavbar)
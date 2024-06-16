import { observer } from 'mobx-react-lite'
import LoginField from '../LoginField/LoginField'
import './HorizontalNavbar.css'
import Logo from '../Logo/Logo'
import AuthInfo from '../AuthInfo/AuthInfo'


const HorizontalNavbar = () => { 

  return(
    <div className="horizontalNavbar">
      <Logo/>
      <AuthInfo/>
      <LoginField/>
    </div>
  )
}

export default observer(HorizontalNavbar)
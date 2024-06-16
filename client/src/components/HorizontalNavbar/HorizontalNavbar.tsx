import { observer } from 'mobx-react-lite'
import LoginField from '../LoginField/LoginField'
import './HorizontalNavbar.css'
import Logo from '../Logo/Logo'
import AuthInfo from '../AuthInfo/AuthInfo'

import { Context } from "../../main";
import { useContext } from 'react'

const HorizontalNavbar = () => { 

  const {store} = useContext(Context)

  return(
    <div className="horizontalNavbar">
      <Logo/>
      <div className='navbar_right_elem'>
      <AuthInfo/>
      {!store.isAuth ? 
        <LoginField/>
            :
        ''
      }
      </div>
      
    </div>
  )
}

export default observer(HorizontalNavbar)
import { observer } from 'mobx-react-lite'
import LoginField from '../LoginField/LoginField'
import './HorizontalNavbar.css'
import Logo from '../Logo/Logo'
import AuthInfo from '../AuthInfo/AuthInfo'

import { Context } from "../../main";
import { FC, useContext } from 'react'

interface HorizontalNavbar { 
  active: boolean,
  setActive: (active:boolean) => void,
}

const HorizontalNavbar:FC<HorizontalNavbar> = ({active, setActive}) => { 

  const {store} = useContext(Context)

  return(
    <div className="horizontalNavbar">
      <div className='navbar_left_elem'>
        <Logo active={active} setActive={setActive}/>
      </div>
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
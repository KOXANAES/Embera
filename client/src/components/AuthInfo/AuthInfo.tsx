import { observer } from "mobx-react-lite"
import { Context } from "../../main"
import { useContext } from "react"

import './AuthInfo.css'

const AuthInfo = () => { 

  const {store} = useContext(Context)

  if(!store.isAuth) { 
    return(
      <div className="authinfo">
        <p>Не авторизован</p>
      </div>
    )
  }

  if(store.isAuth) { 
    return(
      <div className="authField">
        <div className="authinfo">
          <p>Добро пожаловать, {store.user.username}</p>
          <p>{store.user.isActivated ? `Аккаунт активирован по почте ${store.user.email}` : `Активируйте аккаунт, иначе некоторые опции сервиса будут недоступны`}</p>
        </div>
        <button onClick={() => store.logout()}>Выйти</button>

      </div>
      
      
    )
  }
}

export default observer(AuthInfo)
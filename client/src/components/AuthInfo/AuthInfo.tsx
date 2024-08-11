import { observer } from "mobx-react-lite"
import { Context } from "../../main"
import { useContext, useState } from "react"
import './AuthInfo.css'
import logo_img from '../../assets/fire.png'
import ActivateModal from "../ActivateModal/ActivateModal"
import { Navigate } from "react-router-dom"

const AuthInfo = () => { 

  const {store} = useContext(Context)
  const [activateModal, setactivateModal] = useState(false)

  if(!store.isAuth) { 
    return(
      <div className="authinfo">
        <p> &gt; Для работы сервиса необходимо авторизоваться и активировать аккаунт</p>
        <Navigate to="/" replace={true} />
      </div>
    )
  }

  if(store.isAuth) { 
    return(
      <div className="authField">
        <div className="authinfo">
          <p>Добро пожаловать, <span id="username">{store.user.username}</span></p>
          <p>
            {store.user.isActivated ? 
              <span>Ваш аккаунт активирован. Нажмите на <img src={logo_img} alt='' style={{width:'15px', height:'15px'}}></img> чтобы продолжить работу</span> 
              : 
              <span onClick={() => setactivateModal(!activateModal)}><span id='activate_btn'>Активируйте аккаунт</span>, иначе некоторые опции сервиса будут недоступны </span>
            }
          </p>
          <ActivateModal active={activateModal} setActive={setactivateModal}/>

        </div>
        <div className="logout">
          <button className="logoutButton" onClick={() => store.logout()}>Выйти</button>
        </div>
      </div>
      
      
    )
  }
}

export default observer(AuthInfo)
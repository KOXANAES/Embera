import { useState } from "react";
import { observer } from "mobx-react-lite";
import LoginForm from "../LoginForm/LoginForm";
import RegForm from "../RegForm/RegForm";
import './LoginField.css'

const LoginField = () => { 

    const [loginModalActive, setLoginModalActive] = useState(false)
    const [regModalActive, setRegModalActive] = useState(false)

    return(
        <div className="loginField">
            <button className="authButton" onClick={() => setLoginModalActive(true)}>ЛОГИН</button>
            <button className="authButton" onClick={() => setRegModalActive(true)}>РЕГИСТРАЦИЯ</button>
            <LoginForm active={loginModalActive} setActive={setLoginModalActive}/>
            <RegForm active={regModalActive} setActive={setRegModalActive}/>
        </div>
    )
}

export default observer(LoginField)
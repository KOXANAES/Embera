import { FC, useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import LoginForm from "../LoginForm/LoginForm";
import RegForm from "../RegForm/RegForm";

const LoginField: FC = () => { 

    const [loginModalActive, setLoginModalActive] = useState(false)
    const [regModalActive, setRegModalActive] = useState(false)

    return(
        <div>
            <button onClick={() => setLoginModalActive(true)}>ЛОГИН</button>
            <button onClick={() => setRegModalActive(true)}>РЕГИСТРАЦИЯ</button>
            <LoginForm name='ЛОГИН' active={loginModalActive} setActive={setLoginModalActive}/>
            <RegForm name='РЕГИСТРАЦИЯ' active={regModalActive} setActive={setRegModalActive}/>
        </div>
    )
}

export default observer(LoginField)
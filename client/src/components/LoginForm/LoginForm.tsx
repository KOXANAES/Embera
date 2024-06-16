import { FC, useContext, useState } from "react";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";

const LoginForm: FC = () => { 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const {store} = useContext(Context)

    return(
        <div>
            
            <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="text" 
            placeholder="Email"
            />
            <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password" 
            placeholder="Пароль"
            />
            <input
            onChange={e => setUsername(e.target.value)}
            value={username}
            type="text" 
            placeholder="Ник пользователя"
            />
            <button onClick={() => store.login(email, password)}>Логин</button>
            <button onClick={() => store.logout()}>Выйти</button>
            <button onClick={() => store.registration(email, password, username)}>Регистрация</button>
        </div>
    )
}

export default observer(LoginForm)
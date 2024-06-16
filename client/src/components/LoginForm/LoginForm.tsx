import { FC, useContext, useState } from 'react'
import './LoginForm.css'
import { Context } from '../../main'

interface LoginForm { 
  active:any, 
  setActive:any,
  name:string
}

const LoginForm:FC<LoginForm> = ({name, active, setActive}) => { 

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {store} = useContext(Context)

  return(
    <div className={active ? 'loginForm active' : 'loginForm'} onClick={() => setActive(false)}>
      <div className={active ? 'loginForm_content active' : 'loginForm_content'} onClick={e => e.stopPropagation()}>
         <h1>{name}</h1>
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
            <button onClick={() => store.login(email, password)}>Логин</button>
      </div>
    </div>
  )
}

export default LoginForm
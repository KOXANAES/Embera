import { FC, useContext, useState } from 'react'
import './LoginForm.css'
import { Context } from '../../main'

interface LoginForm { 
  active:any, 
  setActive:any,
}

const LoginForm:FC<LoginForm> = ({active, setActive}) => { 

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {store} = useContext(Context)

  return(
    <div className={active ? 'loginForm active' : 'loginForm'} onClick={() => setActive(false)}>
      <div className={active ? 'loginForm_content active' : 'loginForm_content'} onClick={e => e.stopPropagation()}>
       <div className="text-field__icon-2 text-field__icon-2_email">
          <input
            className='auth_input'
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email" 
            placeholder="Email"
            />
        </div>
          <input
          className='auth_input'
          onChange={e => setPassword(e.target.value)}
          value={password}
          type="password" 
          placeholder="Пароль"
          />
          <button className='login_button' onClick={() => store.login(email, password)}>Войти</button>
      </div>
    </div>
  )
}

export default LoginForm
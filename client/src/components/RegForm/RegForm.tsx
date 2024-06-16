import { FC, useContext, useState } from 'react'
import './RegForm.css'
import { Context } from '../../main'

interface RegForm { 
  active:any, 
  setActive:any,
  name:string
}

const RegForm:FC<RegForm> = ({name, active, setActive}) => { 

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const {store} = useContext(Context)

  return(
    <div className={active ? 'regForm active' : 'regForm'} onClick={() => setActive(false)}>
      <div className={active ? 'regForm_content active' : 'regForm_content'} onClick={e => e.stopPropagation()}>
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
            <input
            onChange={e => setUsername(e.target.value)}
            value={username}
            type="text" 
            placeholder="Ник пользователя"
            />
            <button onClick={() => store.registration(email, password, username)}>Регистрация</button>
      </div>
    </div>
  )
}

export default RegForm
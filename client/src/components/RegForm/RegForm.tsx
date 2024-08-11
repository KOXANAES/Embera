import { FC, useContext, useState } from 'react'
import './RegForm.css'
import { Context } from '../../main'

interface RegFormProps { 
  active:boolean, 
  setActive:(value: boolean) => void,
}

const RegForm:FC<RegFormProps> = ({active, setActive}) => { 

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const {store} = useContext(Context)

  return(
    <div className={active ? 'regForm active' : 'regForm'} onClick={() => setActive(false)}>
      <div className={active ? 'regForm_content active' : 'regForm_content'} onClick={e => e.stopPropagation()}>
          <input
            className='auth_input'
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="text" 
            placeholder="Email"
            />
            <input
            className='auth_input'
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password" 
            placeholder="Пароль"
            />
            <sub id='pswd_info'>длинна пароля - от 4 до 32 символов</sub>
            <input
            className='auth_input'
            onChange={e => setUsername(e.target.value)}
            value={username}
            type="text" 
            placeholder="Ник пользователя"
            />
            <button className='login_button' onClick={() => store.registration(email, password, username)}>Регистрация</button>
      </div>
    </div>
  )
}

export default RegForm
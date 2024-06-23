import { FC, useContext, useState } from 'react'
import './Suggest.css'
import { Context } from '../../main'

interface SuggestForm { 
  active: boolean,
  setActive: (active:boolean) => void,
}

const SuggestForm:FC<SuggestForm> = ({active, setActive}) => { 

  const {store} = useContext(Context)

  const [message, setMessage] = useState('')

  return(
    <div className={active ? 'suggestForm active' : 'suggestForm'} onClick={() => setActive(false)}>
      <div className={active ? 'suggestForm_content active' : 'suggestForm_content'} onClick={e => e.stopPropagation()}>
          <p id='tech_header'>
            <span id='tech_header_username'>{store.user.username}</span>, если Вы обнаружили сбои в работе приложения, некорректные ответы сервисов, 
            или же у Вас есть предложения по улучшению и развитию проекта, свяжитель с технической поддержкой сайта. 
            Ваша обратная связь очень важна для нас!
          </p>
          <textarea
            className='message_input'
            onChange={e => setMessage(e.target.value)}
            placeholder='Введите ваше сообщение здесь'
            value={message}
          />
          <button className='send_suggest_btn' onClick={() => store.sendTechMessage(store.user.email, message)}>Отправить</button>
      </div>
    </div>
  )
}

export default SuggestForm
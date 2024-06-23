import { FC, useContext } from "react"
import { Context } from "../../main"

interface ActivateModalProps { 
  active: boolean,
  setActive: (active:boolean) => void,
}

const ActivateModal:FC<ActivateModalProps> = ({active, setActive}) => { 

  const {store} = useContext(Context)

  return(
    <div className={active ? 'suggestForm active' : 'suggestForm'} onClick={() => setActive(false)}>
      <div className={active ? 'suggestForm_content active' : 'suggestForm_content'} onClick={e => e.stopPropagation()}>
          <h1 id='tech_header'>Активация аккаунта</h1>
          <p>При нажатии на вашу почту будет отправлен запрос на активацию аккаунта</p>
          <button className='login_button' onClick={() => store.activate(store.user.email)}>Активировать</button>
      </div>
    </div>
  )
}

export default ActivateModal
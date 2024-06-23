import { FC, useContext, useState } from 'react'
import './Menu.css'
import { Context } from '../../main'
import SuggestForm from '../Suggest/Suggest'
import { Link } from 'react-router-dom'

interface Menu { 
  active: boolean,
  setActive: (active:boolean) => void,
  items: any,
}

const Menu:FC<Menu> = ({items, active, setActive}) => { 

  const {store} = useContext(Context)

  const [dropdownActive, setDropdownActive] = useState(false)

  const [suggestModalActive, setSuggestModalActive] = useState(false)

  return(
    <div className={active ? 'menu active' : 'menu'} onClick={() => setActive(false)}>
      <div className="blur">
        <div className="menu__content" onClick={(e) => e.stopPropagation()}>
          
            {items.map((item: { href: string, value: string }) =>
                <Link id='links' className={store.user.isActivated ? 'menu__tiles' : 'menu__tiles menu-tooltip'} data-tooltip="Необходима активация аккаунта!"  key={item.value} to={item.href}>
                    {item.value}
                </Link>
            )}
            <button onClick={() => setDropdownActive(!dropdownActive)} className={dropdownActive ? 'menu__tiles tech_btn test' : 'menu__tiles tech_btn'}>
                Разное
            </button>
            <div className={dropdownActive ? 'tech_container active' : 'tech_container'}>
              {/* <button className='menu__tiles tech_btn'>О проекте</button> */}
              <Link id='links' className='menu__tiles' to='/about'>
                О проекте            
              </Link>
              <button onClick={() => setSuggestModalActive(true)} className='menu__tiles tech_btn'>Ваши предложения</button>
            </div>
            <SuggestForm active={suggestModalActive} setActive={setSuggestModalActive}/>
        </div>
      </div>
    </div>
  )
}

export default Menu
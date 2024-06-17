import { FC, useContext } from 'react'
import './Menu.css'
import { Context } from '../../main'

interface Menu { 
  active: boolean,
  setActive: (active:boolean) => void,
  items: any,
}



const Menu:FC<Menu> = ({items, active, setActive}) => { 

  const {store} = useContext(Context)

  return(
    <div className={active ? 'menu active' : 'menu'} onClick={() => setActive(false)}>
      <div className="blur">
        <div className="menu__content" onClick={(e) => e.stopPropagation()}>
            {items.map((item: { href: string, value: string }) =>
                <a id='links' className={store.user.isActivated ? 'menu__tiles' : 'menu__tiles custom-tooltip'} data-tooltip="Необходима активация аккаунта!"  key={item.value} href={item.href}>
                    {item.value}
                </a>
            )}
        </div>
      </div>
    </div>
  )
}

export default Menu
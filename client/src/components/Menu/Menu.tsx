import { FC } from 'react'
import './Menu.css'

interface Menu { 
  active: boolean,
  setActive: (active:boolean) => void,
  items: any,
}

const Menu:FC<Menu> = ({items, active, setActive}) => { 
  return(
    <div className={active ? 'menu active' : 'menu'} onClick={() => setActive(false)}>
      <div className="blur">
        <div className="menu__content" onClick={(e) => e.stopPropagation()}>
          <ul>
            {items.map((item: { href: string, value: string }) =>
              <div className='menu_tiles'>
                <li key={item.value}>
                <a href={item.href}>{item.value}</a>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Menu
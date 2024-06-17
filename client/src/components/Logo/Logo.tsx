import './Logo.css'
import logo from '../../assets/fire.png'
import { FC } from 'react'

interface Logo { 
  active: boolean,
  setActive: (active:boolean) => void,
}

const Logo:FC<Logo> = ({active, setActive}) => { 
  return(
    <div className="logo">
      <img id='logo_img' src={logo} alt='logo' onClick={() => setActive(!active)}/>
      <div>
          <p id='logo_name'><a href='/'>EMBERA</a></p>
        <p id='logo_decs'>Учебный портал в сфере предупреждения и ликвидации ЧС</p>
      </div>
    </div>
  )
}

export default Logo
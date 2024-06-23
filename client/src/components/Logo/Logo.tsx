import './Logo.css'
import logo from '../../assets/fire.png'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface Logo { 
  active: boolean,
  setActive: (active:boolean) => void,
}

const Logo:FC<Logo> = ({active, setActive}) => { 
  return(
    <div className="logo">
      <img id='logo_img' src={logo} alt='logo' onClick={() => setActive(!active)}/>
      <div>
          <p id='logo_name'><Link to='/'>EMBERA</Link></p>
        <p id='logo_decs'>Учебный портал в сфере предупреждения и ликвидации ЧС</p>
      </div>
    </div>
  )
}

export default Logo
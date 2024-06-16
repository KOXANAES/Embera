import './Logo.css'
import logo from '../../assets/fire.png'
const Logo = () => { 
  return(
    <div className="logo">
      <img id='logo_img' src={logo} alt='logo'></img>
      <div>
        <p id='logo_name'>EMBERA</p>
        <p id='logo_decs'>Учебный портал в сфере предупреждения и ликвидации ЧС</p>
      </div>
    </div>
  )
}

export default Logo
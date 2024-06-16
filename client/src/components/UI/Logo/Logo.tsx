import './Logo.css'
import logo from '../../../assets/fire.png'
const Logo = () => { 
  return(
    <div className="logo">
      <img id='logo_img' src={logo} alt='logo'></img>
      <p id='logo_name'>EMBERA</p>
    </div>
  )
}

export default Logo
import { useContext, useState } from 'react'
import { Context } from '../../main'
import '../calcs.css'

const Calc1 = () => { 

  const {store} = useContext(Context)

  const [N, setN] = useState('')
  const [C, setC] = useState('')
  const [H, setH] = useState('')
  const [O, setO] = useState('')
  const [M, setM] = useState('')
  const [T, setT] = useState('')
  const [P, setP] = useState('')
  const [A, setA] = useState('')
  const [Q, setQ] = useState('')
  const [D, setD] = useState('')
  const [AA, setAA] = useState('')
  const [AB, setAB] = useState('')
  const [AC, setAC] = useState('')

  const params = {
    N:N, C:C, H:H, O:O, M:M, T:T, P:P, A:A, Q:Q, D:D, AntA:AA, AntB: AB, AntC:AC
  }

  return(
    <div className='calc_container'>
      <div className='calc_form'>
        <form className='calc_form_form'>
          <p>Название вещества:<br/><input className='calc_input' value={N} onChange={e => setN(e.target.value)} autoFocus id='N'/></p>
          <p>Количество атомов углерода:<br/><input className='calc_input' value={C} onChange={e => setC(e.target.value)} minLength={1} maxLength={2} id='C'/></p>
          <p>Количество атомов водорода:<br/><input className='calc_input' value={H} onChange={e => setH(e.target.value)} maxLength={2} id='H'/></p>
          <p>Количество атомов кислорода:<br/><input className='calc_input' value={O} onChange={e => setO(e.target.value)} maxLength={2} id='O'/></p>
          <p>Масса исходного вещества:<br/><input className='calc_input' value={M} onChange={e => setM(e.target.value)} maxLength={4} id='M'/></p>
          <p>Расчетная температура:<br/><input className='calc_input' value={T} onChange={e => setT(e.target.value)} maxLength={4} id='T'/></p>
          <p>Расчетное давление:<br/><input className='calc_input' value={P} onChange={e => setP(e.target.value)} maxLength={5} id='P'/></p>
          <p>Расчетный коэффицент избытка воздуха:<br/><input className='calc_input' value={A} onChange={e => setA(e.target.value)} maxLength={4} id='A'/></p>
          <p>Теплота образования вещества, кДж/моль:<br/><input className='calc_input' value={Q} onChange={e => setQ(e.target.value)} maxLength={6} id='Q'/></p>
          <p>Коэффициент диффузии:<br/><input className='calc_input' value={D} onChange={e => setD(e.target.value)} maxLength={5} id='D'/></p>
          <p>Постоянные Антуана:</p>
          <p>A:<br/><input className='calc_input' value={AA} onChange={e => setAA(e.target.value)} maxLength={8} id='AA'/></p>  
          <p>B:<br/><input className='calc_input' value={AB} onChange={e => setAB(e.target.value)} maxLength={8} id='AB'/></p>
          <p>C:<br/><input className='calc_input' value={AC} onChange={e => setAC(e.target.value)} maxLength={8} id='AC'/></p>
          <p><button className='sendButton' onClick={(e) => store.calcTVPT1(e, params)}>Отправить</button></p>
        </form>
      </div>
      <div id='text' className='calc1_ans'>
        1234
          <p>123</p>
      </div>
      <p><button className='sendButton' onClick={(e) => store.calcTVPT1(e, params)}>Отправить</button></p>
    </div>
  )
}

export default Calc1
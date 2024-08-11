import axios from "axios"
import { API_URL } from "../http";

export default class CalcStore { 
  async calcTVPT1(e:any, params:any) {
    console.log(params)
    if(!params.N || !params.C || !params.H || !params.O || !params.M || !params.T || !params.P || !params.A || !params.Q || !params.D || !params.AntA || !params.AntB || !params.AntC) { 
      alert('Необходимо заполнить все поля формы!')
      e.preventDefault()
      return
    }  
    if(typeof(params.N != 'string')) { 
      alert('Название числа должно быть числовым значением!')
      e.preventDefault()
      return
    }
    e.preventDefault()
    const response = await axios.post(`${API_URL}/calc/tvipg_1`, params , {headers:{'authorization': `Bearer ${localStorage.token}`}})
    const ansField = document.querySelector('.calc1_ans')
    ansField.innerHTML = response.data
  }
}
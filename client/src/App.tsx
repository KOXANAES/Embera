import {FC, useContext, useEffect, useState} from "react";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import HorizontalNavbar from "./components/HorizontalNavbar/HorizontalNavbar";
import './css/App.css'
import { BrowserRouter } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import AppRouter from "./router/AppRouter";

const App: FC = () => {

    // dropright menu 

  const items = [ 
    {value:'Расчёт 1', href:'/calc1'},
    {value:'Расчёт 2', href:'/calc2'},
    {value:'Рас111чёт 3', href:'/calc3'},
    {value:'Расчёт 4', href:'/calc4'},
  ]
  const [menuActive, setMenuActive] = useState(true)

    //

  const {store} = useContext(Context)

  useEffect(() => { 
    if(localStorage.getItem('token')) { 
      store.checkAuth()
    }
  }, [])

  if(store.isLoading) { 
    return(
      <div>Загрузка...</div>
    )
  }

  return (
    <BrowserRouter>
      <HorizontalNavbar active={menuActive} setActive={setMenuActive}/>
      {store.isAuth ? 
        <Menu active={menuActive} setActive={setMenuActive} items={items}/>
          : 
        ''
      }  
      <AppRouter/>
    </BrowserRouter>
  );
}

export default observer(App);
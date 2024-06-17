import {FC, useContext, useEffect, useState} from "react";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import HorizontalNavbar from "./components/HorizontalNavbar/HorizontalNavbar";
import './css/App.css'
import { BrowserRouter } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import AppRouter from "./router/AppRouter";
import { items } from "./data/data";

const App: FC = () => {

  const {store} = useContext(Context)

  const [menuActive, setMenuActive] = useState(false)

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
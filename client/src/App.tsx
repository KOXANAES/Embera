import {FC, useContext, useEffect} from "react";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import HorizontalNavbar from "./components/HorizontalNavbar/HorizontalNavbar";
import './css/App.css'

const App: FC = () => {

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
    <div>
      <HorizontalNavbar/>
    </div>
  );
}

export default observer(App);

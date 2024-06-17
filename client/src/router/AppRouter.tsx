import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Context } from "../main"
import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "./Routes"

const AppRouter = () => { 

  const {store} = useContext(Context)

  return( 
    <Routes>
      {store.isAuth && store.user.isActivated && AuthRoutes.map(({path, Component}) => 
      <Route key={path} path={path} Component={Component} exact/>
      )}
    </Routes>
  )
}

export default observer(AppRouter)
import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/store';
import CalcStore from './store/calcStore';

interface State {
  store: Store,
  calcStore: CalcStore
}

const store = new Store()
const calcStore = new CalcStore()

export const Context = createContext<State>({ 
  store,
  calcStore
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        store,
        calcStore
      }}
    >
    <App/>
    </Context.Provider>
  </React.StrictMode>
);
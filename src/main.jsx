import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/tailwind.css'
import './assets/styles/theme.css'
import './assets/styles/main.css'
import { App } from './components'
import { Provider } from 'react-redux'
import {store} from './store'
import { ThemeProvider } from "@material-tailwind/react";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App/>
      </Provider>
    </ThemeProvider> 
  </React.StrictMode>,
)

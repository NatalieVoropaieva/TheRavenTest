import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { Provider } from 'react-redux'
import { router } from './routers.tsx'
import { RouterProvider } from 'react-router-dom'
import store from './store/index.ts'
import './i18n'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)

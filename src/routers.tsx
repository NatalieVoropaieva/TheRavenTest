import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from './App.tsx'
import { lazy, Suspense } from 'react'
import Loader from './components/Loader/Loader.tsx'

const Products = lazy(() => import('./pages/productsPage/productsPage'))
const Product = lazy(() => import('./pages/productPage/productPage'))
const Order = lazy(() => import('./pages/orderPage/orderPage'))
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'} element={<App />}>
      <Route
        index
        element={
          <Suspense fallback={<Loader />}>
            <Products />
          </Suspense>
        }
      ></Route>
      <Route
        path={'product/:productId'}
        element={
          <Suspense fallback={<Loader />}>
            <Product />
          </Suspense>
        }
      ></Route>
      <Route
        path={'order'}
        element={
          <Suspense fallback={<Loader />}>
            <Order />
          </Suspense>
        }
      ></Route>
    </Route>,
  ),
)

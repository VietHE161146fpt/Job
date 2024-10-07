import { createBrowserRouter, Link, Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import Footer from './components/shared/Footer'
import Header from './components/shared/Header'
import Browse from './components/Browse'
import Profile from './components/Profile'

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <h1>Something wrong <Link className='font-bold py-2 px-4 rounded bg-blue-500 text-white' to={"/"}>Return back</Link></h1>,
    children: [
      {
        path:'/',
        element:<h1 className='flex-grow'>Main page</h1>
      },
      {
        path:'/browse',
        element:<Browse />
      },
      {
        path:'/profile',
        element:<Profile />
      }
    ]
  }
]);


function App() {
  return (
    <div className="App">
      <div className='flex flex-col min-h-screen'>
      <RouterProvider router={appRouter} />
      </div>
    </div>
  )
}

export default App

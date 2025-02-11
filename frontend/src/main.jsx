import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
// import Events from './components/Events.jsx'
// import CreateEvents from './components/Create_Event.jsx'
// import AttendeeList from './components/Attendee_List.jsx'
import userStore from './store/userStore.js'
import { Provider } from "react-redux"

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { lazy, Suspense } from 'react';

const Events = lazy(() => import("./components/Events.jsx"));
const CreateEvents = lazy(() => import("./components/Create_Event.jsx"));
const AttendeeList = lazy(() => import("./components/Attendee_List.jsx"));


const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <App />,
  },
  {
    path : "/navbar",
    element : <Navbar />,
    children : [
      {
        path : "events",
        element : <Suspense fallback={<div>Loading Events...</div>}><Events /></Suspense>,
      },
      {
        path : "createevent",
        element : <Suspense fallback={<div>Loading...</div>}><CreateEvents /></Suspense>,
      },
      {
        path : "attendeelist",
        element : <Suspense fallback={<div>Loading Attendees List...</div>}><AttendeeList /></Suspense>,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={userStore} >
    <RouterProvider router={appRouter}></RouterProvider>
    <ToastContainer ></ToastContainer>
  </Provider>
)

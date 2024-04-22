import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './components/Home'
import CountryPage from './components/CountryPage'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './reset.css'
import './variables.css'

let countryToShow = getCountry()
  
function getCountry() {
  setTimeout(() => {
    const link = document.querySelectorAll('.country-cards__card-link')
    const cards = document.querySelectorAll('.country-cards__card--name')
    cards.forEach((card, index) => {
      link[index].addEventListener('click', () => {
        return countryToShow = card.innerHTML
      })
    })
  }, 1000)
}
  
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/countries-api/",
    element: <App />,
    children: [
      {
        path: "/countries-api/",
        element: <Home />,
      },
      {
        path: "/countries-api/country-page/:country",
        element: <CountryPage country={getCountry()}/>, 
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)

import Header from "./components/Header"
import CountryCards from "./components/CountryCards"
import { useQuery } from "@tanstack/react-query"
import styled from "styled-components"
import { useState, useEffect } from "react"

function App() {
  const [search, setSearch] = useState('')
  
  const fetchCountriesApi = () => {
    return fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
  }
  
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountriesApi
  })
  
  
  if (isPending) return <span>Loading...</span>
  if (isError) return <span>Error: {error.message}</span>
  
  const lowerSearch = search.toLowerCase()
  
  const countriesFiltered = data.filter((i) => {
    if (search === '') {
      return i
    } else {
      const capital = i.capital?.length >= 0 ? i.capital[0] : 'No capital' 
      
      return i.name.common.toLowerCase().includes(lowerSearch) || i.name.official.toLowerCase().includes(lowerSearch) || i.region.toLowerCase().includes(lowerSearch) || i.subregion?.toLowerCase().includes(lowerSearch) || capital.toLowerCase().includes(lowerSearch)
    }
  })


  return (
    <>
      <Header />
      <Main>
        <Inputs>
          <input
            type="text"
            placeholder="Search for a country..."
            name="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search"
          />
          <select name='filter' onChange={e => setSearch(e.target.value)}>
            <option value="">Fitter by Region</option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>

        </Inputs>

        <CountryCards data={countriesFiltered.sort()} />
      </Main>
    </>
  )
}

export default App

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: var(--background-color-dark);
  min-height: 100svh;

  input[type="text"]::-webkit-input-placeholder:before{
    content: "🔍";
  }

  input[type="text"] {
    width: 100%;
    padding: 1.5rem;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--elements-dark);
    &::-webkit-input-placeholder{ 
      color: var(--color-text-dark)
    }
  }
`

const Inputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  gap: 4rem;

  input{
    &:hover{
      opacity: 0.8;
    }
  }

  *{
    padding: 1.5rem;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--elements-dark);
    color: var(--color-text-dark);
    font-size: 1.4em;
    text-transform: capitalize;
    &:hover{
      opacity: 0.8;
    }

    &::-webkit-input-placeholder{ 
      color: var(--color-text-dark);
    }

    &:nth-child(2){ 
      cursor: pointer;
      min-width: 20rem;
    }
  }

  @media (width > 768px){
    flex-direction: row;
    padding: 0 3rem;

    input[type= 'text']{
      width: 70rem
    }
  }
`
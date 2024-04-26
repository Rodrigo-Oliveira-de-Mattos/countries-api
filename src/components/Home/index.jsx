import CountryCards from "../CountryCards"
import { useQuery } from "@tanstack/react-query"
import { useState} from "react"
import styled from "styled-components"

export default function Home() {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')

    const fetchCountriesApi = () => {
        return fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
    }

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['countries'],
        queryFn: fetchCountriesApi
    })


    if (isPending) return <main><span>Loading...</span></main>
    if (isError) return <main><span>Error: {error.message}</span></main>

    const lowerSearch = search.toLowerCase()

    const countriesFiltered = data.filter((i) => {
        if (filter === '') {
            return i
        } else {
            return i.region.toLowerCase() === filter.toLowerCase()
        }
    })

    const countriesSearch = countriesFiltered.filter((i) => {
        if (search === '') {
            return i
        } else {
            const capital = i.capital?.length >= 0 ? i.capital[0] : 'No capital'
            return i.name.common.toLowerCase().includes(lowerSearch) || i.name.official.toLowerCase().includes(lowerSearch) || i.subregion?.toLowerCase().includes(lowerSearch) || capital.toLowerCase().includes(lowerSearch)
        }
    })

    return (
        <>
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
                    <select name='filter' onChange={e => setFilter(e.target.value)}>
                        <option value="">Fitter by Region</option>
                        <option value="africa">Africa</option>
                        <option value="americas">Americas</option>
                        <option value="asia">Asia</option>
                        <option value="europe">Europe</option>
                        <option value="oceania">Oceania</option>
                    </select>

                </Inputs>

                <CountryCards data={countriesSearch.sort()} />
            </Main>
        </>
    )
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  input[type="text"]::-webkit-input-placeholder:before{
    content: "🔍";
  }

  input[type="text"] {
    width: 100%;
    padding: 1.5rem;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--elements);
    &::-webkit-input-placeholder{ 
      color: var(--color-text)
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
      background-color: var(--elements-hover);
    }
  }

  *{
    box-shadow: 0 0 15px 5px var(--shadow-color);
    padding: 1.5rem;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--elements);
    color: var(--color-text);
    font-size: 1.4em;
    text-transform: capitalize;
    &:hover{
      background-color: var(--elements-hover);
    }

    &::-webkit-input-placeholder{ 
      color: var(--color-text);
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
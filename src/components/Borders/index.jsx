import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

export default function Borders({ alphaCode }) {
    const fetchCountriesApiAlpha = () => {
        return fetch(`https://restcountries.com/v3.1/alpha/${alphaCode}`)
            .then(res => res.json())
    }

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['alpha', alphaCode],
        queryFn: fetchCountriesApiAlpha
    })

    if (isPending) return <main><span>Loading...</span></main>
    if (isError) return <main><span>Error: {error.message}</span></main>
    const name = data[0].name.common

    return <Link to={`/countries-api/country-page/${name}`} key={name} className="border-countries">{name}</Link>
}
import { Link } from "react-router-dom"
import styled from "styled-components"

export default function CountryCards({ data }) {
    return (
        <CardsList id="country-cards">
            {data.map(country =>
                <Link to={`/countries-api/country-page/${country.name.common}`} key={country.name.common} className="country-cards__card-link">
                    <Card>
                        <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
                        <Text>
                            <h3 className="country-cards__card--name">{country.name.common}</h3>
                            <p>Population: <span>{country.population.toLocaleString('en')}</span></p>
                            <p>Region: <span>{country.region}</span></p>
                            <p>Capital: <span>{country.capital}</span></p>
                        </Text>
                    </Card>
                </Link>
            )}
        </CardsList>
    )
}

const CardsList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 4rem;
    padding: 3rem;
    width: 100%;
    @media (width > 1440px){
        grid-template-columns: repeat(4, 1fr);  
        gap: 6rem;
    }
`

const Card = styled.li`
    background-color: var(--elements);
    border-radius: 1rem;
    box-shadow: 0 0 10px 5px var(--shadow-color);
    height: 35rem;
    img{
        width: 100%;
        height: 50%;
        object-position: center;
        object-fit: cover;
        border-radius: 1rem 1rem 0 0;
    }
    @media (width > 1440px){
        height: 40rem;
    }
`

const Text = styled.div`
    padding: 2rem;
    color: var(--color-text);
    letter-spacing: 1px;
    font-size: 1em;
    h3{
        font-size: 1.6em;
        font-weight: var(--weight-bold);
        margin-bottom: 2rem;
    }
    p{
        font-size: 1.4em;
        font-weight: var(--weight-normal);
        line-height: 2rem;
        span{
            font-weight: var(--weight-minimy);
        }
    }
    @media (width > 1440px){
        font-size: 1.4rem;  
        p{
            line-height: 2.5rem;
        }
    }
`
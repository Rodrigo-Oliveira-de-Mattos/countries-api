import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query"
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function CountryPage() {

    let { country } = useParams();

    const fetchCountriesApi = () => {
        return fetch(`https://restcountries.com/v3.1/name/${country}`)
            .then(res => res.json())
    }

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['country'],
        queryFn: fetchCountriesApi
    })

    if (isPending) return <span>Loading...</span>
    if (isError) return <span>Error: {error.message}</span>

    const flag = data[0].flags.png
    const name = data[0].name.common
    const nativeName = data[0].name.nativeName[Object.keys(data[0].name.nativeName)[0]].common
    const population = data[0].population
    const region = data[0].region
    const subregion = data[0].subregion
    const capital = data[0].capital[0]
    const topLevelDomain = data[0].tld[0]
    const currencies = Object.keys(data[0].currencies)[0]
    const languagesArray = Object.keys(data[0].languages)
    const languages = languagesArray.map((language) => {
        return data[0].languages[language]
    })
    const bordersArray = data[0].borders || ["no borders"]
    console.log(bordersArray);

    return (
        <Main>
            <Link to={'/countries-api/'}>Back</Link>
            <Section>
                <Img src={flag} alt="" />
                <Texts>
                    <H1>{name}</H1>
                    <div>
                        <Ul>
                            <li>Native Name: <span>{nativeName}</span></li>
                            <li>PopUlation: <span>{population.toLocaleString('en') }</span></li>
                            <li>Region: <span>{region}</span></li>
                            <li>Sub Region: <span>{subregion}</span></li>
                            <li>Capital: <span>{capital}</span></li>
                        </Ul>
                        <Ul>
                            <li>Top Level Domain: <span>{topLevelDomain}</span></li>
                            <li>Currencies: <span>{currencies}</span></li>
                            <li>Languages: {languages.map((l) => {
                                return <span key={l} className='languages'>{l}</span>
                            })}</li>
                        </Ul>
                    </div>
                    <P>Border Countries: {bordersArray.map((b) => {
                        return <span key={b}>{b}</span>
                    })}</P>
                </Texts>
            </Section>
        </Main>
    )
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    gap: 5rem;
    a{
        background-color: var(--elements);
        width: fit-content;
        padding: 5px 2rem;
        margin: 1rem 0;
        border-radius: 2.5px;
        letter-spacing: 1px;
        font-size: 1.4em;
        display: flex;
        align-items: center;
        box-shadow: 0 0 2px 3px var(--shadow-color);
        &::before{
            content: "⬅";
            margin-right: 0.5rem;
        }
    }

    @media (width > 768px){
        padding: 6rem;
    }
`

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 3rem;

    @media (width > 768px){
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        gap: 10rem;
    }
`

const Img = styled.img`
    margin-bottom: 2rem;
    max-width: 424px;
    align-self: center;

    @media (width > 768px){
        height: fit-content;
        width: 100%;
        margin-bottom: 0;
    }
`

const Texts = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    justify-content: space-between;
    color: var(--color-text);

    div{
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        @media (width > 768px){
            flex-direction: row;
        }
    }
`

const H1 = styled.h1`
    font-size: 2.2em;
    letter-spacing: 0.5px;
    margin-bottom: 1rem;
    @media (width > 768px){
        font-size: 3em;
        margin-bottom: 1.5rem;
    }
`

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
    flex: 1;
    li{
        letter-spacing: 1px;
        font-size: 1.4em;
        font-weight: var(--weight-normal);
        span{
            font-weight: var(--weight-minimy);
        }
        .languages{
            &:not(:last-child){
                &::after{
                    content: ", ";
                }
            }
        }
    }
`

const P = styled.div`
    font-size: 1.4em;
    font-weight: var(--weight-normal);
    letter-spacing: 1px;
    flex-wrap: wrap;
    span{
        font-size: 0.8em;
        text-transform: capitalize;
        font-weight: var(--weight-minimy);
        background-color: var(--elements);
        padding: 5px 1rem;
        margin-left: 1rem;
        border-radius: 5px;
    }
`

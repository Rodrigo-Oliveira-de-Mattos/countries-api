import styled from "styled-components"

export default function Header () {
    return (
        <HeaderStyled>
            <h1>Where in the world?</h1>

            <button>
                Dark Mode
            </button>
        </HeaderStyled>
    )
}

const HeaderStyled = styled.header`
    background-color: var(--elements-dark);
    color: var(--color-text-dark);
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 7.5rem;

        h1{
            font-size: 1.6em;
            cursor: default;
        }
        button{
            font-size: 1.4em;
            background-color: transparent;
            border: none;
            cursor: pointer;
            color: var(--color-text-dark);
            font-weight: var(--weight-minimy);
            padding: .8rem;
        }
        button::before{
            content: "🌙";
            filter: grayscale();
            margin-right: 0.5rem;
        }
        button:hover{
            background-color: var(--background-color-dark);
            border-radius: 0.5rem;
        }

    @media (width > 768px){
        padding: 0 5rem;
    }
`

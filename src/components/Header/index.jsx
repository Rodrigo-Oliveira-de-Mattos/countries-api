import styled from "styled-components"

export default function Header({ toggleTheme }) {
    const setDarkMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'dark')
    }

    const setLightMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'light')
    }

    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');

    function changeTheme(event) {
        event.matches ? setDarkMode() : setLightMode()
    }
    prefersColorScheme.addListener(changeTheme);
    changeTheme(prefersColorScheme);

    toggleTheme = () => {
        document.querySelector('body').getAttribute('data-theme') === 'light' ? setDarkMode() : setLightMode()
    }

    return (
        <HeaderStyled>
            <h1>Where in the world?</h1>

            <button onClick={toggleTheme}>
                Dark Mode
            </button>
        </HeaderStyled>
    )
}

const HeaderStyled = styled.header`
    background-color: var(--elements);
    color: var(--color-text);
    padding: 1.5rem;
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
            color: var(--color-text);
            font-weight: var(--weight-minimy);
            padding: .8rem;
        }
        button::before{
            content: var(--icon-theme);
            filter: grayscale();
            margin-right: 0.5rem;
        }
        button:hover{
            background-color: var(--background-color);
            border-radius: 0.5rem;
        }

    @media (width > 768px){
        padding: 0 5rem;
    }
`

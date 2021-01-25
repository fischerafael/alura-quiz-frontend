import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { defaultTheme } from '../src/styles/theme'

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;    
    
    font-family: 'Lato', sans-serif;
    
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }  
`

export default function App({ Component, pageProps }) {
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <GlobalStyle />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}

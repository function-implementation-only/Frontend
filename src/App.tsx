import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
`

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <p>Hello World</p>
        </div>
    )
}

export default App

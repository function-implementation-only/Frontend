import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import MainPage from './presentation/pages/MainPage'

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
`

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <GlobalStyle />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App

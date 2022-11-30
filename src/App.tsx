import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './presentation/pages/MainPage'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App

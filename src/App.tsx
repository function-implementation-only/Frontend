import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './presentation/pages/LoginPage'
import MainPage from './presentation/pages/MainPage'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App

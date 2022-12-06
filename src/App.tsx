import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeaderComponent from './presentation/components/HeaderComponent'
import LoginPage from './presentation/pages/LoginPage'
import MainPage from './presentation/pages/MainPage'
import PostPage from './presentation/pages/PostPage'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/post" element={<PostPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App

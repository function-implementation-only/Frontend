import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LoginPage from './presentation/pages/LoginPage'
import MainPage from './presentation/pages/MainPage'
import PostPage from './presentation/pages/PostPage'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <header>
                    <Link to="/login">Login</Link>
                    <Link to="/post">Post</Link>
                </header>
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

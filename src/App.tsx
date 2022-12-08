import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import LoginModal from './presentation/components/modal/LoginModal'
import SignupModal from './presentation/components/modal/SignupModal'
import MainPage from './presentation/pages/MainPage'
import PostDetailPage from './presentation/pages/Post/PostDetailPage'
import PostPage from './presentation/pages/Post/PostPage'
import HeaderComponent from './presentation/components/HeaderComponent'

const queryClient = new QueryClient()

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/post/create" element={<PostPage />} />
                    <Route path="/post/update/:id" element={<PostPage />} />
                    <Route
                        path="/post/detail/:id"
                        element={<PostDetailPage />}
                    />
                </Routes>
                <LoginModal />
                <SignupModal />
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </div>
    )
}

export default App

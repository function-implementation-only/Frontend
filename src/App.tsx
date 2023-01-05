import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import MainPage from './presentation/pages/MainPage'
import PostDetailPage from './presentation/pages/Post/PostDetailPage'
import PostPage from './presentation/pages/Post/PostPage'
import HeaderComponent from './presentation/components/HeaderComponent'
import Kakao from './presentation/components/Kakao'
import Google from './presentation/components/Google'
import SignUpPage from './presentation/pages/SignUpPage'
// import SignupModal from './presentation/components/modal/SignupModal'
// import LoginModal from './presentation/components/modal/LoginModal'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/post/create" element={<PostPage />} />
                        <Route path="/post/update/:id" element={<PostPage />} />
                        <Route
                            path="/post/detail/:id"
                            element={<PostDetailPage />}
                        />
                        <Route
                            path="/api/socials/signup/kakao"
                            element={<Kakao />}
                        />
                        <Route path="/api/google/test" element={<Google />} />
                    </Routes>
                </BrowserRouter>
                <ReactQueryDevtools
                    initialIsOpen={false}
                    position="bottom-right"
                />
            </div>
        </QueryClientProvider>
    )
}

export default App

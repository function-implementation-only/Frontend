import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import MainPage from 'pages/MainPage'
import PostDetailPage from 'pages/Post/PostDetailPage'
import PostPage from 'pages/Post/PostPage'
import AuthMessengerPage from 'pages/Auth/MessengerPage'
import HeaderComponent from 'components/HeaderComponent'
import MyPage from 'pages/MyPage'
import ProfilePage from 'pages/ProfilePage'
import Kakao from './components/account/Kakao'
import Google from './components/account/Google'
import SignUpPage from './pages/SignUpPage'

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
                        <Route path="/mypage" element={<MyPage />} />
                        <Route path="/profilepage" element={<ProfilePage />} />
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
                        <Route
                            path="/auth/messenger"
                            element={<AuthMessengerPage />}
                        />
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

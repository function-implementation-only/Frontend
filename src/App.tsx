import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import MainPage from 'pages/MainPage'
import PostDetailPage from 'pages/Post/PostDetailPage'
import PostPage from 'pages/Post/PostPage'
import HeaderComponent from 'components/HeaderComponent'
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
                        <Route path="/post/create" element={<PostPage />} />
                        <Route path="/post/update/:id" element={<PostPage />} />
                        <Route
                            path="/post/detail/:id"
                            element={<PostDetailPage />}
                        />
                    </Routes>
                    {/* <LoginModal />
                    <SignupModal /> */}
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

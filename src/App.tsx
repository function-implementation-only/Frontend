import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import LoginModal from './presentation/components/modal/LoginModal'
import SignupModal from './presentation/components/modal/SignupModal'
import MainPage from './presentation/pages/MainPage'
import PostPage from './presentation/pages/PostPage'
import HeaderComponent from './presentation/components/HeaderComponent'
import LauncherChatBox from './presentation/components/launcher/LauncherChatBox'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/post" element={<PostPage />} />
                    </Routes>
                    <LoginModal />
                    <SignupModal />
                    <LauncherChatBox />
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

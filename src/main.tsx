import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { Context } from './context'
import { store } from './store/store'
import GlobalStyle from './styles/global'

window.context = new Context()
// FIXME : Vue에서는 자주 사용하는 기능을 전역 변수로 활용할 수 있는 Plugin이라는 기능이 있었는데, React에도 비슷한 방법이 있다면 바꿔주세요.

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyle />
            <App />
        </Provider>
    </React.StrictMode>
)

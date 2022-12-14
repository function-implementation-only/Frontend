import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  *{
    box-sizing: border-box;
  }
  :root {
    --primary-color: #00C73C;
    --swiper-theme-color: #00C73C;
  }
  .App {
    width: 1920px;
    margin: 0 auto;
  }
`

export default GlobalStyle

import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  *{
    box-sizing: border-box;
  }
  :root {
    --primary-color: #FF9C30;
    --swiper-theme-color: var(--primary-color);
    --gray-900: #212529;
    --gray-600: #868E96;
    --gray-700: #3E4145;
  }
  .App {
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
  }
`

export default GlobalStyle

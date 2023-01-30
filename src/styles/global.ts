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
    --primary-color-100: #FFECD6;
    --swiper-theme-color: white;
    --gray-900: #212529;
    --gray-600: #868E96;
    --gray-700: #3E4145;
    --gray-800: #212529;
    --gray-500: #838485;
    --gray-400: #B0B0B0;
    --error-color: #FF3257
  }
  .App {
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
  }
`

export default GlobalStyle

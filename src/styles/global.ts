import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  :root {
    --primary-color: #00C73C;
    --header-height: 80px;
  }
  .App {
    position: relative;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding-top: var(--header-height);
  }
`

export default GlobalStyle

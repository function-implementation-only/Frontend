import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import './swiper.css'
import './fonts.css'
import './animation.css'
import './toastuiOverride.css'

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  * {
    box-sizing: border-box;
  }
  :root {
    --primary-color: #FF9C30;
    --primary-color-100: #FFECD6;
    --primary-color-200: #FFC078;
    --primary-color-300: #FFA94D;
    --primary-color-400: #FF9F3F;
    --primary-color-600: #fd7e14;
    --primary-color-700: #F26E16;

    --swiper-theme-color: white;
    --gray-900: #212529;
    --gray-600: #868E96;
    --gray-700: #3E4145;
    --gray-800: #212529;
    --gray-500: #838485;
    --gray-400: #B0B0B0;
    --gray-250: #CED4DA;
    --error-color: #FF3257;
  }
  .App {
    width: 100%;
    margin: 0 auto;
    font-family: 'Pretendard';
  }
  .noScroll {
    height: 100%;
    overflow: hidden;
  }
  .popup {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }
`

export default GlobalStyle

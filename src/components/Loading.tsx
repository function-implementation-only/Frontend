import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    height: 200px;
    padding-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ContentsContainer = styled.div`
    width: 100%;
    max-width: 1344px;
    @media (max-width: 900px) {
        width: 100%;
    }
    .loading-wrapper {
        width: 200px;
        height: 140px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .circle {
        width: 20px;
        height: 20px;
        position: absolute;
        border-radius: 50%;
        background-color: #ff9c30;
        left: 15%;
        transform-origin: 50%;
        animation: circle 0.5s alternate infinite ease;
    }

    @keyframes circle {
        0% {
            top: 60px;
            height: 5px;
            border-radius: 50px 50px 25px 25px;
            transform: scaleX(1.7);
        }
        40% {
            height: 20px;
            border-radius: 50%;
            transform: scaleX(1);
        }
        100% {
            top: 0%;
        }
    }
    .circle:nth-child(2) {
        left: 45%;
        animation-delay: 0.2s;
    }
    .circle:nth-child(3) {
        left: auto;
        right: 15%;
        animation-delay: 0.3s;
    }
    .shadow {
        width: 20px;
        height: 4px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 62px;
        transform-origin: 50%;
        z-index: -1;
        left: 15%;
        filter: blur(1px);
        animation: shadow 0.5s alternate infinite ease;
    }

    @keyframes shadow {
        0% {
            transform: scaleX(1.5);
        }
        40% {
            transform: scaleX(1);
            opacity: 0.7;
        }
        100% {
            transform: scaleX(0.2);
            opacity: 0.4;
        }
    }
    .shadow:nth-child(4) {
        left: 45%;
        animation-delay: 0.2s;
    }
    .shadow:nth-child(5) {
        left: auto;
        right: 15%;
        animation-delay: 0.3s;
    }
    .wrapper span {
        position: absolute;
        top: 75px;
        font-family: 'Lato';
        font-size: 20px;
        letter-spacing: 12px;
        color: #fff;
        left: 15%;
    }
`

function Loading() {
    return (
        <Wrapper>
            <ContentsContainer>
                {/* <Logo>
          <img src="/images/loading/loadingLogo.png" alt="logo" />
        </Logo> */}
                <div className="loading-wrapper">
                    <div className="circle" />
                    <div className="circle" />
                    <div className="circle" />
                </div>
            </ContentsContainer>
        </Wrapper>
    )
}

export default Loading

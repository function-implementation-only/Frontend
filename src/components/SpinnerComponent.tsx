import styled from 'styled-components'

const SpinnerLayout = styled.div``

const Spinner = styled.div`
    color: currentColor;
    display: inline-block;
    position: relative;
    width: 80px;
    height: 70px;
    margin-top: 40px;
    box-sizing: border-box;

    div,
    div:after {
        box-sizing: border-box;
    }

    div {
        transform-origin: 40px 40px;
        animation: lds-spinner 1.2s linear infinite;
    }
    div:after {
        content: ' ';
        display: block;
        position: absolute;
        top: 55px;
        // 스피너 크기
        left: 36.8px;
        // 스피너 막대 기울임, 고정값
        width: 4px;
        // 스피너 막대의 두께
        height: 15px;
        // 스피너 막대의 길이
        border-radius: 20%;
        background: var(--primary-color);
    }
    div:nth-child(1) {
        transform: rotate(0deg);
        animation-delay: -1.1s;
    }
    div:nth-child(2) {
        transform: rotate(30deg);
        animation-delay: -1s;
    }
    div:nth-child(3) {
        transform: rotate(60deg);
        animation-delay: -0.9s;
    }
    div:nth-child(4) {
        transform: rotate(90deg);
        animation-delay: -0.8s;
    }
    div:nth-child(5) {
        transform: rotate(120deg);
        animation-delay: -0.7s;
    }
    div:nth-child(6) {
        transform: rotate(150deg);
        animation-delay: -0.6s;
    }
    div:nth-child(7) {
        transform: rotate(180deg);
        animation-delay: -0.5s;
    }
    div:nth-child(8) {
        transform: rotate(210deg);
        animation-delay: -0.4s;
    }
    div:nth-child(9) {
        transform: rotate(240deg);
        animation-delay: -0.3s;
    }
    div:nth-child(10) {
        transform: rotate(270deg);
        animation-delay: -0.2s;
    }
    div:nth-child(11) {
        transform: rotate(300deg);
        animation-delay: -0.1s;
    }
    div:nth-child(12) {
        transform: rotate(330deg);
        animation-delay: 0s;
    }
`

function SpinnerComponent() {
    return (
        <SpinnerLayout>
            <Spinner>
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </Spinner>
        </SpinnerLayout>
    )
}

export default SpinnerComponent

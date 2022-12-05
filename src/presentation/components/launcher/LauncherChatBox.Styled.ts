import styled from "styled-components";

export const LauncherChatBoxLayout = styled.div`
    :hover {
        box-shadow: rgb(255 255 255 / 5%) 0px 0px 2px 0px inset, rgb(0 0 0 / 5%) 0px 0px 2px 1px, rgb(0 0 0 / 5%) 0px 4px 20px;
        border-radius: 22px;
    }
    position: fixed;
    z-index: 10;
    display: block;
    flex-wrap: nowrap;
    width: auto;
    overflow: visible;
    background: transparent;
    bottom: 20px;
    right: 20px;

    .launcher-button-wrapper {
        position: relative;
        -webkit-box-pack: center;
        justify-content: center;
        max-width: 520px;
        margin: 0px auto;
        overflow: visible;
        transition-timing-function: cubic-bezier(0.24, 0.06, 0, 0.97);
        transition-duration: 500ms;
        transition-property: transform, opacity;
        animation: 500ms cubic-bezier(0.24, 0.06, 0, 0.97) 0.55s 1 normal backwards running fkfYNj;
    }

    .launcher-button-wrapper-child {
        box-shadow: rgb(255 255 255 / 12%) 0px 0px 2px 0px inset, rgb(0 0 0 / 5%) 0px 0px 2px 1px, rgb(0 0 0 / 22%) 0px 4px 20px;
        position: relative;
        box-sizing: border-box;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        width: 320px;
        padding: 10px;
        cursor: pointer;
        background: linear-gradient(to left, rgba(255, 255, 255, 0.9), rgb(255, 255, 255));
        backdrop-filter: blur(30px);
        border-radius: 22px;
    }

    .launcher-button-logo {
        position: relative;
        width: 42px;
        height: 42px;
        display: flex;
        justify-content: center;
    }

    .launcher-wrapper {
        max-width: 100%;
        margin: 0px 10px 0px 12px;
        overflow: hidden;

        .launcher-title {
            letter-spacing: -0.1px;
            padding-left: 2px;
            overflow: hidden;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.85);
            font-size: 16px;
            line-height: 22.4px;
            text-align: left;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .launcher-content-grid {
            letter-spacing: -0.1px;
            margin-left: 2px;
            overflow: hidden;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.4);
            font-size: 13px;
            line-height: 18.2px;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: flex;
            white-space: nowrap;

            .launcher-error {
                width: 16px;
                height: 16px;
                content: "";
                background-image: url(https://cf.channel.io/asset/plugin/images/chat-error-filled.svg);
                background-size: cover;
            }
            
            .launcher-text {
                letter-spacing: -0.1px;
                margin-left: 2px;
                overflow: hidden;
            }
        }

    }
`
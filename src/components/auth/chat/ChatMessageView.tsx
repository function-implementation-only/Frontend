import styled from 'styled-components'
import useStomp from 'hooks/useStomp'

const ChatMessageBox = styled.div`
    .div {
        position: relative;
        width: 100%;
        max-width: calc(100% - 6em);
        min-width: 4em;
        padding: 0.6em 1em 0.6em 5em;
    }
    .div::before {
        content: '';
        display: block;
        width: 2.8em;
        height: 2.8em;
        position: absolute;
        top: 0.3em;
        left: 1em;
        background-image: var(--profile-image);
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
        border-radius: 50%;
    }

    .div.deleted {
        visibility: hidden;
    }

    .class {
        min-width: 500px;
        width: 80%;
    }

    .you {
        background-color: red;
    }

    .me {
        background-color: yellow;
        text-align: right;
    }
`

export default function ChatMessageView() {
    const token = window.localStorage.getItem('token') || ''
    const config = {
        brokerURL: 'ws://127.0.0.1:8080/api/ws',
        connectHeaders: { Access_Token: token },
    }
    const { send } = useStomp(config)

    const user = 'troublesome.dev@gmail.com'
    return (
        <ChatMessageBox>
            {[].map((e) =>
                e.email === user ? (
                    <div className="you">
                        <span className="class">Hello</span>
                    </div>
                ) : (
                    <div className="me">
                        <span className="class">너냐</span>
                    </div>
                )
            )}
            <button
                type="button"
                onClick={() =>
                    send(
                        '/sub/chat/message',
                        {
                            sender: '신규',
                            message: '하이로',
                        },
                        config
                    )
                }
            >
                하이
            </button>
        </ChatMessageBox>
    )
}

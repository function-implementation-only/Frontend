import styled from 'styled-components'

const ChatMessageBer = styled.div`
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: calc(100% - 350px);
    box-sizing: border-box;
    padding: 100px 0rem 0rem 0rem;

    .broadcaster {
        background-color: #4a443e;
        border-left: 2px solid #faa81a;
        input {
            width: calc(100% - 100px);
        }
        button {
            width: 100px;
        }
    }
`

export default function ChatMessageBar() {
    return (
        <ChatMessageBer>
            <div className="broadcaster">
                {/* TODO: 작성 엑션 */}
                <form>
                    <input type="text" />
                    <button type="submit">하이</button>
                </form>
            </div>
        </ChatMessageBer>
    )
}

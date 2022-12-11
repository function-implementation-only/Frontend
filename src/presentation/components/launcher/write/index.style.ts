import styled from 'styled-components'

export const WriteForm = styled.form`
    width: 100%; // calc(100% - 50px);
    height: 120px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
`

export const MessageArea = styled.textarea`
    resize: none;
    height: 100px;
    padding: 10px;
    margin: 10px;
    outline: none;
    border: none;
    border-bottom: 1px solid var(--gray-100);
    border-radius: 10px 10px;
`

export const ActionBox = styled.button`
    width: 60px;
    padding: 5px;
    border-radius: 10px;
`

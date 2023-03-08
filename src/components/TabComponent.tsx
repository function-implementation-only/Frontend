import styled from 'styled-components'

interface TabComponentProps {
    title: string
    selectedTabTitle: string
    tabHandler: React.Dispatch<React.SetStateAction<string>>
}

const TabComponentLayout = styled.div<{
    isSelected: boolean
}>`
    width: 456px;
    display: flex;
    justify-content: center;
    padding-bottom: 16px;
    border-bottom: ${(props) =>
            props.isSelected ? 'var(--primary-color)' : '#cbcbcb'}
        5px solid;
    button {
        color: ${(props) =>
            props.isSelected ? 'var(--primary-color)' : 'black'};
        border: none;
        background-color: transparent;
        font-weight: 700;
        font-size: 18px;
        cursor: pointer;
    }
`

function TabComponent({
    title,
    selectedTabTitle,
    tabHandler,
}: TabComponentProps) {
    return (
        <TabComponentLayout isSelected={title === selectedTabTitle}>
            <button
                type="button"
                onClick={() => {
                    tabHandler(title)
                }}
            >
                {title}
            </button>
        </TabComponentLayout>
    )
}

export default TabComponent

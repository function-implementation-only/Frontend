import './input.css'

interface InputProps {
    backgroundColor?: string
    type: string
    value?: string
    size?: 'small' | 'medium' | 'large'
    label: string
    placeholder: string
    onChangeInput?: any
}

function Input({
    type,
    size = 'medium',
    backgroundColor,
    label,
    placeholder,
    onChangeInput,
    value,
    ...props
}: InputProps) {
    return (
        <label htmlFor="title" className="title">
            <input
                type={type}
                placeholder={placeholder}
                className={['storybook-input', `storybook-input--${size}`].join(
                    ' '
                )}
                onChange={(e) => {
                    onChangeInput(e.target.value)
                }}
                value={value}
                style={{ backgroundColor }}
                {...props}
            />
        </label>
    )
}

Input.defaultProps = {
    backgroundColor: 'transparent',
    value: '',
    size: 'medium',
    onChangeInput: (value: string): void => {
        console.log(value)
    },
}

export default Input

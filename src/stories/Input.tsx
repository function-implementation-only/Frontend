/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './input.css'

export interface InputProps {
    backgroundColor?: string
    type: string
    value?: string
    size?: 'small' | 'medium' | 'large'
    label: string
    placeholder: string
    onChangeInput?: any
}

/**
 * Primary UI component for user interaction
 */
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
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
            />
        </label>
    )
}

export default Input

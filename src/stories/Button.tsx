/* eslint-disable react/require-default-props */
import './button.css'

export interface ButtonProps {
    type?: string
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean
    /**
     * What background color to use
     */
    backgroundColor?: string
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large'
    /**
     * Button contents
     */
    label: string
    /**
     * Optional click handler
     */
    onClickButton?: any

    onClick: () => void | undefined
}

/**
 * Primary UI component for user interaction
 */
const Button = ({
    type,
    primary = false,
    size = 'medium',
    backgroundColor,
    label,
    onClickButton,
    ...props
}: ButtonProps) => {
    const mode = primary
        ? 'storybook-button--primary'
        : 'storybook-button--secondary'
    return (
        <button
            type="button"
            className={[
                'storybook-button',
                `storybook-button--${size}`,
                mode,
            ].join(' ')}
            style={{ backgroundColor }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            onClick={onClickButton}
        >
            {label}
        </button>
    )
}
export default Button

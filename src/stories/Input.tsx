import React, { useState } from 'react'
import './input.css'

interface InputProps {
    /**
     * What background color to use
     */
    backgroundColor?: string
    /**
     * How large should the button be?
     */
    type: string
    /**
     * Value attribute of Input
     */
    value: string
    size?: 'small' | 'medium' | 'large'
    /**
     * Button contents
     */
    label: string
    /**
     * Optional onChange handler
     */

    placeholder: string
    onChangeInput: any
}

/**
 * Primary UI component for user interaction
 */
export function Input({
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

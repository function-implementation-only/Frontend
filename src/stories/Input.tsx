/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SignUpInfo } from '../types/inedx'
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
    value?: string
    size?: 'small' | 'medium' | 'large'
    /**
     * Button contents
     */
    label: string
    /**
     * Optional onChange handler
     */

    placeholder: string
    onChangeInput?: any
}

/**
 * Primary UI component for user interaction
 */
export default function Input({
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

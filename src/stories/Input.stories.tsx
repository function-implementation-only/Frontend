import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Input } from './Input'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/Input',
    component: Input,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Input>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const Large = Template.bind({})
Large.args = {
    type: 'text',
    size: 'large',
    label: 'Id',
    placeholder: '아이디를 입력해 주세요.',
}

export const Medium = Template.bind({})
Medium.args = {
    type: 'password',
    size: 'medium',
    label: 'Password',
    placeholder: '비밀번호를 입력해 주세요.',
}

export const Small = Template.bind({})
Small.args = {
    type: 'text',
    size: 'small',
    label: 'Id',
    placeholder: '아이디를 입력해 주세요.',
}

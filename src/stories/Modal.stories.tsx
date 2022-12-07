/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Modal from './Modal'
import Input from './Input'

export default {
    title: 'Example/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />

export const LogIn = Template.bind({})
LogIn.args = {
    isOpen: true,
    children: (
        <>
            <Input
                type="text"
                size="large"
                label="Id"
                placeholder="이메일을 입력해 주세요."
            />
            <Input
                type="text"
                size="large"
                label="Pw"
                placeholder="비밀번호를 입력해 주세요."
            />
        </>
    ),
}

export const SignIn = Template.bind({})
SignIn.args = {
    isOpen: false,
}

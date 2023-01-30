import { ComponentStory, ComponentMeta } from '@storybook/react'
import PostCardComponent from 'components/PostCardComponent'

export default {
    title: 'PostCardComponent',
    component: PostCardComponent,
    argTypes: {
        post: {
            control: { type: 'object' },
        },
    },
} as ComponentMeta<typeof PostCardComponent>

const Template: ComponentStory<typeof PostCardComponent> = (args) => (
    <PostCardComponent {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
    // post: {
    //     startDate: '2022-12-25',
    //     category: 'STUDY',
    //     title: 'test',
    //     place: 'ONLINE',
    //     peopleNum: 5,
    //     duration: 'ONE',
    //     techs: [
    //         { id: 1, tech: 'REACT' },
    //         { id: 2, tech: 'JAVASCRIPT' },
    //     ],
    //     nickname: 'Elio',
    //     // 스토리북에서는 필요없지만 타입스크립트에서 확인하는 부분
    //     postId: 1,
    //     contents: '',
    //     imageList: [],
    //     likeCheck: null,
    //     likesLength: 0,
    //     profileImg: null,
    // },
}

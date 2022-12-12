import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PostResponse } from '../../types/response'
import PostComponent from '../components/PostComponent'

const MainPageLayout = styled.div``

function MainPage() {
    const [allPosts, setAllposts] = useState<PostResponse[]>([])
    const [loading, setLoading] = useState(true)
    async function initialize() {
        const { data } = await window.context.postAPI.getAllPosts()
        setAllposts(data.data)
        setLoading(false)
    }
    useEffect(() => {
        initialize()
    }, [])
    return (
        <MainPageLayout>
            {loading
                ? 'Loading...'
                : allPosts.map((post: PostResponse) => {
                      return <PostComponent key={post.postId} post={post} />
                  })}
        </MainPageLayout>
    )
}

export default MainPage

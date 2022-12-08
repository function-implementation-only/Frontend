import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PostObj } from '../../types/post'
import PostComponent from '../components/PostComponent'

const MainPageLayout = styled.div``

function MainPage() {
    const [allPosts, setAllposts] = useState([])
    const [loading, setLoading] = useState(true)
    async function initialize() {
        const { data } = await window.context.postAPI.getAllPosts()
        setAllposts(data.posts)
        setLoading(false)
    }
    useEffect(() => {
        initialize()
    }, [])
    return (
        <MainPageLayout>
            {loading
                ? 'Loading...'
                : allPosts.map((post: PostObj) => {
                      return <PostComponent key={post.id} post={post} />
                  })}
        </MainPageLayout>
    )
}

export default MainPage

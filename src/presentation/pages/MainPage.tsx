import { useEffect, useState } from 'react'
import styled from 'styled-components'

const MainPageLayout = styled.div``

type PostObj = {
    category: string
    contents: string
    duration: string
    peopleNum: number
    place: string
    startDate: Date
    title: string
    id: number
}

function MainPage() {
    const [allPosts, setAllposts] = useState([])
    const [loading, setLoading] = useState(true)
    async function initPosts() {
        const { data } = await window.context.postAPI.getAllPosts()
        setAllposts(data.posts)
        setLoading(false)
    }
    useEffect(() => {
        initPosts()
    }, [])
    return (
        <MainPageLayout>
            {loading
                ? 'Loading...'
                : allPosts.map((post: PostObj) => {
                      return <div key={post.id}>{post.title}</div>
                  })}
        </MainPageLayout>
    )
}

export default MainPage

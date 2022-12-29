import { useQuery } from 'react-query'

function useOnePost(id: string) {
    return useQuery('getPost', async () => {
        const { data } = await window.context.postAPI.getOnePost(id)
        return data
    })
}

export default useOnePost

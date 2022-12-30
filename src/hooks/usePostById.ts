import { useQuery } from 'react-query'

function usePostById(id: string) {
    return useQuery('getPost', async () => {
        const { data } = await window.context.dataService.postAPI.getPostById(
            id
        )
        return data
    })
}

export default usePostById

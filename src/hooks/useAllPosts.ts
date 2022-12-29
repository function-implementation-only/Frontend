import { useQuery } from 'react-query'
import { RESPONSE_TYPE } from 'src/lib/constants'

function useAllPosts() {
    return useQuery('getAllPosts', async () => {
        const { data } = await window.context.postAPI.getAllPosts()
        const dataParsed = window.context.parserAPI.parse(
            RESPONSE_TYPE.POST.GET_ALL,
            data.data
        )
        data.data = dataParsed
        return data
    })
}

export default useAllPosts

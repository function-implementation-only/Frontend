import { useQuery } from 'react-query'
import { RESPONSE_TYPE } from 'src/lib/constants'

function useAllPost() {
    return useQuery('getAllPost', async () => {
        const { data } = await window.context.postAPI.getAllPost()
        const dataParsed = window.context.parserAPI.parse(
            RESPONSE_TYPE.POST.GET_ALL,
            data.data
        )
        data.data = dataParsed
        return data
    })
}

export default useAllPost

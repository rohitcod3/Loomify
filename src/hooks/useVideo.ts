import { createCommentSchema } from "@/components/forms/comment-form/schema"
import { useMutationData } from "./useMutationData"
import { useQueryData } from "./useQueryData"
import useZodForm from "./useZodForm"
import { createCommentAndReply } from "@/actions/user"

export const useVideoComment = (videoId: string, commentId?: string) => {
    const {data} = useQueryData(['user-profile'], () => {})
    const {status, data:user} = data as{
        status: number
        data: {id:string, image:string}
    }
    const {mutate, isPending} = useMutationData(['new-comment'],
        (data:{comment: string})=>
        createCommentAndReply(user.id, data.comment, videoId,commentId),
        'video-comments',
        () => reset()
    )
const{register, onFormSubmit,errors,reset} = useZodForm(
createCommentSchema,
mutate
)

   
}
import { MutationFunction, MutationKey, useMutation, useMutationState, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationData = (
mutationKey: MutationKey,
mutationFn: MutationFunction<any, any>,
queryKey?:string,
onSuccess?: () => void
) =>{

    const client = useQueryClient()
   const {mutate,isPending} = useMutation({
    mutationKey,
    mutationFn,
    onSuccess(data){
        if(onSuccess) onSuccess()
            return toast(data?.status === 200 || data?.status === 201 ? 'Success' : 'Error',{
        description: data?.data?.name,
        })
    },
    onSettled: async () =>{
        return await client.invalidateQueries({queryKey: [queryKey]})
    },
   })

   return {mutate, isPending}
} 


//gives the lastest mutation state for a given mutation key
export const useMutationDataState = (mutationKey: MutationKey)=>{
    const data = useMutationState({
        filters: {mutationKey},
        select: (mutation) => {
            return {
                variable: mutation.state.variables as any,
                status: mutation.state.status,
            }
        },
    })
    //this fetches the last value in the data array, ensuring we get the latest state and not the old ones.
    const latestVariables = data[ data.length - 1 ]
    return {latestVariables}
}
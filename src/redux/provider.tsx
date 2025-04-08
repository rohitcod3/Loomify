"use client"
import{Provider} from 'react-redux'
export const ReduxProvider = ({children: React.ReactNode}) => {
    return <Provider store={}>{children}</Provider>
}
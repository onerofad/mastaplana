import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({

    reducerPath: 'api',

    baseQuery: fetchBaseQuery({baseUrl: 'https://backend-app-pied.vercel.app/api/'}),

    endpoints: builder => ({
        addUsers: builder.mutation({
            query: initialPost => ({
                url: 'users/',
                method: 'POST',
                body: initialPost
            })
        }),
        getUsers: builder.query({
            query: () => '/users',
        }),
        uploadFile: builder.mutation({
            query: initialPost => ({
                url: 'uploadfiles/', 
                method: 'POST',
                body: initialPost
            })
        }),
        getUploadFiles: builder.query({
            query: () => '/uploadfiles'
            
        })
    })
    
})

export const {
    useAddUsersMutation, useGetUsersQuery, 
    useUploadFileMutation, useGetUploadFilesQuery
} = apiSlice

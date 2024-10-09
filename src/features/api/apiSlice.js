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
            
        }),
        uploadAudio: builder.mutation({
            query: initialPost => ({
                url: 'uploadaudios/',
                method: 'POST',
                body: initialPost
            })
        }),
        getUploadAudios: builder.query({
            query: () => '/uploadaudios'
        }),
        uploadVideo: builder.mutation({
            query: initialPost => ({
                url: 'uploadvideos/',
                method: 'POST',
                body: initialPost,
            })
        }),
        getUploadVideos: builder.query({
            query: () => '/uploadvideos'
        }),
        getNotes: builder.query({
            query: () => '/notes'
        }),
        addNotes: builder.mutation({
            query: initialPost => ({
                url: 'notes/',
                method: 'POST',
                body: initialPost
            })
        }),
    })
    
})

export const {
    useAddUsersMutation, useGetUsersQuery, 
    useUploadFileMutation, useGetUploadFilesQuery,
    useGetUploadAudiosQuery, useUploadAudioMutation,
    useGetUploadVideosQuery, useUploadVideoMutation,
    useGetNotesQuery, useAddNotesMutation

} = apiSlice

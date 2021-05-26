// A slice is a collection of Redux reducer logic and actions for a single feature.

import { nanoid, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'
// import { sub } from 'date-fns'

// const initialState = [
//   {
//     id: '1',
//     date: sub(new Date(), { minutes: 20 }).toISOString(),
//     title: 'First Post!',
//     content: 'Hello',
//     user: '2',
//     reactions: {
//       thumbsUp: '0',
//       hooray: '0',
//       heart: '0',
//       rocket: '0',
//       eyes: '0',
//     },
//   },
//   {
//     id: '2',
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     title: 'Second Post?',
//     content: 'More text',
//     user: '2',
//     reactions: {
//       thumbsUp: '0',
//       hooray: '0',
//       heart: '0',
//       rocket: '0',
//       eyes: '0',
//     },
//   },
// ]

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

// The createAsyncThunk API generates thunks that automatically dispatch "pending/fulfilled/rejected" actions.
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.posts
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial '(title, content, user)' object
  async (initialPost) => {
    // We send the initial data to the fake API server
    const response = await client.post('/fakeApi/posts', { post: initialPost })
    // The response includes the complete  post object, include the unique id.
    return response.post
  }
)

const postsSlice = createSlice({
  // Function createSlice() takes care of generating action type string, action creator functions, and action objects.
  name: 'posts',
  initialState,
  // warning: do not mutate the state outside of createSlice(), use Object.assign() and ...spread instead.
  reducers: {
    // Redux Toolkit allows use to write "mutating" immutable logic in reducers.
    // It doesn't actual mutate the state because it use the immer library underneath,
    // which detects change to a "draft state" and  product a brand new immutable state.

    // Action: {type: 'posts/postAdded', payload:{id, title, content}}
    // postAdded(state, action) {
    //   state.push(action.payload)
    // },

    postAdded: {
      reducer(state, action) {
        // state.push(action.payload)
        state.posts.push(action.payload)
      },
      // The prepare callback function runs additional logic to customize the action payload.
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
          },
        }
      },
    },

    // Action: {type: 'posts/postUpdated', payload:{id, title, content}}
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      // const existingPost = state.find((post) => post.id === id)
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },

    // Action: {type: 'posts/reactionAdded', payload:{id, reaction}}
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      // const existingPost = state.find((post) => post.id === postId)
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewPost.fulfilled]: (state, action) => {
      // Add the new post directly to the posts array, 
      // immer will take care of creating a new immutable posts object.
      state.posts.push(action.payload)
    }
  },
})

// Export a action creator of the same name as the reducer, and use it in UI to dispatch the action.
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

// Export the reducer function to the Redux store.
export default postsSlice.reducer

// Define reusable selector functions in slice to avoid re-writing select in the component when data is changed.
// export const selectAllPosts = (state) => state.posts
// export const selectPostById = (state, postId) =>
//   state.posts.find((post) => post.id === postId)

// Note that the state here is the root Redux state.
export const selectAllPosts = (state) => state.posts.posts
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId)

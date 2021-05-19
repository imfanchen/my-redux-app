// A slice is a collection of Redux reducer logic and actions for a single feature.

import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  {
    id: '1',
    date: sub(new Date(), { minutes: 20 }).toISOString(),
    title: 'First Post!',
    content: 'Hello',
    user: '2',
  },
  {
    id: '2',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    title: 'Second Post?',
    content: 'More text',
    user: '2',
  },
]

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

    // The prepare callback function runs additional logic to customize the action payload.
    postAdded: {
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
      reducer(state, action) {
        state.push(action.payload)
      },
    },

    // Action: {type: 'posts/postUpdated', payload:{id, title, content}}
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },

    // Action: {type: 'posts/reactionAdded', payload:{id, reaction}}
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
})

// Export a action creator of the same name as the reducer, and use it in UI to dispatch the action.
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

// Export the reducer function to the Redux store.
export default postsSlice.reducer

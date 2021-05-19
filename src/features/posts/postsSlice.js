// A slice is a collection of Redux reducer logic and actions for a single feature.

import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello' },
  { id: '2', title: 'Second Post', content: 'More text' },
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
    postAdded(state, action) {
      state.push(action.payload)
    },
  },
})

// Export a action creator of the same name as the reducer, and use it in UI to dispatch the action.
export const { postAdded } = postsSlice.actions

// Export the reducer function to the Redux store.
export default postsSlice.reducer

// Creates the Redux store instance.

import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'

// function rootReducer(state = {}, action) {
//   return {
//     users: usersReducer(state.users, action),
//     posts: postsReducer(state.posts, action),
//     comments: commentsReducer(state.comments, action)
//   }
// }

// const rootReducer = combineReducers({
//   users: usersReducer,
//   posts: postsReducer,
//   comments, commentsReducer,
// })

// const store = configureStore({
//   reducer: rootReducer
// })

export default configureStore({
  // Add slice's reducer function to store.
  // We can pass in all the different reducers in an object in the reducer argument.
  // The key names in the object will define the keys in our final state value.
  reducer: {
    // Tells Redux top-level state object have a field named 'posts',
    // and all the data for state.posts will be updated by the postReducer
    // when the actions are dispatched.
    posts: postsReducer,
  },
})

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { nanoid } from '@reduxjs/toolkit'
import { postAdded } from './postsSlice'

export const AddPostForm = () => {
  // Store local state with useState hook.
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const dispatch = useDispatch() // Access the store's dispatch function.

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  // This is a hand-written action creator without using createSlice hook
  // function postAdded(title, content) {
  //   const id = nanoid()
  //   return {
  //     type: 'post/postAdded',
  //     payload: { id, title, content },
  //   }
  // }

  const onSavePostClicked = () => {
    if (title && content) {
      // Function nanoid() from React Toolkit generates a random unique ID.
      // dispatch(postAdded({ id: nanoid(), title, content }))
      // If we need to dispatch the same action from many components without duplicating the impure logic:
      dispatch(postAdded(title, content))
      setTitle('')
      setContent('')
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}

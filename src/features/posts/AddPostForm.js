import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { postAdded } from './postsSlice'
// import { nanoid } from '@reduxjs/toolkit'
import { addNewPost } from './postsSlice'
import { unwrapResult } from '@reduxjs/toolkit'

export const AddPostForm = () => {
  // Store local state with useState hook.
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch() // Access the store's dispatch function.
  const users = useSelector((state) => state.users) // Load the users from the Redux state.

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  // This is a hand-written action creator without using createSlice hook
  // function postAdded(title, content) {
  //   const id = nanoid()
  //   return {
  //     type: 'post/postAdded',
  //     payload: { id, title, content },
  //   }
  // }

  const onSavePostClicked = async () => {
    if (canSave) {
      // Function nanoid() from React Toolkit generates a random unique ID.
      // dispatch(postAdded({ id: nanoid(), title, content }))
      // If we need to dispatch the same action from many components without duplicating the impure logic:
      // dispatch(postAdded(title, content, userId))

      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewPost({ title, content, user: userId })
        )
        // The unwrapResult will return either the actual action.payload value 
        // from a fulfilled action, or throw an error if it's the rejected action.
        unwrapResult(resultAction)
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  // const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

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
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value="" />
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}

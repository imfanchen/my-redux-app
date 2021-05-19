// A component that takes a user ID as a prop,
// looks up the right user object, and formats the user's name.

import React from 'react'
import { useSelector } from 'react-redux'

export const PostAuthor = ({ userId }) => {
  const author = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  )
  return <span> by {author ? author.name : 'Unknown author'}</span>
}

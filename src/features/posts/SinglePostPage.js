import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const SinglePostPage = ({ match }) => {
  // React Router will pass in a match object containing the URL.
  // It will store the second part of the URL in match.params property.
  const { postId } = match.params

  const post = useSelector((state) =>
    // The component will re-render any time the value returned
    // from the useSelector hook changes to a new reference.
    state.posts.find((post) => post.id === postId)
  )

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}

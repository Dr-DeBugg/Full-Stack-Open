import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="teksti">
      {blog.title} {blog.author}
    </div>
    <div className="tykkaykset">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
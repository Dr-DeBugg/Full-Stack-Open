import React from 'react'

const AddBlogForm = (props) => {

 return (
   <div>
    <form onSubmit={props.addBlog}>
      <h2>Create a new blog</h2>
      <p>url:
      <input
      {...props.url}
      />
      <br></br>title:
      <input
        {...props.title}
      />
      <br></br>author:
      <input
      {...props.author}
      /></p>
      <button type="submit">save</button>
    </form>
    </div>
  )
}


export default AddBlogForm
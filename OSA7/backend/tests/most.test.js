const mostBlogs = require('../utils/most_blogs')
const listWithOneBlog = require('../utils/vars_for_blogtests').listWithOneBlog
const blogs = require('../utils/vars_for_blogtests').blogs

describe('author with most blogs', () => {

  test('when list has only one blog', () => {
    const result = mostBlogs.mostBlogs(listWithOneBlog)
    expect(result).toEqual([{
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }])
  })

  test('when the given list has several blogs', () => {
    const result = mostBlogs.mostBlogs(blogs)
    expect(result).toEqual([{
      author: 'Robert C. Martin',
      blogs: 3
    }])
  })
})
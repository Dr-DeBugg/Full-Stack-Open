const mostLikes = require('../utils/most_likes')
const listWithOneBlog = require('../utils/vars_for_blogtests').listWithOneBlog
const blogs = require('../utils/vars_for_blogtests').blogs

describe('author with most likes across all blogs', () => {

  test('when the list has only one blog', () => {
    const result = mostLikes.mostLiked(listWithOneBlog)
    expect(result).toEqual([{
      author: 'Edsger W. Dijkstra',
      likes: 5
    }])
  })

  test('when the given list has several blogs in it', () => {
    const result = mostLikes.mostLiked(blogs)
    expect(result).toEqual([{
      author: 'Edsger W. Dijkstra',
      likes: 17
    }])
  })
})
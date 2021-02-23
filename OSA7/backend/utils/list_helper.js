const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if(blogs.length===1){
    return blogs[0].likes
  }
  const reducer = (likes, item) => {
    return likes + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 1){
    return [{
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes
    }]
  }

  else {
    var maxLikes = 0

    const reducer = (likes, item) => {
      if(item.likes >= maxLikes) {
        maxLikes = item.likes
      }
    }

    const hasMaxLikes = (blogi) => {
      return blogi.likes === maxLikes
    }

    blogs.map(x => reducer(x.likes, x))

    var blogi = blogs.find(hasMaxLikes)

    return [{
      title: blogi.title,
      author: blogi.author,
      likes: blogi.likes
    }]
  }}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
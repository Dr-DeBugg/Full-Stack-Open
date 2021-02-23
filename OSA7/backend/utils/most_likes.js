const mostLiked = (blogs) => {

  var newArray = []

  const evaluateArr = (blog) => {
    var op = newArray.filter(data => (data.author === blog.author))
    if(op[0]) {
      op[0].likes += blog.likes
    }
    else {
      newArray.push({ author: blog.author, likes: blog.likes })
    }
  }

  if(blogs.length === 1){
    newArray.push( { author: blogs[0].author, likes: blogs[0].likes })
    return newArray
  }
  else {
    var winner = []
    blogs.map(x => evaluateArr(x))
    var mostLikes = newArray.reduce(function (most, current) {
      return (most.likes || 0) > current.likes ? most : current
    }, {})

    winner.push(mostLikes)
    return winner
  }
}

module.exports = {
  mostLiked
}
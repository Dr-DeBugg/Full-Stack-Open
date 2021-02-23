const mostBlogs = (blogs) => {
  let newArr = []

  const myFunction = (blogittaja) => {
    let op = newArr.filter(data => (data.author === blogittaja.author))
    if(!op.length > 0){
      newArr.push({ author: blogittaja.author, blogs: 1 })
    }
    else {
      var found = newArr.find(x => x.author === blogittaja.author)
      found.blogs++

    }
  }

  if(blogs.length === 1){
    newArr.push({ author: blogs[0].author, blogs: 1 })
    return newArr
  }
  else {
    blogs.map(x => myFunction(x))
    console.log(newArr)
    var winner = []
    var mostBlogs = newArr.reduce(function (most, blogger) {
      return (most.blogs || 0) > blogger.blogs ? most : blogger
    }, {})
    winner.push(mostBlogs)
    return winner
  }
}

module.exports = {
  mostBlogs
}
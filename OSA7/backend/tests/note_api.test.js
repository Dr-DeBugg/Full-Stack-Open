const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blogDB')
const helper = require('../tests/test_helper')


const initialBlogs = [
  {
    title:'koodaamisesta',
    author:'mie',
    url:'www.kerronKerranKoodaamisesta.com',
    likes:5
  },
  {
    title:'taallaPtahdenAlla',
    author:'minako',
    url:'kirjaan.com',
    likes:67
  },
  {
    title:'testi',
    author:'kke',
    url:'li.com',
    likes:0
  }
]

beforeEach( async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

describe('testing returned blogs with HTTP GET', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length)
  })

})

describe('testing controller routes', () => {

  // eslint-disable-next-line quotes
  test(`returned blogs identifier is 'id' and not '_id'`, async () => {
    const response = await api.get('/api/blogs')
    response.body.map(b => expect(b.id).toBeDefined())
  })

  test('a valid blog can be added AND that its url is correct', async () => {
    const newBlog = {
      title: 'uusiLisays',
      author: 'uudenTyypin',
      url: 'uusihomma.com',
      likes: 100
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length + 1)

    const urls = response.body.map(b => b.url)
    expect(urls).toContain(
      'uusihomma.com'
    )
  })

  test('if a new blog is added without a likes field, this test checks that it has 0 likes', async () => {
    const newBlog = {
      title: 'blogilisays',
      author: 'ilmanLikes',
      url: 'noRefToLikes.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(response.body[response.body.length-1].likes).toBe(0)
  })

  test('if a new blog is added without a title or url field - server responds with -- 400 bad request', async () => {

    const newBlog = {
      author: 'ilmanLikes',
      url: 'noRefToLikes.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    console.log(response.body)

    const newBlogAlso = {
      title: 'blogilisays',
      author: 'ilmanLikes',
    }

    await api
      .post('/api/blogs')
      .send(newBlogAlso)
      .expect(400)
  })
})

// describe('when there is initially one user at db', () => {
//   beforeEach(async () => {
//     await User.deleteMany({})
//     const user = new User({ username: 'root', name: 'noob noob', password: 'sekret' })
//     await user.save()
//   })

//   test('creation succeeds with a fresh username', async () => {
//     const usersAtStart = await helper.usersInDb()
//     const newUser = {
//       username: 'mluukkai',
//       name: 'Matti Luukkainen',
//       password: 'salainen',
//     }

//     await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(200)
//       .expect('Content-Type', /application\/json/)

//     const usersAtEnd = await helper.usersInDb()
//     expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

//     const usernames = usersAtEnd.map(u => u.username)
//     expect(usernames).toContain(newUser.username)
//   })

//   test('creation fails with proper statuscode and message if username already taken', async () => {
//     const usersAtStart = await helper.usersInDb()

//     const newUser = {
//       username: 'root',
//       name: 'Superuser',
//       password: 'salainen',
//     }

//     const result = await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(400)
//       .expect('Content-Type', /application\/json/)

//     expect(result.body.error).toContain('`username` to be unique')

//     const usersAtEnd = await helper.usersInDb()
//     expect(usersAtEnd.length).toBe(usersAtStart.length)
//   })
// })

afterAll(() => {
  mongoose.connection.close()
})
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blogDB')
const helper = require('../tests/test_helper')

describe('varying tests with faulty usernames/passwords', () => {
  // beforeEach(async () => {
  //   await User.deleteMany({})
  //   const user = new User({ username: 'root', name: 'noob noob', password: 'sekret' })
  //   await user.save()
  // })

  test('user creation fails with a non existant username and password and also just a nonexistant username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Matti Luukkainen',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('or are too short!')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)

    const newUserTwo = {
      name: 'Matti Luukkainen',
      password: 'omakeksima'
    }
    const resultti = await api
      .post('/api/users')
      .send(newUserTwo)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(resultti.body.error).toContain('or are too short!')

    const usersAtEndi = await helper.usersInDb()
    expect(usersAtEndi.length).toBe(usersAtStart.length)

    // const usernames = usersAtEnd.map(u => u.username)
    // expect(usernames).toContain(newUser.username)

  })

  test('user creation fails if the same username is already present in the system', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

import React from 'react'
import { 
  render, waitForElement 
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('login')
    )
    expect(component).toBeDefined()

    await waitForElement(
      () => component.getByText('Log in to application')
    )
    expect(component).toBeDefined()
    const beforeLogin = component.container.querySelector('.testDiv')
    expect(beforeLogin).toBe(null)
    
  })
  test('renders all blogs it gets from backend when user is logged in', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    
    localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.testDiv')
    )
    const afterLogin = component.container.querySelectorAll('.testDiv')
    expect(afterLogin.length).toBe(2)

    await waitForElement(() => component.getByText('Create a new blog'))
    expect(component).toBeDefined()
  })
})
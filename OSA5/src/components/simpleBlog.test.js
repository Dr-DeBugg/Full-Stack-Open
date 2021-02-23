import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders blog title, author and amount of likes', () => {

  const simppeliBlogi = {
    title: 'Component testing is done with react-testing-library',
    author: 'J.K Rowling',
    likes: 3
  }
  const component = render(
    <SimpleBlog blog={simppeliBlogi}/>
  )

  const div = component.container.querySelector('.teksti')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(div).toHaveTextContent(
    'J.K Rowling'
  )
  const div2 = component.container.querySelector('.tykkaykset')
  expect(div2).toHaveTextContent(
    '3'
  )
})

test('clicking the button twice calls event handler twice', async () => {

  const simppeliBlogi = {
    title: 'Component testing is done with react-testing-library',
    author: 'J.K Rowling',
    likes: 3
  }
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={simppeliBlogi} onClick={mockHandler}/>
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('only blogs title and author shown by default', () => {

  const simppeliBlogi = {
    title: 'Component testing is done with react-testing-library',
    author: 'J.K Rowling',
    likes: 3,
    url: "www.url.com"
  }
  const component = render(
    <Blog blog={simppeliBlogi}/>
  )

  const div = component.container.querySelector('[style]')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(div).toHaveTextContent(
    'J.K Rowling'
  )
  expect(div).not.toHaveTextContent(
    'www.url.com'
  )
  expect(div).not.toHaveTextContent(
    3
  )

})

test('after click; likes and url are displayed also', async () => {

  const simppeliBlogi = {
    title: 'Component testing is done with react-testing-library',
    author: 'J.K Rowling',
    likes: 3,
    url: "www.url.com",
    user: {name: "Santeri"}
  }
  const user = {
    username: "Santeri"
  }
  
  const component = render(
    <Blog blog={simppeliBlogi} user={user}/>
  )

  const button = component.container.querySelector('.testDiv')
  fireEvent.click(button)

  const div = component.container.querySelector('[style]')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(div).toHaveTextContent(
    'J.K Rowling'
  )
  expect(div).toHaveTextContent(
    'www.url.com'
  )
  expect(div).toHaveTextContent(
    'Santeri'
  )
  expect(div).toHaveTextContent(
    3
  )

})
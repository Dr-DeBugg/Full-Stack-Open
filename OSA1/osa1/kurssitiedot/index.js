import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {

  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    )
  }

  const Part = (props) => {
    return (
        <p>
            {props.partsName} {props.exercises}
        </p>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <Part partsName={course.parts[0].name} exercises={course.parts[0].exercises}/>
        <Part partsName={course.parts[1].name} exercises={course.parts[1].exercises}/>
        <Part partsName={course.parts[2].name} exercises={course.parts[2].exercises}/>
      </div>
    )
  }

  const Total = (props) => {
    return (
        <p>yhteensä {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} tehtävää</p>
    )
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
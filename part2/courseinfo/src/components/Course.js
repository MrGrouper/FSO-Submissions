const Header = ({course}) => <><h2>{course.name}</h2></>

const Content = ({course}) =>{
return(
  <>
  {course.parts.map(part =>
    <p key = {part.id}>
      {part.name} {part.exercises}
      </p>
  )}
  </>
)
}

const Total = ({course}) =>{

  const sum = course.parts.reduce((total, num)=>total+num.exercises,0)

  return(
    <>
    <p><b>total of {sum} exercises</b></p>
    </>
  )

}

const Course = ({course}) => {
  return(
    <div>
    <Header course = {course}/>
    <Content course = {course}/>
    <Total course ={course}/>
    </div>
  )
}

export default Course